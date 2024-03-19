const mongoose=require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content:  {
        type:String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    status: {
        type:String,
        enum:["Approved","Reject","Pending"],
        default:"Pending"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

  
module.exports=mongoose.model('Blog', blogSchema);