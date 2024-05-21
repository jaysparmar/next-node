// database.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('seq_trial', 'root', '', {
  host: '',
  dialect: 'mysql'
})

module.exports = sequelize
