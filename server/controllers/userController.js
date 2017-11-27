let User = require('../models/userModel.js')
let crypt = require('../helper/crypt.js')

// Insert new user to users collection
let insertDataUser = function(req,res){
  crypt(req.body.password).then(function(dataPassword){
    console.log(dataPassword);
    let newUser = User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: dataPassword,
        role: 'user'
      }
    )
    newUser.save().then(function(dataUsers){
      res.send(dataUsers)
    }).catch(function(err){
      console.log('masuk error');
      res.status(500).send(err)
    })
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// List all users
let findAllUsers = function(req,res){
  User.find().then(function(dataUsers){
    res.send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update a user by id
let updateUserById = function(req,res){
  if(req.body.password){
    crypt(req.body.password).then(function(dataPassword){
      User.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: dataPassword,
          role: req.body.role
        }
      ).then(function(dataUsers){
        res.send(dataUsers)
      }).catch(function(err){
        res.status(500).send(err)
      })
    }).catch(function(err){
      res.status(500).send(err)
    })
  }
  else{
    User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        role: req.body.role
      }
    ).then(function(dataUsers){
      res.send(dataUsers)
    }).catch(function(err){
      res.status(500).send(err)
    })
  }
}

// Delete user by id
let removeUserById = function(req,res){
  User.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataUsers){
    res.send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  insertDataUser,
  findAllUsers,
  updateUserById,
  removeUserById
}
