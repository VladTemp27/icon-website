const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey'
const JWT_EXIRES_IN = '1h'

function generateToken(user, expiry = JWT_EXIRES_IN) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expiry})
    return token
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    }catch (error) {
        console.error('Token verification failed:', error)
    }
}

module.exports = {
    generateToken,
    verifyToken
}