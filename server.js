// Creating express server

// importing express js in a variable express
const express = require('express')
// At this point funciton has been imported in express

// importing ejs
const ejs = require('ejs')

// -----ask from chandramani--------

const path = require('path')

// -----ask from chandramani--------
// importing express layout
const expressLayout = require('express-ejs-layouts')

const app = express() // this will return the main object of express and stores in app variable

const PORT = process.env.PORT || 3300
// the above code is checking if there any prdefined suitable port
// available in the environment or not if available then select that
// other wise set it to 3000

// -----ask from chandramani--------
app.get('/',(req,res)=>{
    res.render('home')
})
// -----ask from chandramani--------
// -----ask from chandramani--------
// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
// -----ask from chandramani--------

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // backticks (`) is used to insert port as a variable
})
// now the server is created

