let Done = require('../models/doneModel.js')

// Get all done todos list
let getDoneTodos = function(req,res){
  Done.find().populate('user').exec().then(function(dataDone){
    res.send(dataDone)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Get done todo list by id
let getDoneTodosById = function(req,res){
  Done.find(
    {
      user: req.params.idUser
    }
  ).populate('user').exec().then(function(dataDone){
    res.status(200).send(dataDone)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  getDoneTodos,
  getDoneTodosById
}
