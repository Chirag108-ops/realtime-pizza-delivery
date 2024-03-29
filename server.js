// Creating express server

// to give access to env file our applications 
require('dotenv').config()
// importing express js in a variable express

const express = require('express')
// At this point funciton has been imported in express
// setting up session
const session = require('express-session')
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
const Emitter = require('events')
const flash = require('express-flash')
app.use(flash())
const MongoDbStore = require('connect-mongo')
// Data Base Connection
const passport = require('passport')
// "mongodb+srv://chiraggoyal4520:Chirag%4012@cluster0.wvabnp4.mongodb.net/pizza"
const connection = mongoose.connect("mongodb+srv://chiraggoyal4520:Chirag%4012@cluster0.wvabnp4.mongodb.net/pizza",
    err =>{
        if(err) throw err;
        console.log('Connected to Database')
    });


// Assets
app.use(express.static('public')) // express by default does not serve static files so this function is used 
// to serve static files like css, scripts, images etc...

// enabling sever to recieve json request
app.use(express.json())
app.use(express.urlencoded({extended: false})) // enabling sever to recieve url encoded data

// Event Emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)
// session configuration
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store: MongoDbStore.create({
        mongoUrl : "mongodb+srv://chiraggoyal4520:Chirag%4012@cluster0.wvabnp4.mongodb.net/pizza"
    }),  // this code helps in storing sessions in database
    saveUninitialized : false,
    cookie : {maxAge: 1000 * 60 * 60 * 24} // age of cookies in ms here it is equal to 24 hours
}))


// Passport Config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// by default the session's key is not available in frontend so we have to make it global using middleware
app.use((req,res,next) =>{
    res.locals.session = req.session
    res.locals.user = req.user
    next() // this is mandatory to use otherwise the req will not pass ahead
})

// set template engine
app.use(expressLayout) 
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app) // In javascript every function is passed by refrence
app.use((req,res) => {
    res.status(404).send('<h1>404, Page not found</h1>')
})

const server = app.listen(PORT, () => { 
// what basically listen does is that it prepares the specified 
// port to listen request and printing response written later in 
// the funciton in termial
    console.log(`Listening on port ${PORT}`) // backticks (`) is used to insert port as a variable
})
// now the server is created

// socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // join the client
    socket.on('join', (roomName) => {
        socket.join(roomName)
    })

})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced',data)
})
