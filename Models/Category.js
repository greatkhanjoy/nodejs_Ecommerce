const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category Name is required'],
        minlength: [3, 'Category Name must be at least 3 characters long'],
        maxlength: [50, 'Category Name must be less than 50 characters long']
    },
    description: {
        type: String

    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }

}, {timestamps: true});

CategorySchema.virtual('reviews', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

CategorySchema.pre('remove', async function(next){
    await this.model('Product').updateMany({category: this._id}, {category: null});
    next()
})

module.exports = mongoose.model('Category', CategorySchema);