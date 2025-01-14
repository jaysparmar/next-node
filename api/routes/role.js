const express = require('express')
const role = require('../controller/role.js')

const router = express.Router()

router.post('/create', role.createRole)
router.post('/listing', role.paginateRole)
router.post('/update', role.updateRole)
router.post('/delete', role.deleteRole)
router.post('/get-detail', role.getRoleDetail)

module.exports = router
