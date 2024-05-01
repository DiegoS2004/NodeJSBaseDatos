// routes/certificates.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Certificate = require('../models/certificate');
const User = require('../models/users'); // Importa el modelo de usuario

// Configurar multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

// Endpoint para subir un certificado
router.post('/certificates', upload.single('evidence'), async (req, res) => {
    try {
        // Obtener el ID único del usuario autenticado (supongamos que se almacena en req.user.id)
        const userId = req.user.id;

        // Comprobar si el usuario existe en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear un nuevo documento de certificado asociado con el usuario
        const newCertificate = new Certificate({
            user: userId, // Utiliza el ID del usuario autenticado para asociar el certificado con el usuario
            course: req.body.courseId,
            fileUrl: req.file.path // Guarda la ruta del archivo subido
        });
        
        // Guardar el certificado en la base de datos
        const savedCertificate = await newCertificate.save();

        res.status(201).json(savedCertificate); // Enviar una respuesta con el certificado creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
