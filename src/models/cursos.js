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
    }

});
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
