const config = require('../helpers/constants.js')
const knex = require('knex')

module.exports = knex({
  client: 'mysql',
  connection: {
    host: config.dbconfig.host,
    port: config.dbconfig.port,
    user: config.dbconfig.user,
    password: config.dbconfig.password,
    database: config.dbconfig.database
  }
})
