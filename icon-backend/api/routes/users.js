const express = require('express')
const userRouter = express.Router()
userRouter.use(express.json())

const { authorize } = require('../middleware/authorize.js')
const userController = require('../controller/userController.js')

userRouter.get('/health', (req, res) => {
    res.json({"message":"users api healthy"})
})

userRouter.post('/register', userController.handleRegister)

userRouter.post('/update/points', userController.handleUpdatePoints)

//FIXME: This endpoint should not use authorize middleware, as it is used to update the role. This should cross validate with actual role from db
userRouter.post('/update/role', authorize('executive') ,userController.handleUpdateRole)

userRouter.get('/all', authorize('executive'),userController.handleGetAllUsers)

userRouter.get('/role/:role', authorize('officer'),userController.handleGetUsersByRole)

userRouter.get('/user/:username',userController.handleGetByUsername)

userRouter.delete('/:username', authorize('executive'),userController.handleDeleteUser)

module.exports = userRouter
