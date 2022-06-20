const User = require('../Models/User')
const bcrypt = require('bcryptjs')

const getAllUser = async (req, res) => {
    const user = await User.find().select('-password -verficationToken')
    res.status(200).json({cout: user.length, items: user})
}

const createUser = async (req, res) => {
    const user = new User(req.body)
    await user.save()

    const userData = {id: user._id, name: user.name, email: user.email, role: user.role, verified: user.verified}

    res.status(201).json({message: 'User created', userData})
}

const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -verficationToken')
    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json(user)
}

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).select('-password -verficationToken')

    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({message: 'User updated', user})
}

const updateUserPassword = async (req, res) => {
    const {password, newPassword} = req.body
    if(!password || !newPassword) {
        return res.status(400).json({message: 'Old and New Password are required'})
    }

    const user = await User.findById(req.params.id)
    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.status(400).json({message: 'Old Password is incorrect'})
    }

    user.password = req.body.newPassword
    await user.save()
    res.status(200).json({message: 'Password updated'})


}

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }
    await user.remove()
    res.status(200).json({message: 'User deleted'})
}


module.exports = {getAllUser, createUser, getSingleUser, updateUser, updateUserPassword, deleteUser}