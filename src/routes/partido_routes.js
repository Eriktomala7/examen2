import { Router } from "express";
import { registrarPartido, obtenerPartidosActivos } from "../controladores/partidoctrl.js";

const router = Router();

// Armar nuestras rutas
router.post("/partido", registrarPartido);
router.get("/partidos", obtenerPartidosActivos);

export default router;