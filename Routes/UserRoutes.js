const express = require('express');
const Router = express.Router();
//User Controller 
const {getAllUser, createUser, getSingleUser, updateUser, updateUserPassword, deleteUser} = require('../Controllers/UserController');

//Authentication Middleware
const {authorizeUser, isAdmin, authorizedPermissions} = require('../Middlewares/Authentication');


Router.route('/').get(authorizeUser, isAdmin,  getAllUser).post(authorizeUser, isAdmin, createUser);
Router.route('/:id').get(authorizeUser, getSingleUser).put(authorizeUser, updateUser).delete(authorizeUser, deleteUser);
Router.route('/password/:id').put(authorizeUser, updateUserPassword); // update user password


module.exports = Router;