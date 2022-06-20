const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product Name is required'],
        minlength: [3, 'Product Name must be at least 3 characters long'],
        maxlength: [100, 'Product Name must be less than 50 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Product Price is required'],
        min: [0, 'Product Price must be greater than 0']
    },
    description: {
        type: String,
        required: [true, 'Product Description is required'],
        minlength: [3, 'Product Description must be at least 3 characters long'],
        maxlength: [1000, 'Product Description must be less than 500 characters long']
    },
    image: {
        type: String,
        required: [true, 'Product Image is required'],
        default: 'https://via.placeholder.com/150'

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product Category is required']
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: [true, 'Product Brand is required']
    },
    colors:{
        type: [String]
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: [true, 'Product Inventory is required'],
        default: 10
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },

}, { timestamps: true });

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    // match:{rating:5}
})

ProductSchema.pre('remove', async function(next) {
    await this.model('Review').deleteMany({product: this._id});
    next();
})


module.exports = mongoose.model('Product', ProductSchema);