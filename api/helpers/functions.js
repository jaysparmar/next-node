const { createBot } = require('whatsapp-cloud-api')
const fs = require('fs')
const constants = require('./constants.js')
const jwt = require('jsonwebtoken')

const knex = require('../config/mysql_db.js')

const getRandomFileName = name => {
  let ext = name.split('.')
  ext = ext[ext.length - 1]

  return Math.ceil(Math.random() * 100000) + name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.' + ext
}

const getStaticUrl = fileName => {
  return `${constants.BASE_URL}/${fileName}`
}

const sendEmail = async (subject, sendTo, text, html) => {
  return new Promise(resolve => {
    const mailData = {
      from: constants.mailConfig.mail,
      to: sendTo,
      subject: subject,
      text: text,
      html: html
    }
    constants.transporter.sendMail(mailData, async (error, success) => {
      if (success) {
        return resolve({
          error: false,
          message: 'mail sended'
        })
      }

      return resolve({
        error: true,
        message: 'Server is down! Please try after sometime',
        data: error
      })
    })
  })
}

const removeFile = (filePath, oldImage) => {
  return new Promise((resolve, reject) => {
    fs.unlink(`${filePath}${oldImage}`, async err => {
      if (err) {
        return reject({
          error: true,
          data: err
        })
      }
    })

    return resolve({
      error: false
    })
  })
}

const uploadFile = (filePath, imageFile) => {
  return new Promise(async (resolve, reject) => {
    const newName = getRandomFileName(imageFile.name)

    await imageFile.mv(`${filePath}${newName}`, async err => {
      if (err) {
        return reject({
          error: true,
          data: err
        })
      }
    })

    return resolve({
      error: false,
      data: newName
    })
  })
}

const fetchDetails = async (
  table,
  where = {},
  fields = [],
  limit = null,
  offset = '0',
  sort = 'id',
  order = 'desc',
  whereInKey = '',
  whereInValue = {}
) => {
  let query = knex(table)

  if (fields.length > 0) {
    query = query.select(fields)
  }

  if (Object.keys(where).length > 0) {
    query = query.where(where)
  }

  if (whereInKey !== '' && Object.keys(whereInValue).length > 0) {
    query = query.whereIn(whereInKey, Object.values(whereInValue))
  }

  if (limit !== null) {
    query = query.limit(limit).offset(offset)
  }

  query = query.orderBy(sort, order)

  try {
    const result = await query

    return result
  } catch (error) {
    return []
  }
}

const generateToken = async user_id => {
  const jwt = require('jsonwebtoken')
  const { jwtConfig } = constants
  let userData = await fetchDetails('admins', { id: user_id })
  userData = JSON.parse(JSON.stringify(userData[0]))
  userData.fullName = userData.firstname + ' ' + userData.lastname
  userData.role = 'admin'
  delete userData.password
  delete userData.access_token
  const accessToken = jwt.sign(userData, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

  // return
  await knex('admins').update({ access_token: accessToken }).where({ id: userData.id })

  return {
    userData,
    accessToken
  }
}

const getPermissions = async role_id => {
  const data = await fetchDetails('roles', { id: role_id })
  if (data.length == 0) {
    return []
  }

  return JSON.parse(data[0].permissions)
}

const wpBot = createBot(constants.whatsappFrom, constants.whatsappToken)

module.exports = {
  getRandomFileName,
  getStaticUrl,
  sendEmail,
  uploadFile,
  removeFile,
  wpBot,
  fetchDetails,
  generateToken,
  getPermissions
}
