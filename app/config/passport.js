const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')
function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'email' },async (email,password,done) => {
        // Login Logic
        // check if email exists
        const user = await User.findOne({ email: email})
        if(!user){
            return done(null, false,{ message: 'No user with this email' })
        }

        bcrypt.compare(password,user.password).then(match =>{
            if(match){
                return done(null, user, { message: 'Logged In successfully' })
            }
            return done(null,false,{ message: 'Wrong Username or Password' })
        }).catch(err =>{
            return done(null,false,{ message: 'Something went wrong' })
        })

    }))
    // here we are stating what we need to store in session like here we are storing user id
    passport.serializeUser((user,done) =>{
        done(null,user._id)
    })
    // now here we are fetching the data that is stored in the session
    passport.deserializeUser((id,done) =>{
        User.findById(id,(err,user) =>{
            done(err,user)
        })
    })
}

module.exports = init