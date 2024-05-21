// models/Admin.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const Admin = sequelize.define(
  'admins',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // 1 = active, 2 = inactive
    },

    role_id: {
      type: DataTypes.INTEGER, // Include role_id field
      allowNull: false
    },
    access_token: {
      type: DataTypes.STRING(512), // Adjust the length as needed
      allowNull: true
    },
    permission_reset: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'admins',
    timestamps: false // Disable automatic `createdAt` and `updatedAt` columns
  }
)

module.exports = Admin
