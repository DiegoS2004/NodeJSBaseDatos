const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require("./routes/users");
const slimesRouter = require('./routes/slimes');
const User = require('./models/users');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("dotenv").config();
const coursesRoutes = require("./routes/cursos");

const app = express();
const port = process.env.PORT || 1500;

app.use(cors());
app.use(express.json()); 

app.use('/api', usersRoutes);
app.use('/api/slimes', slimesRouter);
app.use('/api', coursesRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado a la base de datos MongoDB");

        setupDatabaseWatcher();
    })
    .catch((error) => console.error("Error al conectar a la base de datos MongoDB:", error));

async function setupDatabaseWatcher() {
    const uri = process.env.MONGODB_URI;

    try {
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db();
        const usersCollection = db.collection('users');

        const changeStream = usersCollection.watch();

        changeStream.on('change', (change) => {
            if (change.operationType === 'insert') {
                console.log('Se ha agregado un nuevo usuario:', change.fullDocument);
            }
        });

    } catch (error) {
        console.error('Error al configurar el change stream:', error);
    }
}

// Ruta para agregar monedas a un usuario
app.post('/api/coins/add', async (req, res) => {
    try {
        const { userId } = req.body;

        // Realiza la lógica para agregar monedas al usuario con el userId

        // Envía una respuesta con un mensaje de éxito
        res.status(200).json({ message: 'Monedas agregadas correctamente' });
    } catch (error) {
        console.error('Error al agregar monedas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(port, () => console.log('Servidor corriendo en el puerto', port));
