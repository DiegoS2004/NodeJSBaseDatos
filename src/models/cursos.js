const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    nivel_dificultad: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
