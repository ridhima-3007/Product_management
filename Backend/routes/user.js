const express=require('express');
const router=express.Router();
const user=require('../models/user')
const {handleUserLogin} = require('../controllers/user')

router.post('/signup',async(req,res)=>{
    const { name, email, mobile, password } = req.body;

   await user.create({
    name,
    email,
    mobile,
    password
   })

   return res.json({msg:"user Created"});
})

router.post('/login', handleUserLogin);

module.exports=router;