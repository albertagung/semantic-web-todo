let express = require('express')
let router = express.Router()
let loginController = require('../controllers/loginController.js')

// Get login page
router.post(
  '/',
  loginController.getLogin
)

module.exports = router
