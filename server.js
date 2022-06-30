// Creating express server

// to give access to env file our applications 
require('dotenv').config()
// importing express js in a variable express

const express = require('express')
// At this point funciton has been imported in express

// importing ejs
const ejs = require('ejs')

const path = require('path') // inbuilt module of node js

// importing express layout
const expressLayout = require('express-ejs-layouts')
const Noty = require('noty')
const app = express() // this will return the main object of express and stores in app variable

const PORT = process.env.PORT || 3300
// the above code is checking if there any prdefined suitable port
// available in the environment or not if available then select that
// other wise set it to 3000

const mongoose = require('mongoose')

// setting up session
const session = require('express-session')

const flash = require('express-flash')

const MongoDbStore = require('connect-mongo')
// Data Base Connection

const url = "mongodb://localhost/pizza";

mongoose.connect(url,
    err =>{
        if(err) throw err;
        console.log('Connected to Database')
    });

// Assets
app.use(express.static('public')) // express by default does not serve static files so this function is used 
// to serve static files like css, scripts, images etc...

// enabling sever to recieve json request
app.use(express.json())

// session configuration
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store: MongoDbStore.create({
        mongoUrl : url
    }),  // this code helps in storing sessions in database
    saveUninitialized : false,
    cookie : {maxAge: 1000 * 60 * 60 * 24} // age of cookies in ms here it is equal to 24 hours
}))

// by default the session's key is not available in frontend so we have to make it global using middleware
app.use((req,res,next) =>{
    res.locals.session = req.session
    next() // this is mandatory to use otherwise the req will not pass ahead
})

app.use(flash())

// set template engine
app.use(expressLayout) 
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app) // In javascript every function is passed by refrence

app.listen(PORT, () => { 
// what basically listen does is that it prepares the specified 
// port to listen request and printing response written later in 
// the funciton in termial
    console.log(`Listening on port ${PORT}`) // backticks (`) is used to insert port as a variable
})
// now the server is created

