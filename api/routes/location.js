const express = require('express')
const location = require('../controller/location.js')

const router = express.Router()

router.post('/create', location.createLocation)
router.post('/listing', location.paginateLocation)
router.post('/get-detail', location.getDetail)
router.post('/update', location.updateLocation)
router.post('/delete', location.deleteLocation)
router.post('/get-location-by-status', location.getDetailsByStatus)

module.exports = router
