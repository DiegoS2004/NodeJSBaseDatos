const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Slime = require('../models/slimes'); // Asegúrate de que la ruta sea correcta

const router = express.Router();
const upload = multer({ dest: 'uploads/' });



router.get('/',  (req, res) => {
    console.log('GET /api/slimes');

});



router.post('/slimes', upload.single('imagen'), async (req, res) => {
    try {
        const newSlime = new Slime({
            nombre: req.body.nombre,
            rareza: req.body.rareza,
            imagen: {
                data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });

        const savedSlime = await newSlime.save();
        res.status(200).json(savedSlime);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;