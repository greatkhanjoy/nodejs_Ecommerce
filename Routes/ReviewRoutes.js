const express = require('express');
const Router = express.Router();
const { getAllReviews, createReview, getReviewById, updateReview, deleteReview } = require('../Controllers/ReviewController');


Router.route('/').get(getAllReviews).post(createReview);
Router.route('/:id').get(getReviewById).put(updateReview).delete(deleteReview);


module.exports = Router;