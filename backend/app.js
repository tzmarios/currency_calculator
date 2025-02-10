import express from "express";
import middlewares from "./middlewares/middlewares.js";
import apiRoutes from "./routes/routes.js";


const app = express();

// Middlewares
middlewares(app);

// Routes
app.use("/api", apiRoutes);


export default app;