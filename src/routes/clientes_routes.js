import { Router } from "express";
import { getClientes, getClientesid } from "../controladores/clientesCtrl.js";

const router = Router();

// Armar nuestras rutas
router.get("/clientes", getClientes);
router.get("/clientes/:id", getClientesid);

export default router;
