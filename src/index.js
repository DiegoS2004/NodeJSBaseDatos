const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require("./routes/users");
const slimesRouter = require('./routes/slimes');
const User = require('./models/users');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1500;

// Middleware
app.use(cors());
app.use(express.json()); 
// Rutas
app.use('/api', usersRoutes);
app.use('/api/slimes', slimesRouter);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Validar los datos del formulario
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password });

    // Guardar el usuario en la base de datos
    newUser.save()
        .then(user => {
            res.status(201).json(user); // Enviar una respuesta con el usuario creado
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        });
});

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.error(error));

// Iniciar el servidor
app.listen(port, () => console.log('Servidor corriendo en el puerto', port));
