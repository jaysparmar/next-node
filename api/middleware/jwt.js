const constants = require('../helpers/constants.js')
const jwt = require('jsonwebtoken')
const knex = require('../config/mysql_db.js')

const verifyToken = async (req, res, next) => {
  // JWT Verification logic
  req.validate = module_key => {
    try {
      if (!req.permissions.includes(module_key)) {
        res.json({
          error: true,
          message: 'You do not have the Permission. Please contact admin.',
          data: {}
        })
        res.end()

        return false
      }

      return true
    } catch (err) {
      return false
    }
  }

  const { jwtConfig } = constants
  const authHeader = req.headers['authorization']

  let token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).send({ error: true, message: 'Token not found' }) // if there isn't any token

    return res.end()
  }

  jwt.verify(token, jwtConfig.secret, async (err, user) => {
    if (err) {
      res.status(401).send({ error: true, message: 'Authorization failed!' })

      return res.end()
    }

    if (user != undefined) {
      req.login_user = user
      req.permissions = []

      const roles = await knex('roles').where({ id: req.login_user.role_id })
      if (roles.length != 0) {
        req.permissions = JSON.parse(roles[0].permissions)
      }
    }

    return next()
  })
}

module.exports = {
  verifyToken
}
