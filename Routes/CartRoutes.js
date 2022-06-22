const express = require('express')
const Router = express.Router()
//Authentication Middleware
const {
  authorizeUser,
  isAdmin,
  authorizedPermissions,
} = require('../Middlewares/Authentication')

const {
  getAllCarts,
  addToCart,
  cart,
} = require('../Controllers/CartController')

Router.route('/').get(authorizeUser, cart).post(authorizeUser, addToCart)

module.exports = Router
