const express = require('express');
const Router = express.Router();

const { getAllBrands, createBrand, getBrandById, updateBrand, deleteBrand } = require('../Controllers/BrandController');

Router.route('/').get(getAllBrands).post(createBrand);
Router.route('/:id').get(getBrandById).put(updateBrand).delete(deleteBrand);

module.exports = Router;