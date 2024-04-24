const mongoose = require('mongoose');

const slimeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    rareza: {
        type: String,
        required: true
    },
    habilidades: {
        type: String
    }
});

const Slime = mongoose.model('Slime', slimeSchema);

module.exports = Slime;
