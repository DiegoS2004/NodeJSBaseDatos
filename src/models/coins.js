const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia a la colección de usuarios
        required: true
    },
    amount: {
        type: Number,
        default: 0 // Por defecto, el usuario no tiene monedas
    }
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
