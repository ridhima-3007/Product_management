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

const JWT_SECRET = '$rrr%';  



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



app.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;


    try {
      const user1 = await user.findOne({ email });
      if (!user1) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const resetToken = jwt.sign({ id: user1._id }, JWT_SECRET, { expiresIn: '1h' });

  
      user1.resetPasswordToken = resetToken;
      await user1.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'a32584663@gmail.com',  
          pass: 'nhgm oewb whjg buzm',   
        },
      });
  
      const mailOptions = {
        to: user1.email,
        from: 'a32584663@gmail.com',
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="http://localhost:4200/resetPassword?token=${resetToken}">here</a> to reset your password.</p>`,
      };
  
      await transporter.sendMail(mailOptions);
      res.send({ message: 'Password reset email sent' });
  
    } catch (err) {
      res.status(500).send({ message: 'Error sending reset email' });
    }
  });
  
  //resetting the password
  app.post('/resetPassword', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user1 = await user.findById(decoded.id);
      if (!user1) {
        return res.status(404).send({ message: 'User not found' });
      }

      user1.password = newPassword;
      user1.resetPasswordToken = undefined; 
      await user1.save();
  
      res.send({ message: 'Password reset successful' });
  
    } catch (err) {
      res.status(500).send({ message: 'Invalid or expired token' });
    }
  });
  
 
app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`);
})
