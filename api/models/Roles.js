// models/Roles.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const Roles = sequelize.define(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false // Disable automatic `createdAt` and `updatedAt` columns
  }
)

module.exports = Roles
