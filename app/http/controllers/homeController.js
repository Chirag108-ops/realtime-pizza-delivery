// all the logics of every request will come here in this file

//fetching database
const Menu = require('../../models/menu')

function homeController(){
    return {
        async index(req,res){
            // this is the one way of doing it without using await and async
            // Menu.find().then(function(pizzas){ // to fetch all the objects of the database find() func is used
            //     console.log(pizzas)
            //     res.render('home',{pizzas : pizzas})
            // })

            // the cleaner way to do so using await and to apply await the function must be async first
            const pizzas = await Menu.find();
            //console.log(pizzas)
            return res.render('home',{pizzas : pizzas})
        }
    }
}
module.exports = homeController