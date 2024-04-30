const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.post('/users', async (req, res) => {
    const { name, email, password, rol } = req.body;

    try {
        // Validar el rol proporcionado
        const allowedRoles = ['admin', 'estudiante'];
        if (!allowedRoles.includes(rol)) {
            return res.status(400).json({ message: 'Rol no válido. Los roles válidos son "admin" y "estudiante".' });
        }

        // Crear un nuevo usuario con el rol proporcionado
        const newUser = new User({ name, email, password, rol });
        
        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // Enviar una respuesta con el usuario creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
// Obtener todos los usuarios
router.get("/users", (req, res) => {
    User
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Ruta para obtener el número total de usuarios
router.get('/users/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ count: userCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Obtener un usuario por ID
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    User
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario por ID
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    User
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Actualizar un usuario por ID
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    User
      .updateOne({ _id: id }, { $set: { name, age, email } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Inicio de sesión
router.post("/users/login", (req, res) => {
    const { email, password } = req.body;
    User
      .findOne({ email }) // Buscar el usuario por su correo electrónico
      .then((user) => {
          if (!user) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          if (user.password !== password) {
              return res.status(401).json({ message: 'Credenciales incorrectas' });
          }
          // Si las credenciales son válidas, devolver el usuario
          res.json(user);
      })
      .catch((error) => res.status(500).json({ message: error }));
});


module.exports = router;
