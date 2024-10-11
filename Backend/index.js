const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8000;
const mongoose=require('mongoose');
const user=require('./models/user');
const UserRoute=require('./routes/user')


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user',UserRoute);


mongoose.connect("mongodb://127.0.0.1:27017/PMA").then(()=>{
    console.log("DB Connected");
})

app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})
