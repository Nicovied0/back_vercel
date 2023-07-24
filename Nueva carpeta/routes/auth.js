const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ruta para el registro de usuarios
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Verificar si el email ya está registrado
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      // Crear un nuevo usuario
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });

      newUser
        .save()
        .then((user) => {
          res.status(201).json({ message: "Registro exitoso" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error en el servidor" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error en el servidor" });
    });
});

// Ruta para el inicio de sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar si el email existe
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Email o contraseña incorrectos" });
      }

      // Verificar la contraseña
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Email o contraseña incorrectos" });
      }

      // Generar el token de acceso JWT sin fecha de expiración
      const token = jwt.sign({ userId: user._id }, "secreto");

      res.status(200).json({ token: token });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error en el servidor" });
    });
});

router.get("/profile", (req, res) => {
  // Verificar el token de acceso
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Verificar y decodificar el token
  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Obtener el ID del usuario del token decodificado
    const userId = decoded.userId;

    // Buscar el usuario por su ID en la base de datos
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Aquí puedes obtener los datos del perfil que deseas guardar en el localStorage
        const userProfile = {
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          number: user.number,
          description: user.description,
          role: user.role,
          // Agrega cualquier otra información adicional del perfil que necesites
        };

        // Guardar los datos del perfil en el localStorage
        res.status(200).json({ profile: userProfile });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error en el servidor" });
      });
  });
});

// Ruta para editar la cuenta del usuario
router.put("/profile/edit", (req, res) => {
  // Verificar el token de acceso
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Verificar y decodificar el token
  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Obtener el ID del usuario del token decodificado
    const userId = decoded.userId;

    // Crear un objeto con los campos a actualizar
    const updateFields = {};
    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.imagen) {
      updateFields.imagen = req.body.imagen;
    }
    if (req.body.number) {
      updateFields.number = req.body.number;
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }
    // Agrega cualquier otro campo que desees actualizar en la cuenta del usuario

    // Buscar y actualizar el usuario por su ID en la base de datos
    User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      omitUndefined: true,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Aquí puedes obtener los datos del perfil actualizado que deseas enviar en la respuesta
        const userProfile = {
          name: user.name,
          email: user.email,
          imagen: user.imagen,
          number: user.number,
          description: user.description,
          role: user.role,
          // Agrega cualquier otra información adicional del perfil que necesites
        };

        res.status(200).json({ profile: userProfile });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error en el servidor" });
      });
  });
});

module.exports = router;
