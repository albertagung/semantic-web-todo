let express = require('express')
let router = express.Router()
let adminController = require('../controllers/adminController.js')

// Register new admin
router.post('/',adminController.registerAdmin)

module.exports = router
