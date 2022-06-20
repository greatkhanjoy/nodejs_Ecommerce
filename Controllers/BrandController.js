const Brand = require('../Models/Brand');


const getAllBrands = async (req, res) => {
    const brand = await Brand.find({})
    res.status(200).json({count:brand.length, brands:brand})
}

const createBrand = async (req, res) => {
    const brand = await new Brand(req.body);
    await brand.save()
    if(!brand){
        return res.status(400).json({message: 'brand not created'})
    }
    res.status(200).json({msg: 'Brand created successfully', brand})
}

const getBrandById = async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if(!brand){
        return res.status(400).json({message: 'Brand not found'})
    }
    res.status(200).json({brand})
}

const updateBrand = async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!brand){
        return res.status(400).json({message: 'Brand not found'})
    }
    res.status(200).json({msg: 'Brand updated successfully', brand})
}

const deleteBrand = async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if(!brand){
        return res.status(400).json({message: 'Brand not found'})
    }
    await brand.remove()
    res.status(200).json({msg: 'Brand deleted successfully'})
}


module.exports = { getAllBrands, createBrand, getBrandById, updateBrand, deleteBrand }