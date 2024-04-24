const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    rol: {
        type: String,
        enum: ['admin', 'estudiante'],
        default: 'estudiante' // Por defecto, se asigna el rol de estudiante
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
