const mongoose = require('mongoose');

//creating of schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }

}, { timestamps: true })

//creating of a model
const User = new mongoose.model("user", LoginSchema) //first para is the our schema table and the next is our schema 
//exporting the model
module.exports = User