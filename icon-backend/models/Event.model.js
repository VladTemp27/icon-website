const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teams: [{
        name: {
            type: String,
            trim: true
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }],
    organizingCommittee: [{
        type: String,
        required: true
    }],
    organizers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

eventSchema.methods.toJSON = function() {
    const event = this;
    const eventObject = event.toObject();

    // Remove sensitive information
    delete eventObject.__v;
    delete eventObject.createdAt;
    delete eventObject.updatedAt;

    return eventObject;
}

eventSchema.static.modify = async function (eventId, updateData, modifiedBy) {
    const event = await this.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    
    Object.keys(updateData).forEach(key => {
        if (key !== 'createdBy' && key !== 'modifiedBy') {
            event[key] = updateData[key];
        }
    })

    event.modifiedBy = modifiedBy;
    await event.save();
    return event;
}

eventSchema.static.getById = async function (eventId) {
    const event = await this.findById(eventId)
        .populate('createdBy', 'name username')
        .populate('modifiedBy', 'name username')
        .populate('organizers', 'name username')
        .populate('attendees', 'name username')
        .populate('teams.members', 'name username');

    if (!event) {
        throw new Error('Event not found');
    }

    return event;
}

eventSchema.static.getAll = async function () {
    const events = await this.find({})
        .populate('createdBy', 'name username')
        .populate('modifiedBy', 'name username')
        .populate('organizers', 'name username')
        .populate('attendees', 'name username')
        .populate('teams.members', 'name username');

    return events;
}

eventSchema.static.getOnFilter = async function (filter){
    const query = {};

    if (filter.isPublic !== undefined) {
        query.isPublic = filter.isPublic;
    }
    if (filter.isActive !== undefined) {
        query.isActive = filter.isActive;
    }
    if (filter.date) {
        query.date = { $gte: new Date(filter.date) };
    }

    const events = await this.find(query)
        .populate('createdBy', 'name username')
        .populate('modifiedBy', 'name username')
        .populate('organizers', 'name username')
        .populate('attendees', 'name username')
        .populate('teams.members', 'name username');

    return events;
}

eventSchema.static.deleteById = async function (eventId) {
    const event = await this.findByIdAndDelete(eventId);
    if (!event) {
        throw new Error('Event not found');
    }
    
    return event;
}

module.exports = eventSchema
