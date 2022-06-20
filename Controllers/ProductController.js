const Product = require('../Models/Product');


const getAllProducts = async (req, res) => {
    const product = await Product.find({})
    .populate({path: 'category', select: 'name'})
    .populate({path: 'brand', select: 'name'})
    .populate({path: 'reviews'})
    res.status(200).json({count:product.length, products:product})
}

const createProduct = async (req, res) => {
    const product = await new Product(req.body);
    await product.save()
    if(!product){
        return res.status(400).json({message: 'product not created'})
    }
    res.status(200).json({msg: 'Product created successfully', product})
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    .populate({path: 'category', select: 'name'})
    .populate({path: 'brand', select: 'name'})
    if(!product){
        return res.status(400).json({message: 'Product not found'})
    }
    res.status(200).json({product})
}

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!product){
        return res.status(400).json({message: 'Product not found'})
    }
    res.status(200).json({msg: 'Product updated successfully', product})
}

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({message: 'Product not found'})
    }
    await product.remove()
    res.status(200).json({msg: 'Product deleted successfully'})
}

module.exports = { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct }