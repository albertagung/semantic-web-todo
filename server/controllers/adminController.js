let User = require('../models/userModel.js')
let crypt = require('../helper/crypt.js')

// Register new admin
let registerAdmin = function (req,res) {
  crypt(req.body.password).then(function(dataPassword){
    console.log(dataPassword);
    let newAdmin = User(
      {
        username: req.body.username,
        password: dataPassword,
        role: req.body.role
      }
    )
    newAdmin.save().then(function(dataAdmin){
      res.send(dataAdmin)
    }).catch(function(err){
      res.status(500).send(err)
    })
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  registerAdmin
}
