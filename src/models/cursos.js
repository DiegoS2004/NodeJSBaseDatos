const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    tema: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Referencia al modelo de Usuario
    },
    certificados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate' // Referencia al modelo de Certificado
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
