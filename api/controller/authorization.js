const jwt = require('jsonwebtoken')
const md5 = require('md5')
const knex = require('../config/mysql_db.js')
const constants = require('../helpers/constants.js')
const functions = require('../helpers/functions.js')
const model = require('../model/admin.js')

const login = async (req, res) => {
  let { email, password } = req.body

  let creds = {
    email: email,
    password: md5(password),
    status: '1'
  }
  let userData = await model.getAdminDetails(creds)
  if (userData.length) {
    const { status } = userData[0]
    delete userData[0].password

    if (status === '1') {
      // try {
      const { jwtConfig } = constants

      const accessToken = jwt.sign(
        {
          id: userData[0].id,
          role_id: userData[0].role,
          email: userData[0].email
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expireTime }
      )

      const refreshToken = jwt.sign(
        {
          id: userData[0].id,
          role_id: userData[0].role,
          email: userData[0].email
        },
        jwtConfig.refreshTokenSecret,
        {
          expiresIn: jwtConfig.refreshTokenExpireTime
        }
      )
      res.status(200).json({
        error: false,
        message: 'User Logged In successfully',
        accessToken,
        refreshToken,
        userData: { ...userData[0], role: 'admin' }
      })
    } else {
      res.status(200).json({
        error: true,
        message: 'Account is blocked or not exist.',
        data: []
      })
    }
  } else {
    res.status(200).json({
      error: true,
      message: 'Invalid Username and Password.',
      data: []
    })
  }
  res.end()
}

const authMe = (req, res) => {
  const { jwtConfig } = constants
  const authHeader = req.headers.authorization
  let token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length)
  } else {
    //Error
    return res
      .status(401)
      .json({ error: { error: 'Invalid User' } })
      .end()
  }

  jwt.verify(token, jwtConfig.secret, async (err, decoded) => {
    if (err) {
      if (defaultAuthConfig.onTokenExpiration === 'logout') {
        return res
          .status(401)
          .json({ error: { error: 'Invalid User' } })
          .end()
      } else {
        const oldTokenDecoded = jwt.decode(token, { complete: true })
        const payload = oldTokenDecoded.payload

        const accessToken = jwt.sign(payload, jwtConfig.secret, {
          expiresIn: jwtConfig.expireTime
        })

        // Simulate setting the new token in localStorage (client-side)
        // For an Express route, you would not handle the client-side localStorage directly.
        // You'd typically send the new token to the client in the response.
        // Simulate storing the token in the response
        res.set('Authorization', accessToken)

        const obj = { userData: { ...user, password: undefined } }

        return res.status(200).json(obj).end()
      }
    } else {
      const userId = decoded.id
      const userData = await knex('admins').where({ id: userId })
      delete userData[0].password
      userData[0].role = 'admin'

      return res.status(200).json({ userData: userData[0] }).end()
    }
  })
}

const getUserDetail = async (req, res) => {
  try {
    const { id } = req.body
    const data = await model.getUserDetail({ id })
    if (data.length) {
      res.json({
        error: false,
        message: 'success. user details receive',
        data: data
      })
    } else {
      res.json({
        error: false,
        message: 'sorry. no record found',
        data: []
      })
    }
  } catch (error) {
    res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const changePassword = async (req, res) => {
  try {
    const { user_id, old_password, new_password, confirm_password } = req.body

    const userDetails = await model.getAdminDetails({ id: user_id })
    if (md5(old_password) === userDetails[0].password && userDetails[0]) {
      if (new_password == confirm_password) {
        const update = await model.updateAdmin({ id: user_id }, { password: md5(new_password) })
        if (update) {
          const body = `<b> Hi ${userDetails[0].firstname} ${userDetails[0].lastname}, </b><br>
                    Your password has been changed successfully!<br><br>

                    If this is not done by you, contact administration for more inquiry`

          const sended = await functions.sendEmail('Password Changed', userDetails[0].email, '', body)
          if (sended.error) {
            return res.json({
              error: true,
              message: sended.message,
              data: sended.error.data
            })
          }

          return res.json({
            error: false,
            message: 'Your Password Changed successfully'
          })
        }

        return res.json({
          error: true,
          message: 'Sorry. Password is not updated'
        })
      }

      return res.json({
        error: true,
        massage: 'confirm password is not match',
        data: []
      })
    }

    return res.json({
      error: true,
      massage: 'password not match',
      data: []
    })
  } catch (error) {
    return res.json({
      error: true,
      message: 'something want wrong',
      data: error
    })
  }

  return res.end()
}

const refreshToken = async (req, res) => {
  const parseJwt = token => {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  const oldrefreshToken = req.body.refreshToken
  const { jwtConfig } = constants
  jwt.verify(oldrefreshToken, jwtConfig.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(200).send({ error: true, message: 'Authorization failed!' })
    }
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const payload = parseJwt(token)

    const data = {
      id: payload.id,
      role: payload.role,
      email: payload.email
    }
    const accessToken = jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
    const refreshToken = jwt.sign(data, jwtConfig.refreshTokenSecret, { expiresIn: jwtConfig.refreshTokenExpireTime })
    res.status(200).json({
      error: false,
      message: 'Token Renewed.',
      accessToken,
      refreshToken
    })
  })
}

module.exports = {
  login,
  getUserDetail,
  changePassword,
  refreshToken,
  authMe
}
