const User = require('../models/User.model')
const mongoose = require('mongoose')

// FIXME: Known errors should have their own error classes
async function createUser( firstName, lastName,username, password, email) {
    try {
        const newUser = await User.register( firstName, lastName,username, password, email)
        return newUser
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

async function authenticateUser(username, password) {
    try {
        const user = await User.authenticate(username, password)
        return user
    } catch (error) {
        console.error('Error authenticating user:', error)
        throw error
    }
}

async function updatePoints(username, points) {
    try {
        const user = await User.updatePoints(username, points)
        return user
    } catch (error) {
        console.error('Error updating points:', error)
        throw error
    }
}

async function updateRole(username, role) {
    try {
        const user = await User.updateRole(username, role)
        return user
    } catch (error) {
        console.error('Error updating role:', error)
        throw error
    }
}

async function getAllUsers() {
    try {
        const users = await User.getAllUsers()
        return users
    } catch (error) {
        console.error('Error fetching all users:', error)
        throw error
    }
}

async function getUsersByRole(role) {
    try {
        const users = await User.getUsersByRole(role)
        return users
    } catch (error) {
        console.error('Error fetching users by role:', error)
        throw error
    }
}

async function getUserByUsername(username) {
    try {
        const user = await User.findByUsername(username)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
    catch (error) {
        console.error('Error fetching user by username:', error)
        throw error
    }
}

async function getUserbyEmail(email) {
    try {
        const user = await User.findByEmail(email)
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }catch (error) {
        console.error('Error fetching user by email:', error)
        throw error
    }
}

async function deleteUser(username) {
    try {
        const user = await User.deleteUser(username)
        return user
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}


module.exports = {
    createUser, 
    authenticateUser, 
    updatePoints, 
    updateRole, 
    getAllUsers, 
    getUsersByRole, 
    getUserByUsername,
    getUserbyEmail,
    deleteUser
}
