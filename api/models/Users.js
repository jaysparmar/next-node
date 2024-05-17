// models/User.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const User = sequelize.define(
  'User',
  {
    // Define the structure of the table
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'User' // Specify the table name
  }
)

module.exports = User
