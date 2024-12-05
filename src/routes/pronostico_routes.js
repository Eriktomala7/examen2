
import { Router } from "express";
import { registrarPronostico, obtenerPronosticosPorUsuario } from "../controladores/pronosticoctrl.js";

const router = Router();

// Armar nuestras rutas
router.post("/pronostico", registrarPronostico);
router.get("/pronostico/:id", obtenerPronosticosPorUsuario);    


export default router;
