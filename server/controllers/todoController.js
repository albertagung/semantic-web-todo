let Todo = require('../models/todoModel.js')
let Done = require('../models/doneModel.js')

// Insert new todo
let insertDataTodo = function(req,res){
  let newTodo = Todo(
    {
      user: req.body.idUser,
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      status: req.body.status
    }
  )
  newTodo.save().then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Insert new todo by user id
let insertDataTodoById = function(req,res){
  let newTodoById = Todo(
    {
      user: req.params.idUser,
      name: req.body.name,
      tags: req.body.tags,
      status: req.body.status
    }
  )
  newTodoById.save().then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Find all todo
let findAllTodos = function(req,res){
  Todo.find().populate('user').exec().then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Find todo by user id
let findTodoByUserId = function(req,res){
  Todo.find(
    {
      user: req.params.idUser
    }
  ).populate('user').exec().then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update todo by user id
let updateTodoById = function(req,res){
  Todo.findOneAndUpdate(
    {
      _id: req.params.idTodo,
      user: req.params.idUser
    },
    {
      name: req.body.name,
      status: req.body.status,
      tags: req.body.tags,
      updatedAt: new Date()
    }
  ).then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Delete todo tags by id
let removeTodoTags = function(req,res){
  Todo.update(
    {
      _id: req.params.idTodo,
      user: req.params.idUser
    },
    {
      $pullAll: {tags: [req.body.removeTags]}
    }
  ).then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Delete todo by id
let removeTodoById = function(req,res){
  Todo.findOneAndRemove(
    {
      _id: req.params.idTodo,
      user: req.params.idUser
    }
  ).then(function(dataTodos){
    res.send(dataTodos)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Complete todo by id
let completeTodo = function(req,res){
  Todo.findOne(
    {
      _id: req.params.idTodo,
      user: req.params.idUser
    }
  ).then(function(dataTodos){
    console.log(dataTodos);
    let newDone = Done(
      {
        user: dataTodos.user,
        name: dataTodos.name,
        description: dataTodos.description,
        tags: dataTodos.tags,
        status: 'Completed'
      }
    )
    newDone.save().then(function(dataDone){
      Todo.findOneAndRemove(
        {
          _id: req.params.idTodo,
          user: req.params.idUser
        }
      ).then(function(dataDeleted){
        res.send(dataDeleted)
      }).catch(function(err){
        res.status(500).send(err)
      })
    }).catch(function(err){
      res.status(500).send(err)
    })
  })
}

module.exports = {
  insertDataTodo,
  insertDataTodoById,
  findAllTodos,
  findTodoByUserId,
  updateTodoById,
  removeTodoTags,
  removeTodoById,
  completeTodo
}
