const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Review Title is required'],
        minlength: [3, 'Review Title must be at least 3 characters long'],
        maxlength: [100, 'Review Title must be less than 50 characters long']
    },
    rating: {
        type: Number,
        required: [true, 'Review Rating is required'],
        min: [0, 'Review Rating must be greater than 0'],
        max: [5, 'Review Rating must be less than 5']
    },
    comment: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },

}, {timestamps: true});

ReviewSchema.index({product: 1, user: 1}, {unique: true})


ReviewSchema.statics.calculateAverageRating = async function(productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        { $group: { 
            _id: null, 
            averageRating: { $avg: '$rating' },
            numberOfReviews: { $sum: 1 }
         } }
    ])
    try {
        await this.model('Product').findOneAndUpdate(
            { _id: productId },
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numberOfReviews: result[0]?.numberOfReviews || 0
            }
        )
    } catch (error) {
        
    }
}

ReviewSchema.post('save', async function(next) {
    await this.constructor.calculateAverageRating(this.product)

})

ReviewSchema.post('remove', async function(next) {
    await this.constructor.calculateAverageRating(this.product)

})


module.exports = mongoose.model('Review', ReviewSchema);