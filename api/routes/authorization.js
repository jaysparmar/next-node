const express = require('express')
const authorization = require('../controller/authorization.js')
const verifyToken = require('../middleware/jwt.js')

const router = express.Router()

router.post('/login', authorization.login)
router.post('/get-user-detail', verifyToken.verifyToken, authorization.getUserDetail)
router.post('/change-password', verifyToken.verifyToken, authorization.changePassword)
router.post('/refresh-token', authorization.refreshToken)

module.exports = router
