const express = require('express')
const authController = require('../controller/authController.js')

const { environmentMiddleware } = require('../middleware/environment.js')

const authRouter = express.Router()
authRouter.use(express.json())

authRouter.get('/health', (req, res) => {
    res.json({"message":"auth api healthy"})
})

authRouter.post('/login', authController.handleLogin)
authRouter.post('/jwt/verify',environmentMiddleware('development'),authController.handleJWTVerify)

module.exports = authRouter
