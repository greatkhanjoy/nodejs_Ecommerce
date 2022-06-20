const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const {CreateJWT, attachCookies, createTokenUser, sendEmail} = require('../Utills')
const crypto = require('crypto');


const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const verficationToken = crypto.randomBytes(40).toString('hex');
    
    const user = new User({name, email, password, verficationToken});
    await user.save();
    const subject = 'Verify your email';
    const text = `Please verify your email by clicking on the link below: <a href="${process.env.APP_URL}/api/v1/auth/verify-email?token=${user.verficationToken}&email=${user.email}" >Verify</a>`;
    sendEmail(user.email, subject, text);
    res.status(201).json({message: 'Registered successfully, Please verify your email.'});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'Email and Password are required'});
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).json({message: 'Invalid credentials'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'});
    }
    if(!user.verified) {
        return res.status(400).json({message: 'Please verify your email first'});
    }

    const tokenUser = createTokenUser(user);
    const token = CreateJWT(tokenUser);
    attachCookies(res, token);
    res.status(200).json({message: 'Logged in successfully'});

}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully'});
}

const verifyEmail = async (req, res) => {
    const {token, email} = req.query;
    if(!token || !email) {
        return res.status(400).json('Invalid link or token. try to reset password.');
    }
    const user = await User.findOne({email}).select('-password');
    if(!user) {
        return res.status(404).json('Invalid link or token. Try to register again.');
    }
    if(user.verified) {
        return res.status(400).json('Your email is already verified.');
    }
    if(user.verficationToken.toString !== token.toString) {
        return res.status(400).json('Invalid link or token expired. Try to reset password.');
    }
    const updatedUser = await User.findOneAndUpdate({email}, {verified: true, verificationToken: null}, {new: true, runValidators: true});
    res.status(200).send('Email verified successfully.');
}

const requestResetPassword = async (req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.status(400).json({message: 'Email is required'});
    }

    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const verficationToken = crypto.randomBytes(40).toString('hex');
    const updatedUser = await User.findOneAndUpdate({email}, {verficationToken}, {new: true, runValidators: true});
    const subject = 'Reset your password';
    const text = `Please reset your password by clicking on the link below: <a href="${process.env.APP_URL}/api/v1/auth/reset-password?token=${updatedUser.verficationToken}&email=${updatedUser.email}" >Reset</a>`;
    sendEmail(user.email, subject, text);
}

const resetPassword = async (req, res) => {
    const {token, email} = req.query;
    if(!token || !email) {
        return res.status(400).json({message: 'Invalid link. Try to reset password.'});
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).json({message: 'Invalid link'});
    }
    if(!user.verficationToken) {
        return res.status(400).json({message: 'Link expired!'});
    }

    if(user.verficationToken.toString !== token.toString) {
        return res.status(400).json({message: 'Invalid link. Try to reset password.'});
    }
    const {password} = req.body;
    if(!password) {
        return res.status(400).json({message: 'Password is required'});
    }
    user.password = password;
    user.verficationToken = null;
    await user.save();
}

module.exports = {registerUser, login, logout, verifyEmail, resetPassword, requestResetPassword};
