const mongoose = require('mongoose');
const router = require('../routes/userRoute');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        defaul: Date.now
    }
});



module.exports = mongoose.model('User', userSchema)