
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401); // token no enviado

  const token = authHeader.split(" ")[1]; // extraer solo la aprte del token del Bearer token

  jwt.verify(token, secretKey, (err, payload) => {
    // if (err) return res.status(403).join({ message: "Token inválido " });
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = payload; // guardamos info del usuario logueado
    next(); // continuar con la siguiente función
  });
};

export default authenticateJWT;
