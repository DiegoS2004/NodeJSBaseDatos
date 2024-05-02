const express = require('express');
const Course = require('../models/cursos');

const router = express.Router();

// Ruta para crear un nuevo curso
router.post('/courses', async (req, res) => {
    const { tema, nombre, duracion, nivel } = req.body;

    try {
        // Crear un nuevo curso
        const newCourse = new Course({ tema, nombre, duracion, nivel });
        
        // Guardar el curso en la base de datos
        const savedCourse = await newCourse.save();

        res.status(201).json(savedCourse); // Enviar una respuesta con el curso creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los cursos
router.get('/courses', async (req, res) => {
    try {
        // Buscar todos los cursos en la base de datos
        const courses = await Course.find();
        res.json(courses); // Enviar una respuesta con los cursos encontrados
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
