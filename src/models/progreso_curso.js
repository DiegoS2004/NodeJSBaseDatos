const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    tiempo_dedicado: {
        type: Number
    },
    lecciones_completadas: {
        type: Number
    },
    puntuacion_obtenida: {
        type: Number
    }
});

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

module.exports = CourseProgress;
