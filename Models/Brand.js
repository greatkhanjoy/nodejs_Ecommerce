const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BrandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Brand Name is required'],
        minlength: [3, 'Brand Name must be at least 3 characters long'],
        maxlength: [50, 'Brand Name must be less than 50 characters long']
    },
    description: {
        type: String

    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    }

}, {timestamps: true});

BrandSchema.post('remove', async function(){
    await this.model('Product').updateMany({brand: this._id}, {brand: null});
})

module.exports = mongoose.model('Brand', BrandSchema);