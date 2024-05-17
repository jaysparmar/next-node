// routes/userRoutes.js

const express = require('express')
const userController = require('../controller/UserController')

const router = express.Router()

// Create a new user
router.post('/user', userController.createUser)

// Get all users
router.get('/', userController.getAllUsers)

// Get a single user by ID
router.get('/:id', userController.getUserById)

module.exports = router
