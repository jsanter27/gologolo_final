var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportConfig = require('../config/passport');
const User = require('../models/User');

const signToken = id => {
  return jwt.sign({
    iss : 'goLogoLo',
    sub : id
  }, "jdsaint27", {expiresIn: "1h"});
}

// REGISTER ROUTE
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.findOne({username}, (err, user) => {
    if (err)
      res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
    if (user)
      res.status(400).json({message : {msgBody : "Account already exists with that email", msgError: true}});
    else {
      const newUser = new User({username, password});
      newUser.save(err => {
        if (err)
          res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
        else 
          res.status(201).json({message : {msgBody : "Account succesfully created", msgError : false}});
      });
    }
  });
});

// LOGIN ROUTE
router.post('/login', passport.authenticate('local', {session : false}) , (req, res) => {
  if (req.isAuthenticated()){
    const {_id, username} = req.user;
    const token = signToken(_id);
    res.cookie('accessToken', token, {httpOnly : true, sameSite : true});
    res.status(200).json({isAuthenticated : true, user : {username}});
  }
});

// LOGOUT ROUTE
router.get('/logout', passport.authenticate('jwt', {session : false}), (req, res) => {
  res.clearCookie('accessToken');
  res.json({user : {username : ""}, success : true});
});

// PERSISTENCE
router.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res) => {
  const {username} = req.user;
  res.status(200).json({isAuthenticated : true, user: {username}});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
