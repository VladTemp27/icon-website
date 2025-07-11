const UserDAL = require('../../dal/userDAL.js')

//TODO: Return error message if user already exists
async function handleRegister(req, res) {
    console.log('Received request to create user:', req.body)
    const { firstName, lastName, username, password, email } = req.body
    try {
        const newUser = await UserDAL.createUser( firstName, lastName,username, password, email)
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}

//TODO: Return error message if user does not exist
async function handleUpdatePoints(req,res) {
    console.log('Received request to update points:', req.body)
    const { username, points } = req.body
    try {
        const updatedUser = await UserDAL.updatePoints(username, points)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error('Error updating points:', error)
        res.status(500).json({ error: 'Failed to update points' })
    }
}

async function handleUpdateRole(req,res) {
    console.log('Received request to update role:', req.body)
    const { username, role } = req.body
    try {
        const updatedUser = await UserDAL.updateRole(username, role)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error('Error updating role:', error)
        res.status(500).json({ error: 'Failed to update role' })
    }
}

async function handleGetAllUsers(req,res) {
    try {
        const users = await UserDAL.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching all users:', error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

async function handleGetUsersByRole(req, res) {
    const { role } = req.params
    try {
        const users = await UserDAL.getUsersByRole(role)
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching users by role:', error)
        res.status(500).json({ error: 'Failed to fetch users by role' })
    }
}

async function handleGetByUsername(req, res) {
    const { username } = req.params
    console.log('Received request to fetch user:', username)

    if (req.user.username !== username && req.user.role !== 'executive') {
        console.warn('Unauthorized access attempt by user:', req.user.username)
        return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' })
    }

    try {
        const user = await UserDAL.getUserByUsername(username)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}

async function handleDeleteUser(req, res) {
    const { username } = req.params
    console.log('Received request to delete user:', username)
    try {
        const deletedUser = await UserDAL.deleteUser(username)
        res.status(200).json(deletedUser)
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ error: 'Failed to delete user' })
    }
}

module.exports = {
    handleRegister,
    handleUpdatePoints,
    handleUpdateRole,
    handleGetAllUsers,
    handleGetUsersByRole,
    handleGetByUsername,
    handleDeleteUser
}