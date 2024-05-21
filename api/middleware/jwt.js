const constants = require('../helpers/constants.js')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin.js')
const Role = require('../models/Roles.js')

const verifyToken = async (req, res, next) => {
  // JWT Verification logic
  const { jwtConfig } = constants

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

  const authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: true, message: 'Token not found' })

    return res.end()
  }

  req.successStatus = 200

  jwt.verify(token, jwtConfig.secret, async (err, user) => {
    if (err) {
      res.status(401).json({ error: true, message: 'Authorization failed!' })

      return res.end()
    }

    if (user) {
      req.login_user = user
      req.permissions = []

      try {
        const checkToken = await Admin.findOne({
          where: { id: req.login_user.id, access_token: token }
        })

        if (!checkToken) {
          return res.status(401).json({ error: true, message: 'Authorization failed!' }).end()
        }

        if (checkToken.permission_reset == 1) {
          req.successStatus = 201
        }

        const role = await Role.findOne({
          where: { id: req.login_user.role_id }
        })

        if (role) {
          req.permissions = JSON.parse(role.permissions)
        }
      } catch (dbError) {
        console.error('Database error:', dbError)

        return res.status(500).json({ error: true, message: 'Internal Server Error' }).end()
      }
    }

    return next()
  })
}

module.exports = {
  verifyToken
}
