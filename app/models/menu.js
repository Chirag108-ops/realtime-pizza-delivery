// If the file name is singular then in the database name of the file should be plural -- Always
// Here we will keep all the details related to database

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    // here we will define how the data from database will look in our site
    name : {type : String , required : true},
    image : {type : String , required : true},
    price : {type : Number , required : true},
    size : {type : String , required : true}

})
// here second parameter is the type of schema we want to follow
module.exports = mongoose.model('Menu',menuSchema) // here Menu is the name of the model which is a variable of course

