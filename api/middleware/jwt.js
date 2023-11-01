const constants = require('../helpers/constants.js')
const jwt = require('jsonwebtoken')
const knex = require('../config/mysql_db.js')

const verifyToken = async (req, res, next) => {
  // JWT Verification logic

  req.validate = (module_key, permission) => {
    try {
      if (!req.body.login_user.permissions[module_key][permission]) {
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
      req.body.login_user = user
      req.params.login_user = user

      let data = await knex('admin_roles as ar')
        .leftJoin('admin_roles_permissions as rp', 'ar.id', 'rp.role_id')
        .leftJoin('modules as m', 'm.id', 'rp.module_id')
        .where('ar.id', '=', req.body.login_user.role)
        .select(
          'm.module_key',
          'rp.createP as create',
          'rp.updateP as update',
          'rp.deleteP as delete',
          'rp.readP as read'
        )

      let arr = data.map(val => {
        Object.keys(val).map(data => {
          if (data != 'module_key') {
            if (val[data] == '1') {
              val[data] = true
            } else {
              val[data] = false
            }
          }
        })

        return val
      })
      req.body.login_user.permissions = {}
      arr.forEach(row => {
        req.body.login_user.permissions[row.module_key] = row
        delete req.body.login_user.permissions[row.module_key].module_key
      })
    }

    return next()
  })
}

module.exports = {
  verifyToken
}
