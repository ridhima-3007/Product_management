const user = require('../models/user')
const bcrypt = require('bcryptjs')
const {setUser} = require('../service/auth')

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const curUser = await user.findOne({email});
    if(!curUser) {
        return res.json({msg: "invalid email"});
    }

    const result = await bcrypt.compare(password, curUser.password)

    if(!result) {
        return res.json({msg: "invalid password"});
    }

    const token = setUser(curUser);
    return res.json({token});
}

module.exports = {
    handleUserLogin
}