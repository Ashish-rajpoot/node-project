const passport = require('passport')
const LocalStrategy = require('passport-local')
const user = require('../schema/schemaModel').signup
const bcrypt = require('bcrypt')
const flash = require('connect-flash');
const { Passport } = require('passport');
module.exports = function (passport){
    passport.use(new LocalStrategy(
        {
            usernameField:'email',
            // passReqToCallback : true 
        },
        (email,password,done)=>{
            user.findOne({email:email})
            .then(user=>{
              
                //check email
                if(!user){                    
                return done(null,false,{message:'That email is not Register'})}
                //check password
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done( null,user)
                    }else{
                        return done(null,false,{message:'Password Incorrect'})
                    }
                })
            })
             
        }
    ))
    passport.serializeUser((user,done)=>{
        return done(null,user)
    });
    passport.deserializeUser((user,done)=>{
        return done(null,user)
    })
    
}