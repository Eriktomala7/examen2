import express from "express";
import clientes_routes from "./routes/clientes_routes.js";
import partido_routes from "./routes/partido_routes.js";
import pronostico_routes from "./routes/pronostico_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas específicas para cada grupo
app.use("/api", clientes_routes);
app.use("/api", partido_routes);
app.use("/api", pronostico_routes);
app.use("/api", usuarios_routes);

// Middleware de manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Página no encontrada" });
});

// Middleware de manejo de errores generales (por ejemplo, si se lanza un error en alguna ruta)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Ocurrió un error en el servidor" });
});

export default app;
