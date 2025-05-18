// import User from "../models/usersModel.js";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";

// Crear usuario
// const createUser = async (userData) => {
//   const { name, lastname, username, email, password } = userData;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     id: uuidv4(),
//     name,
//     lastname,
//     username,
//     email,
//     password: hashedPassword,
//   });

//   return await newUser.save();
// };

// // Login usuario
// const loginUser = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) return null;

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return false;

//   return user;
// };

// // Obtener todos los usuarios sin password
// const getAllUsers = async () => {
//   return await User.find({}, "-password");
// };

// // Actualizar usuario
// const updateUser = async (id, updateData) => {
//   if (updateData.password) {
//     updateData.password = await bcrypt.hash(updateData.password, 10);
//   }
//   return await User.findOneAndUpdate({ id }, updateData, { new: true });
// };

// // Eliminar usuario
// const deleteUser = async (id) => {
//   return await User.findOneAndDelete({ id });
// };

// export {
//   createUser,
// //   loginUser,
// //   getUsers,
// //   updateUser,
// //   deleteUser,
// };
