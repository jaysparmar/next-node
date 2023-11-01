const { createBot } = require('whatsapp-cloud-api')
const fs = require('fs')
const constants = require('./constants.js')

const getRandomFileName = name => {
  let ext = name.split('.')
  ext = ext[ext.length - 1]

  return Math.ceil(Math.random() * 100000) + name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.' + ext
}

const getStaticUrl = fileName => {
  return `${constants.BASE_URL}${constants.STATIC_PATH}/${fileName}`
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

const wpBot = createBot(constants.whatsappFrom, constants.whatsappToken)

module.exports = {
  getRandomFileName,
  getStaticUrl,
  sendEmail,
  uploadFile,
  removeFile,
  wpBot
}
