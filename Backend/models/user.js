const mongoose=require('mongoose');
var bcrypt = require('bcryptjs');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:"active"
    }
})

userSchema.pre("save",async function(next){
    const user=this;

    if(!user.isModified("password")){
        next();
    }

    try{
   const saltRound=await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(user.password,saltRound);
   user.password=hashPassword;
    }catch(err){
        next(error)
    }
})

const user = new mongoose.model("user",userSchema);

module.exports = user;