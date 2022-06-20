const Category = require('../Models/Category');


const getAllCategories = async (req, res) => {
    const category = await Category.find({})
    res.status(200).json({count:category.length, categories:category})
    // res.status(200).json('category')
}

const createCategory = async (req, res) => {
    const category = new Category(req.body);
    await category.save()
    res.status(200).json({msg: 'Category created successfully', category})
}

const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({message: 'Category not found'})
    }
    res.status(200).json({category})
}

const updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!category){
        return res.status(400).json({message: 'Category not found'})
    }
    res.status(200).json({msg: 'Category updated successfully', category})
}

const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({message: 'Category not found'})
    }
    await category.remove()
    res.status(200).json({msg: 'Category deleted successfully'})
}


module.exports = { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory }