const wpLib = require('../libraries/whatsapp.js')
const knex = require('../config/mysql_db.js')
const wpModel = require('../model/whatsapp.js')
const orderModel = require('../model/order.js')
const moment = require('moment')

const webhook = async (req, res) => {
  if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == 'jay') {
    return res.send(req.query['hub.challenge'])
  }
  const data = req.body
  if (data.object == 'whatsapp_business_account') {
    const changes = data.entry[0].changes[0]
    if (changes.field == 'messages') {
      const value = changes.value
      if (value.statuses) {
        return handleStatus(req, res)
      }
      let message = value.messages[0]
      switch (message.type) {
        case 'image':
          return handleImage(req, res)
        case 'text':
          return handleText(req, res)
        default:
          return res.sendStatus(200)
      }
    }

    return res.sendStatus(200)
  }
}

const handleText = (req, res) => {
  const data = req.body
  const changes = data.entry[0].changes[0]
  const value = changes.value
  let message = value.messages[0]
  let contact = value.contacts[0]
  const FromName = contact.profile.name
  const FromNumber = message.from
  res.status(200)
}

const handleImage = async (req, res) => {
  const data = req.body
  const changes = data.entry[0].changes[0]
  const value = changes.value
  let message = value.messages[0]
  let contact = value.contacts[0]
  const FromName = contact.profile.name
  const FromNumber = message.from
  const imageId = message.image.id
  await wpLib.getAndMoveAsset(imageId).then(async response => {
    let dbMessage = await wpModel().query.where({ wp_id: message.id })
    if (dbMessage.length != 0) {
      return res.sendStatus(200)
    }
    await wpModel().addIncommingMessage(message.id, message.from, message.type, null, response.path)
    const orderId = await orderModel().addInitialOrder(response.path, FromNumber)

    const reply =
      'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/' +
      orderId.data.status[0]
    await wpLib.sendTextMessage('919016379374', reply).then(async msgRes => {
      await wpModel().addOutgoingMessage(msgRes.messages[0].id, message.from, 'text', reply, response.path)
    })

    return res.sendStatus(200)
  })
}

const handleStatus = async (req, res) => {
  console.log(req.body)
  const data = req.body
  if (data.object == 'whatsapp_business_account') {
    const changes = data.entry[0].changes[0]
    if (changes.field == 'messages') {
      const value = changes.value
      if (value.statuses) {
        const status = value.statuses[0]
        const time = moment(parseInt(status.timestamp)).format('YYYY-MM-DD h:mm:ss')
        if (status.status == 'delivered') {
          await wpModel().updateStatus(status.id, time)
        }
        if (status.status == 'read') {
          await wpModel().updateStatus(status.id, undefined, time)
        }
      }
    }
  }
}

module.exports = {
  webhook
}
