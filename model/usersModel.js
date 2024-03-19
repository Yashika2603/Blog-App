const mongoose=require("mongoose");
let userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        
    },
    isAdmin:{
        type:Boolean
    },
    token:{
        type:String
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})
module.exports=mongoose.model("User",userSchema);