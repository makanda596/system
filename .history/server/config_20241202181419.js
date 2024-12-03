// //creating the our schema 
// import mongoose from 'mongoose'

// const UserSchema = mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         validate: {
//             validator: function (v) {
//                 return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
//             },
//         }
//     },
//     roomNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true
//     }

// }, { timestamps: true })

// const User = mongoose.model("User", UserSchema)
// module.default = User;

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