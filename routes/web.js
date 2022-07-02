const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')

// Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app){
    // app.get('/',(req,res)=>{        // here we are responding to request send with / link 
    //     res.render('home')
    // }) // this was used when we have to write functions here only but now we are sending the req and res
    // to other file so we need to send the parameters of res and req to that function so for that we will call
    // its function in this case that file is homecontroller

    app.get('/',homeController().index) // this is the new way of writing
     // handling request going to login page
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)

    // customer routes
    app.post('/orders',auth,orderController().store)
    app.get('/customer/orders',auth,orderController().index)

    // Admin routes
    app.get('/admin/orders',admin,AdminOrderController().index)
}

module.exports = initRoutes