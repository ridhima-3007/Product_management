const user = require('../models/user')
const bcrypt = require('bcryptjs')
const {generateAccessToken, generateRefreshToken, getUser} = require('../service/auth')

async function handleUserSignUp(req, res) {
    const { name, email, mobile, password } = req.body;

    await user.create({
        name,
        email,
        mobile,
        password
    })

    return res.json({msg:"user Created"});
}

async function handleUserLogin(req, res, next) {
    try {
        const {email, password} = req.body;
        let curUser = await user.findOne({email});
        if(!curUser) {
            return res.status(400).json({msg: "Invalid Email"});
        }

        const result = await bcrypt.compare(password, curUser.password)


        if(!result) {
            return res.status(400).json({msg: "Invalid Password"});
        }

        const accessToken = generateAccessToken(curUser);
        const refreshToken = generateRefreshToken(curUser);
        curUser.refreshToken = refreshToken;
        curUser.save();

        const options = {
            httpOnly: true,
            secure: true,
        }

        res
        .cookie('accessToken', accessToken, SameSite='None', options)
        .cookie('refreshToken', refreshToken, SameSite='None', options);
        return res.json({accessToken, refreshToken});
    }
    catch(error) {
        next(error);
    }
}

async function handleUserLogout(req, res, next) {
    try {
        console.log(typeof(req.user._id));
        const newUser = await user.findByIdAndUpdate(
            req.user._id,
            {
                $set: { refreshToken: "" } 
            },
            { new: true } 
        );
        
        console.log(newUser);
        res.clearCookie('accessToken', SameSite='None');
        res.clearCookie('refreshToken', SameSite='None');
        return res.json({msg : "logout successful"});
    }
    catch(error) {
        next(error);
    }
}

async function refreshAccessToken(req, res) {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if(!incomingRefreshToken) {
        return res.status(400).json({msg: "unauthorized request"});
    }

    const userId = getUser(incomingRefreshToken)._id;
    const curUser = await user.findById(userId);

    if(!curUser) {
        return res.status(400).json({msg: "invalid refresh token"});
    }

    if(curUser.refreshToken !== incomingRefreshToken) {
        console.log(curUser);
        console.log(curUser.refreshToken);
        console.log(incomingRefreshToken);
        return res.status(400).json({msg: "refresh token is expired"});
    }

    const accessToken = generateAccessToken(curUser);
    const refreshToken = generateRefreshToken(curUser);
    curUser.refreshToken = refreshToken;
    curUser.save();

    const options = {
        httpOnly: true,
        secure: true,
    }

    res
    .cookie('accessToken', accessToken, SameSite='None', options)
    .cookie('refreshToken', refreshToken, SameSite='None', options);
    return res.json({accessToken, refreshToken});
}

module.exports = {
    handleUserSignUp,
    handleUserLogin, 
    handleUserLogout,
    refreshAccessToken,
}