const express=require('express');
const router=express.Router();
const {handleUserLogin, handleUserLogout, handleUserSignUp, refreshAccessToken} = require('../controllers/user');
const { checkAuth } = require('../middlewares/auth');

router.post('/signup', handleUserSignUp)

router.post('/login', handleUserLogin);

router.post('/logout', checkAuth, handleUserLogout);

router.post('/refresh-token', refreshAccessToken);

module.exports=router;