import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   points:{
    type:Number,
    default:0
   }

}, { timestamps: true })

export const User = mongoose.model("User", userSchema)