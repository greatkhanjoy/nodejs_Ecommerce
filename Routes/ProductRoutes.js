const express = require('express')
const Router = express.Router()
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../Controllers/ProductController')

Router.route('/').get(getAllProducts).post(createProduct)
Router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct)


module.exports = Router