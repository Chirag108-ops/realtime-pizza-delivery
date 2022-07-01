// If the file name is singular then in the database name of the file should be plural -- Always
// Here we will keep all the details related to database

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    // here we will define how the data from database will look in our site
    name : {type : String , required : true},
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true},
    role : {type : String, default: 'customer'}

},{timestamps: true})
// here second parameter is the type of schema we want to follow
module.exports = mongoose.model('User',userSchema) // here Menu is the name of the model which is a variable of course

