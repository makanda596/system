//creating the our schema 
import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: {
    //         validator: function (v) {
    //             return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
    //         },
    //     }
    // },
    // roomNumber: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // phoneNumber: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true
    // }

}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
module.default = User;
