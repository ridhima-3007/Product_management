const user = require('../models/user')
const bcrypt = require('bcryptjs')
const {setUser} = require('../service/auth')

async function handleUserLogin(req, res, next) {
    try {
        const {email, password} = req.body;
        const curUser = await user.findOne({email});
        if(!curUser) {
            res.status(400).json({msg: "Invalid Email"});
        }

        const result = await bcrypt.compare(password, curUser.password)

        if(!result) {
            res.status(400).json({msg: "Invalid Password"});
        }

        const token = setUser(curUser);
        res.cookie("authToken", token, SameSite='None');
        return res.json({token});
    }
    catch(error) {
        next(error);
    }
}

module.exports = {
    handleUserLogin
}