let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController.js')
let loginController = require('../controllers/loginController.js')

// Insert new user
router.post('/',userController.insertDataUser)

// Find all users
router.get(
  '/',
  // loginController.verifyLogin,
  // loginController.verifyAdmin,
  userController.findAllUsers
)

// Update user by id
router.put(
  '/:id',
  // loginController.verifyLogin,
  // loginController.verifyById,
  userController.updateUserById
)

// Delete user by id
router.delete(
  '/:id',
  // loginController.verifyLogin,
  // loginController.verifyAdmin,
  userController.removeUserById
)

module.exports = router
