const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const nodemailer=require('nodemailer')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const user=require('./models/user');
const products=require('./models/products');
const UserRoute=require('./routes/user')
const ProductRoute=require('./routes/product');
const jwt=require('jsonwebtoken');
var bcrypt = require('bcryptjs');

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user',UserRoute);
app.use('/api',ProductRoute);
mongoose.connect("mongodb://127.0.0.1:27017/PMA").then(()=>{
    console.log("DB Connected");
})
  
app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})
