// database.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('next-node-sequelize', 'root', '', {
  host: '',
  dialect: 'mysql'
})

module.exports = sequelize
