const express = require('express')
const {authenticateUser} = require('../dal/userDAL.js')
const { generateToken } = require('../services/jwt.js')


const authRouter = express.Router()
authRouter.use(express.json())

authRouter.get('/health', (req, res) => {
    res.json({"message":"auth api healthy"})
})

authRouter.post('/login', async (req, res) => {
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
})

module.exports = authRouter
