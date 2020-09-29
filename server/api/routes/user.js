const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  route
} = require('./film');

const checkAuth = require('../middleware/check-auth');





router.post('/register', (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => { // verif email
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email alredy exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) { // hash
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash, // envoi en DB
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              admin:req.body.admin
            })
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created successfully'
                })
              })
              .catch(err => res.status(500).json({
                error: err
              }));
          }
        })
      }
    })
})


router.post('/login', (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(409).json({
          error: 'Please check Email or Password'
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(409).json({
            error: 'Please check Email or Password'
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          }, 'JaouedPrivateKeyOntheMoon', {
            expiresIn: "1h"
          })
          return res.status(200).json({
            success: 'You have logged successfully !',
            token: token
          })

        }
        res.status(401).json({
          error: 'Please check Email or Password'
        });
      });
    })
    .catch(err => res.status(500).json({
      error: err
    }));

})


router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};

  function updateUser(){
    User.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {                                                                                       // update user ! 
      console.log(result);
      res.status(200).json({
        message: 'User updated successfully',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/api/users/' + id
        }
      });
    })
    .catch(err => res.status(500).json({error: err}));
  }


  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
    if(updateOps['password']){

    
      bcrypt.hash(updateOps['password'], 10, (err, hash) => {
        if (err) { // hash
          return res.status(500).json({ error: err });
        } else {
          updateOps['password'] = hash;
          updateUser(); 
        }
      })
    }else{
      updateUser();
    }
  
})


router.get('/me',(req,res,next) => { 
   const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'JaouedPrivateKeyOntheMoon'); 
    User.findById(decoded.userId)
    .select('-password')
    .exec()
    .then(data => {
      const response = {
        count: data.length,
        profile: data
      }
      if (data) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries !'
        });
      }
    })
    .catch(err => res.status(500).json({
      error: err
    }));

    
  })

router.get('/', (req, res, next) => {
  User.find()
    .select('-__v')
    .exec()
    .then(data => {
      const response = {
        count: data.length,
        users: data
      }
      if (data) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries !'
        });
      }
    })
    .catch(err => res.status(500).json({
      error: err
    }));

});


router.delete('/:userId',(req,res,next) =>{
  const id = req.params.userId; 
  User.remove({_id: id})
  .exec()
  .then(data => {
      console.log(data)
      if(data){
          res.status(200).json({
              message: 'Users deleted successfully',
          /*    request:{
                  type:'POST',
                  url: 'http://localhost:3000/api/users',
                  body: { title: 'String', genre: 'String'}

              }  */
          })
      }else{
          res.status(400).json({message: 'No valid Film entry found for provided ID'});
      }
  })
  .catch(err=>res.status(500).json({error:err}));
})


module.exports = router;
