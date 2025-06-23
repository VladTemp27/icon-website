const {authenticateUser} = require('../../dal/userDAL.js')
const { generateToken, verifyToken } = require('../../services/jwt.js')


async function handleLogin(req, res) {
    const { username, password } = req.body
    try {
        const user = await authenticateUser(username, password)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = generateToken(user)

        res.status(200).json({ 
            message: 'Login successful',
            token: token,
            name: user.name,
            username: user.username,
        })

    } catch (error) {
        console.error('Login error:', error)
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

async function handleJWTVerify(req, res) {
    const { token } = req.body
    console.log('Received token for verification:', token)
    try {
        const decoded = verifyToken(token)
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        res.status(200).json({ message: 'Token is valid', user: decoded })
    } catch (error) {
        console.error('Token verification error:', error)
        res.status(500).json({ message: 'Failed to verify token' })
    }
}

module.exports = {
    handleLogin,
    handleJWTVerify
}