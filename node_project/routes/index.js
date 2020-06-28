const express = require('express');
const indexController = require('../controller/indexController')
var router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../Oauth/passport');

//GET Routes
router.get('/',forwardAuthenticated,indexController.index)
router.get('/homepage',forwardAuthenticated, indexController.homepage)
router.get('/dashboard',ensureAuthenticated, indexController.dashboard)
router.get('/createcourse',ensureAuthenticated,indexController.createcourse)
router.get('/updatecourse/:id',ensureAuthenticated,indexController.updatecourse)
router.get('/delete/:id',ensureAuthenticated,indexController.delete)
router.get('/profile/:id',ensureAuthenticated,indexController.profile)
router.get('/logout',ensureAuthenticated,indexController.logout)

//Post Routes
router.post('/createcourse',ensureAuthenticated,indexController.createcourse)
router.post('/updatecourse/:id',ensureAuthenticated,indexController.addupdatecourse)
router.post('/profile/:id',ensureAuthenticated,indexController.Changepass)
router.post('/changeprofile',ensureAuthenticated,indexController.Changeprofile)


module.exports= router;