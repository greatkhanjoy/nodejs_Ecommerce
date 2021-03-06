const express = require('express');
const Router = express.Router();
//Auth Controller
const {registerUser, login, logout, verifyEmail, resetPassword, forgotPassword, setPassword} = require('../Controllers/AuthController');
//Authentication Middleware
const {authorizeUser} = require('../Middlewares/Authentication');

Router.route('/register').post(registerUser);
Router.route('/login').post(login);
Router.route('/logout').get(authorizeUser, logout);
Router.route('/verify-email').get(verifyEmail);
Router.route('/reset-password').post(setPassword).get(resetPassword);
Router.route('/forgot-password').post(forgotPassword)

module.exports = Router;