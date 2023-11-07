const express = require('express')
const controller = require('../controller/orders.js')

const router = express.Router()

router.post('/get', controller.getOrder)

module.exports = router
