// If the file name is singular then in the database name of the file should be plural -- Always
// Here we will keep all the details related to database

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    // here we will define how the data from database will look in our site
    customerId: {   // here we don't want to user Id as a string but we want to store the connection with the user as well
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: { type: Object, required:true },
    phone: {type: String, required: true},
    address: {type: String, required: true},
    paymentType: {type: String, default: 'COD'},
    status: {type: String, default: 'order_placed'},
},{timestamps: true})
// here second parameter is the type of schema we want to follow
module.exports = mongoose.model('Order',orderSchema) // here Menu is the name of the model which is a variable of course

