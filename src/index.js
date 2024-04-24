const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1500;

// Middleware
app.use(cors());
app.use(express.json()); // Configura el middleware express.json() para analizar el cuerpo de la solicitud como JSON

// Rutas
app.use('/api', usersRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => console.error(error));

// Iniciar el servidor
app.listen(port, () => console.log('Servidor corriendo en el puerto', port));
