const mongoose = require('mongoose');

const slimeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    rareza: {
        type: String,
        enum: ['comun', 'raro', 'epico', 'legendario'], 
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    }
});

const Slime = mongoose.model('Slime', slimeSchema);

module.exports = Slime;
