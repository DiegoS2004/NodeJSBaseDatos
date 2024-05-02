const express = require('express');
const User = require('../models/users');
const Coin = require('../models/coins');

const router = express.Router();

// Middleware para asignar monedas a un nuevo usuario
router.use('/users', async (req, res, next) => {
    try {
        // Verificar si el usuario ya tiene un registro de monedas
        const existingCoin = await Coin.findOne({ user: req.body._id });

        // Si no existe un registro de monedas para el usuario, crear uno con 0 monedas
        if (!existingCoin) {
            const newCoin = new Coin({ user: req.body._id, amount: 0 });
            await newCoin.save();
        }

        // Continuar con la siguiente middleware o ruta
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para crear monedas para un usuario
router.post('/coins', async (req, res) => {
    const { userId } = req.body;

    try {
        // Crear un nuevo documento de monedas para el usuario
        const newCoin = new Coin({ user: userId });
        
        // Guardar el documento en la base de datos
        const savedCoin = await newCoin.save();

        res.status(201).json(savedCoin); // Enviar una respuesta con el documento de monedas creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener el saldo de monedas de un usuario
router.get('/coins/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Buscar el documento de monedas del usuario por su ID de usuario
        const coin = await Coin.findOne({ user: userId });

        if (!coin) {
            return res.status(404).json({ message: 'No se encontraron monedas para el usuario' });
        }

        res.json(coin); // Enviar una respuesta con el documento de monedas encontrado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para actualizar el saldo de monedas de un usuario
router.put('/coins/:userId', async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
        // Actualizar el saldo de monedas del usuario
        await Coin.updateOne({ user: userId }, { $set: { amount } });

        res.json({ message: 'Saldo de monedas actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
