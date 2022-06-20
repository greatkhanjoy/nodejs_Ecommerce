const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [50, 'Name must be less than 50 characters'],
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [50, 'Email must be less than 50 characters'],
        minlength: [3, 'Email must be at least 2 characters'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    verficationToken: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry: {
        type: Date
    },

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', UserSchema);
