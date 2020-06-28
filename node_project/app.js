const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieparser = require('cookie-parser')
const userRoute = require('./routes/users')
const indexRoute = require('./routes/index')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const flash =  require('connect-flash')
var app = express();


// paste your mongoDB url
const url ='mongodb+srv://<user>:<password>@cluster0-3abiu.mongodb.net/<dbname>?retryWrites=true&w=majority';
// set mongoose conntction
mongoose.connect(url, 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
 }, (err) => {
    if (err)
        console.log(err)
    else {
        console.log('connection Started with mongoDB')
    }
})

 //  middleware
app.use(cors())
app.use(express.static(path.join(__dirname)))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(cookieparser())
app.set('view engine', 'ejs')
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
   
}));
app.use(flash());
// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
//passport import for validation
app.use(passport.initialize());
app.use(passport.session());
//Require passport
require('./Oauth/authpass')(passport)

 //Using Routes
app.use('/', indexRoute)
app.use('/user', userRoute)




app.listen(9001, console.log('http://localhost:9001'))