var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportConfig = require('../config/passport');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
    else if (user)
      res.status(400).json({message : {msgBody : "Account already exists with that email", msgError: true}});
    else {
      const newUser = new User({username, password, resetPasswordToken:null, resetPasswordExpires:null});
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

// FORGOT PASSWORD ROUTE
router.post('/forgot', (req, res) => {
  const { username } = req.body;
  User.findOne({username}, (err, user) => {
    if (err)
      res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
    else if (!user)
      res.status(400).json({message : {msgBody : "No account with that email", msgError: true}});
    else {
      const token = crypto.randomBytes(20).toString('hex');
      user.updateOne({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now()+3600000
      }, (err, raw) => {
        if (err)
          res.status(500).json({message : {msgBody : "Database Error", msgError: true}});
      });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gologolo.authentication@gmail.com',
          pass: 'gologolo123'
        }
      });
      const mailOptions = {
        from: 'gologolo.authentication@gmail.com',
        to: `${user.username}`,
        subject: 'Reset Password Request',
        text: `To reset your password, please click the link within one hour of receiving this email:\n\n` +
              `http://localhost:3001/reset/${token}\n\n` +
              `If you didn't request this, please ignore and your password will not change.\n`
      };
      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          res.status(500).json({message : {msgBody : "Mailing Error", msgError: true}});
        }
        else {
          res.status(200).json({message : {msgBody : "Recovery Email Sent", msgError : false}});
        }
      });
    }
  });
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
