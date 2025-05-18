
import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
// import { createUser } from "../services/userService.js";


dotenv.config();
const secretKey = process.env.JWT_SECRET;

// // // POST /users — Crear usuario
// export const createUser = async (req, res) => {
//   const { name, lastname, dni,  username, email, password } = req.body;

//   if (!name || !lastname || !dni || !username || !email || !password) {
//     return res.status(400).json({ message: "Todos los campos son obligatorios" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });  //quiero saber si el mail ya existe, si existe es porque ya está registrado
//     if (existingUser) return res.status(400).json({ message: "El email ya está registrado" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({id: uuidv4(),name,lastname,username,email,password: hashedPassword,});

//     const savedUser = await newUser.save();
//     //  const savedUser = await createUser(req.body);
//     const { password: _, ...userWithoutPassword } = savedUser.toObject(); //userWithoutPassword para que devuelva todo menos la contraseña
//     res.status(201).json(userWithoutPassword);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// POST /users — Crear usuario
export const createUser = async (req, res) => {
  const { name, lastname, dni, username, email, password } = req.body;

  if (!name || !lastname || !dni || !username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si ya existe un usuario con ese email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Verificar si ya existe un usuario con ese DNI
    const existingDNI = await User.findOne({ dni });
    if (existingDNI) {
      return res.status(400).json({ message: "El DNI ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: uuidv4(),
      name,
      lastname,
      dni,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// POST /users/login — Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({id: user.id, email: user.email}, secretKey, {expiresIn: '1h'}) //conviene poner expires in? -Preguntar- 
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET /users — Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // sin contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET /users/:id — Obtener un usuario por id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const { password, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /users/:id — Actualizar usuario

export const updateUser = async (req, res) => {
  try {
    const { password, ...resto } = req.body;
    const actualizaciones = { ...resto };

    // Si el usuario quiere actualizar la contraseña, la encriptamos
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      actualizaciones.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      actualizaciones,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { password: _, ...userSinPassword } = updatedUser.toObject();
    res.json(userSinPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE /users/:id — Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id: req.params.id });
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
