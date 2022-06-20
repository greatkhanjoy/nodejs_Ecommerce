const Review = require('../Models/Review');


const getAllReviews = async (req, res) => {
    const review = await Review.find({})
    .populate({path: 'product', select: 'name'})
    .populate({path: 'user', select: 'name email'})

    res.status(200).json({count:review.length, reviews:review})
}

const createReview = async (req, res) => {
    const review = await new Review(req.body);
    await review.save()
    if(!review){
        return res.status(400).json({message: 'Review not created'})
    }
    res.status(200).json({msg: 'Review created successfully', review})
}

const getReviewById = async (req, res) => {
    const review = await Review.findById(req.params.id)
    if(!review){
        return res.status(400).json({message: 'Review not found'})
    }
    res.status(200).json({review})
}

const updateReview = async (req, res) => {
    const {rating, title, comment} = req.body;
    const review = await Review.findById(req.params.id)
    if(!review){
        return res.status(400).json({message: 'Review not found'})
    }
    if(rating < 1 || rating > 5){
        return res.status(400).json({message: 'Rating must be between 0 and 5'})
    }
    review.title = req.body.title || review.title
    review.comment = req.body.comment || review.comment
    review.rating = req.body.rating || review.rating
    await review.save()

    res.status(200).json({msg: 'Review updated successfully', review})
}

const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id)
    if(!review){
        return res.status(400).json({message: 'Review not found'})
    }
    await review.remove()
    res.status(200).json({msg: 'Review deleted successfully'})
}

module.exports = { getAllReviews, createReview, getReviewById, updateReview, deleteReview }