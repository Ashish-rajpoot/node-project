const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { url } = require('inspector');
const { urlencoded } = require('body-parser');
const { pathToFileURL } = require('url');
const { stringify } = require('querystring');
const binary = mongodb.Binary


// var bcrypt = require('bcrypt'),
//     SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var signupSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    catogery: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
var courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

var signup = mongoose.model('signups', signupSchema);
var course = mongoose.model('courses', courseSchema);


module.exports = {
    signup: signup,
    course: course
}