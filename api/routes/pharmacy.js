const express = require('express')
const controller = require('../controller/pharmacy.js')

const router = express.Router()

router.post('/register', controller.register)

module.exports = router
