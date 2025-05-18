import Route from "../models/routesModel.js";

// Crear una ruta segura sugerida por el usuario (requiere token)
export const createRoute = async (req, res) => {
  const { name, startPoint, endPoint, description } = req.body;
  const userId = req.user.id;

  if (!name || !startPoint || !endPoint || !description) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const nuevaRuta = new Route({
      name,
      startPoint,
      endPoint,
      description,
      userId,
      locationPoint
    });

    const rutaGuardada = await nuevaRuta.save();
    res.status(201).json(rutaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las rutas
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una ruta por ID
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Ruta no encontrada" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una ruta sugerida (requiere token)
export const updateRoute = async (req, res) => {
  try {
    const routeId = req.params.id;
    const userId = req.user.id;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Ruta no encontrada" });
    if (route.userId !== userId) return res.status(403).json({ message: "No autorizado para modificar esta ruta" });

    const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, { new: true });
    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una ruta sugerida (requiere token)
export const deleteRoute = async (req, res) => {
  try {
    const routeId = req.params.id;
    const userId = req.user.id;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Ruta no encontrada" });
    if (route.userId !== userId) return res.status(403).json({ message: "No autorizado para eliminar esta ruta" });

    await Route.findByIdAndDelete(routeId);
    res.json({ message: "Ruta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
