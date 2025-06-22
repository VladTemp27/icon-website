const express = require('express')
const {
    createUser,
    updatePoints,
    getAllUsers,
    getUsersByRole,
    getUserByUsername,
    getUserbyEmail,
    deleteUser,
    updateRole
        } = require('../dal/userDAL.js')

const userRouter = express.Router()
userRouter.use(express.json())

const { authorize } = require('./middleware/authorize.js')

userRouter.get('/health', (req, res) => {
    res.json({"message":"users api healthy"})
})

//TODO: Return error message if user already exists
userRouter.post('/register', async (req, res) => {
    console.log('Received request to create user:', req.body)
    const { username, password, email } = req.body
    try {
        const newUser = await createUser(username, password, email)
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
})

//TODO: Return error message if user does not exist
userRouter.post('/update/points', async (req, res) => {
    console.log('Received request to update points:', req.body)
    const { username, points } = req.body
    try {
        const updatedUser = await updatePoints(username, points)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error('Error updating points:', error)
        res.status(500).json({ error: 'Failed to update points' })
    }
})

//FIXME: This endpoint should not use authorize middleware, as it is used to update the role. This should cross validate with actual role from db
userRouter.post('/update/role', authorize('executive') ,async (req, res) => {
    console.log('Received request to update role:', req.body)
    const { username, role } = req.body
    try {
        const updatedUser = await updateRole(username, role)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error('Error updating role:', error)
        res.status(500).json({ error: 'Failed to update role' })
    }
})


userRouter.get('/all', authorize('executive'),async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching all users:', error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

userRouter.get('/role/:role', authorize('officer'),async (req, res) => {
    const { role } = req.params
    try {
        const users = await getUsersByRole(role)
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching users by role:', error)
        res.status(500).json({ error: 'Failed to fetch users by role' })
    }
})

userRouter.get('/user/:username', async (req, res) => {
    const { username } = req.params
    console.log('Received request to fetch user:', username)

    if (req.user.username !== username && req.user.role !== 'executive') {
        console.warn('Unauthorized access attempt by user:', req.user.username)
        return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' })
    }

    try {
        const user = await getUserByUsername(username)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ error: 'Failed to fetch user' })
    }
})

userRouter.get('/email/:email', async (req, res) => {
    const { email } = req.params
    console.log('Received request to fetch user by email:', email)
    try {
        const user = await getUserbyEmail(email)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    }
    catch (error) {
        console.error('Error fetching user by email:', error)
        res.status(500).json({ error: 'Failed to fetch user by email' })
    }
})

userRouter.delete('/:username', authorize('executive'),async (req, res) => {
    const { username } = req.params
    console.log('Received request to delete user:', username)
    try {
        const deletedUser = await deleteUser(username)
        res.status(200).json(deletedUser)
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ error: 'Failed to delete user' })
    }
})

module.exports = userRouter
