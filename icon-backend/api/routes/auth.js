const express = require('express')
const authController = require('../controller/authController.js')
const { authenticate } = require('../middleware/authorize.js')

const { environmentMiddleware } = require('../middleware/environment.js')

const authRouter = express.Router()
authRouter.use(express.json())

authRouter.get('/health', (req, res) => {
    res.json({"message":"auth api healthy"})
})

authRouter.post('/login', authController.handleLogin)
authRouter.post('/verify',authenticate ,authController.handleJWTVerify)

module.exports = authRouter
