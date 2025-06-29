const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['member', 'officer', 'executive'],
        default: 'member'
    },
    points: {
        type: Number,
        default: 0
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
})

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    // Remove sensitive information
    delete userObject.password;
    delete userObject.__v;

    return userObject;
};

userSchema.statics.findByUsername = async function(username) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    // Ensure the user object is returned without sensitive information
    user.password = undefined;
    user.__v = undefined; 
    return user;
}

userSchema.statics.findByEmail = async function(email) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    user.password = undefined;
    user.__v = undefined;
    return user;
}

userSchema.statics.authenticate = async function(username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    user.password = undefined;
    user.__v = undefined;
    return user;
}


userSchema.statics.register = async function(firstName, lastName,username, password, email) {
    const existingUser = await this.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const existingEmail = await this.findOne({ email });
    if (existingEmail) {
        throw new Error('Email already exists');
    }

    if (!username || !password || !email) {
        throw new Error('All fields are required');
    }

    const newUser = new this({ firstName, lastName, username, password, email });
    await newUser.save();
    return newUser;
}

userSchema.statics.updatePoints = async function(username, points) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    user.points += points;
    await user.save();
    return user;
}

userSchema.statics.updateRole = async function(username, role) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }

    if (!['member', 'officer', 'executive'].includes(role)) {
        throw new Error('Invalid role');
    }

    user.role = role;
    await user.save();
    return user;
}

userSchema.statics.getAllUsers = async function() {
    const users = await this.find({});
    return users.map(user => {
        user.password = undefined;
        user.__v = undefined;
        return user;
    });
}

userSchema.statics.deleteUser = async function(username) {
    const user = await this.findOneAndDelete({ username });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

userSchema.statics.getUsersByRole = async function(role) {
    if (!['member', 'officer', 'executive'].includes(role)) {
        throw new Error('Invalid role');
    }

    const users = await this.find({ role });
    return users.map(user => {
        user.password = undefined;
        user.__v = undefined;
        return user;
    });
}

module.exports = mongoose.model('User', userSchema);