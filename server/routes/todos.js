let express = require('express')
let router = express.Router()
let todoController = require('../controllers/todoController.js')
let loginController = require('../controllers/loginController.js')

// Insert new todo
router.post(
  '/',
  // loginController.verifyLogin,
  // loginController.verifyAdmin,
  todoController.insertDataTodo
)

// Insert new todo by user id
router.post(
  '/:idUser',
  // loginController.verifyLogin,
  // loginController.verifyById,
  todoController.insertDataTodoById
)

// Find all todos
router.get(
  '/',
  // loginController.verifyLogin,
  // loginController.verifyAdmin,
  todoController.findAllTodos
)

// Find todo by user id
router.get(
  '/:idUser',
  // loginController.verifyLogin,
  // loginController.verifyById,
  todoController.findTodoByUserId
)

// Update todo by user id
router.put(
  '/:idUser/:idTodo',
  // loginController.verifyLogin,
  // loginController.verifyById,
  todoController.updateTodoById
)

// Delete todo tags by user id
router.delete(
  '/:idUser/:idTodo',
  // loginController.verifyLogin,
  // loginController.verifyById,
  todoController.removeTodoTags
)

// Delete todo by user id
router.delete(
  '/:idUser/:idTodo',
  // loginController.verifyLogin,
  // loginController.verifyById,
  todoController.removeTodoById
)

module.exports = router
