const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const userModel = require('../schema/schemaModel')
const bodyparser = require('body-parser')
const passport = require('passport')
const bcrypt = require('bcrypt');
const {flash} = require('connect-flash')

//Index Route
exports.index = (req, resp) => { resp.render('index', { user: req.user }) }

//Homepage Route
exports.homepage = (req, resp) => { resp.render('homepage', { user: req.user }) }

//Dashboard Route
exports.dashboard = (req, resp) => {
    userModel.course.find()
        .then(doc => {
            resp.render('dashboard', { doc: doc, user: req.user })
        })
        .catch(err => { resp.redirect('/user/login') })
}

//Create Course GET Route
exports.createcourse = (req, resp) => {
    resp.render('createcourse', { user: req.user })
}
//Create Course POST Route
exports.createcourse = (req, resp) => {
    const doc = []
    const { name, type, duration, language, file, Description } = req.body
    const addcourse = new userModel.course(
        {
            name,
            type,
            duration,
            language,
            file,
            Description
        })
    addcourse.save()
    resp.render('createcourse', { doc: doc, user: req.user });
}

//GET Route to Update Course
exports.updatecourse = (req, resp) => {
    userModel.course.findOne({ _id: req.params.id })
        .then(doc => { resp.render('createcourse', { doc: doc, user: req.user }) })
}
//Post Route to Update Course
exports.addupdatecourse = (req, resp) => {
    userModel.course.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() =>{
        req.flash(
            'success_msg',
            'Course Updated Successfully !!!'
          );
         resp.redirect('/dashboard')})
}
//Route to Delete Courses
exports.delete = (req, resp) => {
    userModel.course.findOneAndDelete({ _id: req.params.id })
        .then(() =>{
            req.flash(
                'success_msg',
                'Course Deleted Successfully !!!'
              );
         resp.redirect('/dashboard')})
}
//Logout Route
exports.logout = (req, resp) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    resp.redirect('/user/login')
}

exports.profile = (req, resp) => {
    resp.render('profile', { user: req.user })
}
exports.Changepass = (req, resp) => {
    const user = req.user
    const { password, npassword, cnpassword} = req.body
    const errors = [];
    
    //Confirm Old Password
    const valid = bcrypt.compareSync(password, user.password)
    if (!valid)
        errors.push({ msg: "old password does not matched" })
    if(npassword.length < 5 )
    errors.push({msg:"Password should be atleast 6 Char"})
    //check if password are same
    if (npassword !== cnpassword)
        errors.push({ msg: 'Enter the Match password' })
    if (errors.length > 0) {
        resp.render('profile', {
            errors,
           password,
           npassword,
           cnpassword,
            user: req.user
        })
    } else {
        userModel.signup.findOne({ _id: user._id })
            .then(doc => {
                //Hash the Password 
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(npassword, salt)
                doc.password = hash
                //save the Updated Profile 
                doc.save()
                req.logout();
                req.flash('success_msg','Password Changed Successfully...')
                resp.redirect('/user/login')
            })
    }
}
exports.Changeprofile = (req, resp) => {
    const user = req.user
    const { email, username } = req.body
    const errors = [];
    
    
    //check if password are same
    if (!email || !username)
        errors.push({ msg: 'Enter all required fields' })
    if (errors.length > 0) {
        resp.render('profile', {
            errors,
            username,
            email,
            user: req.user
        })
    } else {
        userModel.signup.findOne({ _id: user._id })
            .then(doc => {
               
                doc.username = username
                doc.email = email
                //save the Updated Profile 
                doc.save()
                req.logout();
                req.flash('success_msg','Profile Changed Successfully...')
                resp.redirect('/user/login')
            })

    }
}