const express = require('express');
const Router = express.Router();
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/CategoryController');


Router.route('/').get(getAllCategories).post(createCategory);
Router.route('/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = Router;