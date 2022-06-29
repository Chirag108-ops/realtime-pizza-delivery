// Creating express server

// importing express js in a variable express
const express = require('express')
// At this point funciton has been imported in express

// importing ejs
const ejs = require('ejs')

const path = require('path') // inbuilt module of node js

// importing express layout
const expressLayout = require('express-ejs-layouts')

const app = express() // this will return the main object of express and stores in app variable

const PORT = process.env.PORT || 3300
// the above code is checking if there any prdefined suitable port
// available in the environment or not if available then select that
// other wise set it to 3000

// Assets
app.use(express.static('public')) // express by default does not serve static files so this function is used 
// to serve static files like css, scripts, images etc...

app.get('/',(req,res)=>{ // here we are responding to request send with / link 
    res.render('home')
})
// set template engine
app.use(expressLayout) 
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.listen(PORT, () => { 
// what basically listen does is that it prepares the specified 
// port to listen request and printing response written later in 
// the funciton in termial
    console.log(`Listening on port ${PORT}`) // backticks (`) is used to insert port as a variable
})
// now the server is created

