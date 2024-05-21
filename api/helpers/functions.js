const { createBot } = require('whatsapp-cloud-api')
const fs = require('fs')
const constants = require('./constants.js')
const jwt = require('jsonwebtoken')
const Role = require('../models/Roles.js') // Replace with your actual Role model
const Admin = require('../models/Admin.js') // Replace with your actual Role model

const { Op } = require('sequelize')

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

const generateToken = async user_id => {
  const { jwtConfig } = constants

  try {
    let userData = await Admin.findOne({ where: { id: user_id }, raw: true })

    if (!userData) {
      throw new Error('User not found')
    }

    userData.fullName = `${userData.firstname} ${userData.lastname}`
    userData.role = 'admin'
    delete userData.password
    delete userData.access_token

    const accessToken = jwt.sign(userData, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    await Admin.update({ access_token: accessToken }, { where: { id: userData.id } })

    return {
      userData,
      accessToken
    }
  } catch (error) {
    console.error('Error generating token:', error)
    throw new Error('Token generation failed')
  }
}

const fetchDetails = async (
  model,
  where = {},
  attributes = [],
  limit = null,
  offset = 0,
  sort = 'id',
  order = 'DESC',
  whereInKey = '',
  whereInValue = []
) => {
  const queryOptions = {
    where,
    attributes: attributes.length > 0 ? attributes : undefined,
    limit: limit !== null ? limit : undefined,
    offset: offset !== null ? offset : 0,
    order: [[sort, order]]
  }

  if (whereInKey && whereInValue.length > 0) {
    queryOptions.where[whereInKey] = {
      [Op.in]: whereInValue
    }
  }

  try {
    const result = await model.findAll(queryOptions)

    return result
  } catch (error) {
    console.error('Error fetching details:', error)

    return []
  }
}

// const getPermissions = async role_id => {
//   const data = await fetchDetails('roles', { id: role_id })
//   if (data.length == 0) {
//     return []
//   }

//   return JSON.parse(data[0].permissions)
// }

const getPermissions = async role_id => {
  try {
    const data = await Role.findOne({ where: { id: role_id }, raw: true })
    if (!data) {
      return []
    }

    return JSON.parse(data.permissions)
  } catch (error) {
    console.error('Error fetching permissions:', error)

    return []
  }
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
