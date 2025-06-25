const {authenticateUser} = require('../../dal/userDAL.js')
const { generateToken, verifyToken } = require('../../util/jwt.js')
const redisClient = require('../../util/redisClient.js')

const LOGIN_TIMEOUT = 60 * 30 // 30 minutes
const MAX_LOGIN_ATTEMPTS = 5


async function handleLogin(req, res) {
    const { username, password } = req.body
    const attempt = parseInt(await redisClient.get(`login_attempts:${username}`)) || 0
    try {
        if(attempt >= MAX_LOGIN_ATTEMPTS) {
            return res.status(429).json({ message: 'Too many login attempts. Please try again later.' })
        }
        const user = await authenticateUser(username, password)

        const token = generateToken(user)
        redisClient.del(`login_attempts:${username}`)
        res.status(200).json({ 
            message: 'Login successful',
            token: token,
            name: user.name,
            username: user.username,
        })

    } catch (error) {
        redisClient.set(`login_attempts:${username}`, attempt+1);
        redisClient.expire(`login_attempts:${username}`, LOGIN_TIMEOUT)
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

async function handleJWTVerify(req, res) {
    if(!req.user){
        return res.status(401).json({ message: 'Unauthorized' })
    }
    res.status(200).json({ message: 'Token is valid' })
}

module.exports = {
    handleLogin,
    handleJWTVerify
}