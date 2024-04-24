const express = require('express');
const path = require('path');
const slimeSchema = require('../models/slimes'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Obtener todos los usuarios
router.get("/", (req, res) => {
    slimeSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Crear usuario
router.post("/", (req, res) => {
    const Slime = new slimeSchema(req.body);
    Slime
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

module.exports = router;