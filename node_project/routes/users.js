const express = require('express');
const userController = require('../controller/userController');
const indexController= require('../controller/indexController');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../Oauth/passport');
var router = express.Router();


router.get('/signup',forwardAuthenticated,userController.signup);
router.post('/signup',userController.addsignup);
router.get('/login', forwardAuthenticated,userController.login);
router.post('/login', userController.addlogin);
   

module.exports = router;