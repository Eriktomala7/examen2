import { Router } from "express";
import { loginUsuario, registrarUsuario } from "../controladores/usuariosctrl.js";

const router = Router();

// Armar nuestras rutas
router.post("/login", loginUsuario);
router.post("/usuarios", registrarUsuario);

export default router;
