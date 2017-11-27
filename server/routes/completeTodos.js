let express = require('express')
let router = express.Router()
let todoController = require('../controllers/todoController.js')
let doneController = require('../controllers/doneController.js')

// Complete todo by id
router.get('/:idUser/:idTodo', todoController.completeTodo)

// Get all done todos
router.get('/', doneController.getDoneTodos)

// Get todo by user id
router.get('/:idUser', doneController.getDoneTodosById)

module.exports = router
