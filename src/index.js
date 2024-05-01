const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require("./routes/users");
const slimesRouter = require('./routes/slimes');
const User = require('./models/users');
const { MongoClient } = require('mongodb'); // Importa MongoClient de mongodb
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

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado a la base de datos MongoDB");

        // Configura el change stream después de conectarse a la base de datos
        setupDatabaseWatcher();
    })
    .catch((error) => console.error("Error al conectar a la base de datos MongoDB:", error));

// Función para configurar el change stream
async function setupDatabaseWatcher() {
    // Obtén la URI de conexión a MongoDB desde las variables de entorno
    const uri = process.env.MONGODB_URI;

    try {
        // Conecta al cliente MongoDB
        const client = new MongoClient(uri);
        await client.connect();

        // Obtén la base de datos y la colección de usuarios
        const db = client.db();
        const usersCollection = db.collection('users');

        // Configura el change stream en la colección de usuarios
        const changeStream = usersCollection.watch();

        // Escucha los eventos de cambio
        changeStream.on('change', (change) => {
            // Verifica si el evento es una inserción (nuevo documento)
            if (change.operationType === 'insert') {
                // Imprime un mensaje en la consola
                console.log('Se ha agregado un nuevo usuario:', change.fullDocument);
            }
        });

    } catch (error) {
        console.error('Error al configurar el change stream:', error);
    }
}

// Iniciar el servidor
app.listen(port, () => console.log('Servidor corriendo en el puerto', port));
