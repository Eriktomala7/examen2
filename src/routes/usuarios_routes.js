import { Router } from "express";
import { loginUsuario, registrarUsuario ,obtenerUsuarios } from "../controladores/usuariosctrl.js";

const router = Router();

// Armar nuestras rutas
router.post("/login", loginUsuario);
router.post("/usuarios", registrarUsuario);
router.get("/usuarios", obtenerUsuarios);

export default router;
