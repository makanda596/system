import mongoose from 'mongoose'
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

    moveInDate:
        { type: String },
    roomNumber: String,
    lastLogin: {
        type: Date,
        default: Date.now,
    }
    // const User = mongoose.model('User', new mongoose.Schema({
    //     name: { type: String, required: true },
    //     email: String,
    //     phone: String,
    //     roomNumber: String,
    //     password: String,
    //     moveOutDate: { type: Date },
    // }));


}, { timestamps: true })

//creating of a model
export const User = new mongoose.model("User", LoginSchema) //first para is the our schema table and the next is our schema
