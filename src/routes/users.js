const express = require('express');
const userSchema = require('../models/users');

const router = express.Router();

// Crear usuario
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
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
