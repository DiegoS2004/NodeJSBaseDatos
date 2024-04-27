const express = require('express');
const userSchema = require('../models/users');

const router = express.Router();

router.post('/users', (req, res) => {
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
// Obtener todos los usuarios
router.get("/users", (req, res) => {
    userSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Obtener un usuario por ID
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario por ID
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Actualizar un usuario por ID
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
      .updateOne({ _id: id }, { $set: { name, age, email } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Inicio de sesión
router.post("/users/login", (req, res) => {
    const { email, password } = req.body;
    userSchema
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
