const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
function initRoutes(app){
    // app.get('/',(req,res)=>{        // here we are responding to request send with / link 
    //     res.render('home')
    // }) // this was used when we have to write functions here only but now we are sending the req and res
    // to other file so we need to send the parameters of res and req to that function so for that we will call
    // its function in this case that file is homecontroller

    app.get('/',homeController().index) // this is the new way of writing
     // handling request going to login page
    app.get('/login',authController().login)
    app.get('/register',authController().register)

    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
}

module.exports = initRoutes