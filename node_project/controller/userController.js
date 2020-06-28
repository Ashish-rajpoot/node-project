const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const userModel = require('../schema/schemaModel')
const passport = require('passport')
const bcrypt = require('bcrypt')
const flash = require('connect-flash');
const { json } = require('body-parser');



//Signup Route
exports.signup = (req, resp) => {
    resp.render('signup', { user: req.user })
}
//Handle Sinup Route
exports.addsignup = (req, resp) => {
    const { username, email, password, cpassword, catogery } = req.body
    let errors = [];
    //
    //Check if any field is empty
    if (!username || !email || !password || !cpassword || !catogery) {
        errors.push({ msg: "required field is empty" })
    }
    //Check if Both the password is same
    if (password !== cpassword) {
        errors.push({ msg: "Password Does not Match" })
    }
    //Check if Password length is valid 
    if (password.length < 5) {
        errors.push({ msg: "Password should be atleast 5 charterstics" })
    }
    if (errors.length > 0) {
        resp.render('signup', {
            errors,
            username,
            password,
            cpassword,
            catogery,
            user: req.user
        })
    } else {
        //validation passed
        userModel.signup.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user Exists
                    errors.push({ msg: 'user Exists' })
                    resp.render('signup', {
                        errors,
                        username,
                        password,
                        cpassword,
                        catogery,
                        user: req.user
                    })
                } else {
                    var newuser = new userModel.signup({
                        username,
                        email,
                        catogery,
                        password
                    })
                    //hash password
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt)
                    newuser.password = hash
                    //Save User
                    newuser.save()
                        .then(() => {
                            req.flash(
                                'success_msg',
                                'You were registered Successfully!!!'
                              );
                            resp.redirect('/user/login')
                        })
                }
            })
    }
}
//Login Route
exports.login = (req, resp, next) => {
    req.flash('loginError','error')
    resp.render('login', { user: req.user})
}
exports.addlogin = (req, resp, next) => {
    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/user/login",
        failureFlash:true
    })(req, resp, next)
}




