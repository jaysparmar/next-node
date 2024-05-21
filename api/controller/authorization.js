const jwt = require('jsonwebtoken')
const md5 = require('md5')
const constants = require('../helpers/constants.js')
const functions = require('../helpers/functions.js')
const model = require('../model/admin_sequelize.js')
const Admin = require('../models/Admin.js')

const login = async (req, res) => {
  try {
    let { email, password } = req.body

    let creds = {
      email: email,
      password: md5(password),
      status: '1'
    }

    let userData = await Admin.findAll({
      where: creds
    })

    if (userData.length) {
      const { status, id, role_id } = userData[0]

      if (status == '1') {
        const tokenData = await functions.generateToken(id)

        res.status(200).json({
          error: false,
          message: 'User Logged In successfully',
          accessToken: tokenData.accessToken,
          userData: tokenData.userData,
          permissions: await functions.getPermissions(role_id)
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
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal Server Error.',
      data: []
    })
  }
}

const authMe = async (req, res) => {
  const { jwtConfig } = constants

  try {
    const authHeader = req.headers.authorization
    let token

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length)
    } else {
      return res.status(401).json({ error: { error: 'Invalid User' } })
    }

    jwt.verify(token, jwtConfig.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: { error: 'Invalid User' } })
      } else {
        const userId = decoded.id
        const userData = await Admin.findByPk(userId)

        if (userData) {
          const modifiedUserData = {
            ...userData.toJSON(),
            role: 'admin',
            password: undefined
          }

          return res.status(201).json({ userData: modifiedUserData }).end()
        } else {
          return res.status(404).json({ error: { error: 'User not found' } })
        }
      }
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ error: { error: 'Internal Server Error' } })
  }
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
        const update = await model.updateAdminChange({ id: user_id }, { password: md5(new_password) })
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
