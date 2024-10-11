const express = require('express');
const app = express();
const PORT = 8000;
const mongoose=require('mongoose');
const user=require('./models/user');


mongoose.connect("mongodb://127.0.0.1:27017/PMA").then(()=>{
    console.log("DB Connected");
})

app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})
