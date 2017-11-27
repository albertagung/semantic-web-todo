let Done = require('../models/doneModel.js')

// Get all done todos list
let getDoneTodos = function(req,res){
  Done.find().populate('user').exec().then(function(dataDone){
    res.send(dataDone)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  getDoneTodos
}
