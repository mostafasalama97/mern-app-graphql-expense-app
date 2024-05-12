/*
1. user.model.js
This file will define the schema for user data and might include methods related to user-specific operations.
*/

import mongoose, { Mongoose } from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    name: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    profilePicture: {
        type:String,
        default:"",
    },
    gender : {
        type: String,
        enum: ["male", "female"]
    }
}, { timestamps:true,})


const USER = Mongoose.model("User", userSchema);
export default user