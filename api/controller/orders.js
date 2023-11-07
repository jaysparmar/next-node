const knex = require('../config/mysql_db.js')
const constants = require('../helpers/constants.js')
const functions = require('../helpers/functions.js')

const getOrder = async (req, res) => {
  try {
    const { id } = req.body
    console.log(req.body.id)
    let orderData = await knex('orders').where({ id })
    if (orderData.length === 0) {
      return res.json({
        error: true,
        message: 'No order Found'
      })
    }
    orderData = orderData[0]
    orderData.asset_url = functions.getStaticUrl(orderData.asset_url)
    res.json({
      error: false,
      message: 'Data recieved Successfully.',
      data: {
        orderData,
        addresses: []
      }
    })
  } catch (err) {
    console.log(err)
    res.json({
      error: true
    })
  }
}

module.exports = {
  getOrder
}
