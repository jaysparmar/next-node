const knex = require('../config/mysql_db.js')
const constants = require('../helpers/constants.js')
const functions = require('../helpers/functions.js')

const register = async (req, res) => {
  console.log(req.body)

  const {
    pharmacy_name,
    owner_name,
    email,
    license_no,
    whatsapp_no,
    bank_ifsc,
    awards,
    bank_account_number,
    lat,
    lng
  } = req.body

  const check = await knex('pharmacies').insert({
    pharmacy_name,
    owner_name,
    email,
    license_no,
    whatsapp_no,
    bank_ifsc,
    awards,
    bank_account_number,
    lat,
    lng
  })

  if (!check) {
    return res
      .json({
        error: true,
        message: 'Something went wrong'
      })
      .end()
  }

  return res
    .json({
      error: false,
      message: 'Pharmacy registered Successfully.'
    })
    .end()
}

module.exports = {
  register
}
