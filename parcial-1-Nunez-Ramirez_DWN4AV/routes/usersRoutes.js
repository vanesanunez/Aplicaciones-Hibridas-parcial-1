
import express from "express";
import {createUser, getUsers, getUserById, updateUser, deleteUser, loginUser} from "../controllers/usersController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";


const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id',authenticateJWT, updateUser);
usersRouter.delete('/:id', authenticateJWT,deleteUser);


export { usersRouter };
