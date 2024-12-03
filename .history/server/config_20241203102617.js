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
    phoneNumber: {
        type: String,
        required: true
    },
    // const User = mongoose.model('User', new mongoose.Schema({
    //     name: { type: String, required: true },
    //     email: String,
    //     phone: String,
    //     roomNumber: String,
    //     password: String,
    //     moveInDate: { type: Date },
    //     moveOutDate: { type: Date },
    // }));


}, { timestamps: true })

//creating of a model
const User = new mongoose.model("user", LoginSchema) //first para is the our schema table and the next is our schema
//exporting the model
module.exports = User