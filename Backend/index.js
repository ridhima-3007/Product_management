const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const user=require('./models/user');
const UserRoute=require('./routes/user')

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user',UserRoute);


mongoose.connect("mongodb://127.0.0.1:27017/PMA").then(()=>{
    console.log("DB Connected");
})

app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})
