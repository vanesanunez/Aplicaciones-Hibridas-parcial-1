import express from "express";
import { createReporte, getReportes, getReporteById, searchByTag, updateReporte, deleteReporte } from "../controllers/reportsController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";

const reportsRouter = express.Router();

reportsRouter.post('/', authenticateJWT, createReporte); // requiere token para crear
reportsRouter.get('/', getReportes); 
reportsRouter.get('/:id', getReporteById); 
reportsRouter.get('/search/tags', searchByTag); 
reportsRouter.put('/:id', authenticateJWT, updateReporte); // requiere token para modificar
reportsRouter.delete('/:id', authenticateJWT, deleteReporte); // requiere token para eliminar

export { reportsRouter };
