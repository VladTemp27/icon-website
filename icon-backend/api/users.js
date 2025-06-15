const express = require('express')

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.get('/health', (req, res) => {
    res.json({"message":"users api healthy"})
})


module.exports = userRouter
