import express from "express";
import clientes_routes from "./routes/clientes_routes.js";
import partido_routes from "./routes/partido_routes.js";
import pronostico_routes from "./routes/pronostico_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";


const app = express();
app.use(express.json()); //interprete los objetos enviados como json
app.use("/api",clientes_routes)
app.use("/api",partido_routes)
app.use("/api",pronostico_routes)
app.use("/api",usuarios_routes)
app.use((req,res,next)=>{
    res.status(400).json({message:"Pagina no encontrada"});
})

export default app;