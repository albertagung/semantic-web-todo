let User = require('../models/userModel.js')
let jwt = require('jsonwebtoken')
let compare = require('../helper/compare.js')

// Get token
let getLogin = function(req,res){
  User.findOne(
    {
      'username': req.body.username
    },
    '_id username password role',
    function(err,dataUsers){
      if(err){
        res.status(500).send(err)
      }
      else{
        compare(req.body.password,dataUsers.password).then(function(dataResponse){
          console.log(dataResponse);
          if(dataResponse){
            jwt.sign(
              {
                id: dataUsers._id,
                username: dataUsers.username,
                role: dataUsers.role
              },
              process.env.SECRET_KEY,
              function(err,token){
                if(err){
                  console.log(err);
                  res.status(500).send(err)
                }
                else{
                  req.header.token = token
                  res.send('Login Succeed!')
                }
              }
            )
          }
          else{
            res.status(401).send('Incorrect Username or Password')
          }
        }).catch(function(err){
          res.status(401).send(err)
        })
      }
    }
  )
}

// Get verification
let verifyLogin = function(req,res,next){
  console.log(req.header.token);
  jwt.verify(
    req.header.token,
    process.env.SECRET_KEY,
    function(err,decoded){
      if(err){
        res.send(err)
      }
      else{
        req.isVerified = decoded
        next()
      }
    }
  )
}

// Role verification (admin only)
let verifyAdmin = function(req,res,next){
  if(req.isVerified.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

// Role verification (by id)
let verifyById = function(req,res,next){
  if(req.isVerified.id == req.params.id || req.isVerified.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

module.exports = {
  getLogin,
  verifyLogin,
  verifyAdmin,
  verifyById
}
