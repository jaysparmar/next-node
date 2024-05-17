// controllers/UserController.js

const User = require('../models/Users')

// Function to create a new user
async function createUser(req, res) {
  try {
    const { firstName, lastName, email } = req.body

    console.log(req.body)

    const user = await User.create({
      firstName,
      lastName,
      email
    })
    res.status(201).json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to get a single user by ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById
}
