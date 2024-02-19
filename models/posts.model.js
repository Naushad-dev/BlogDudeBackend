const mongoose = require("mongoose");

const postSchema= new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Post title is required"]
    },
    description:{
        type:String,
        required:[true,"Post description is required"]
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }



},{timestamps:true})


const postModel= new mongoose.model("post",postSchema);

module.exports=postModel