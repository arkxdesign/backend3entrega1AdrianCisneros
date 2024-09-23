import express from "express";
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/session.routes.js";
import userRoutes from "./routes/user.routes.js";
import carritotRoutes from "./routes/carrito.routes.js";
import mocksRoutes from "./routes/mocks.routes.js";
import petRoutes from "./routes/pet.routes.js";
import morgan from "morgan";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import { connectDB } from "./daos/mongoDB/connectDB.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 8080; 

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));


// Passport config
initializePassport();
app.use(passport.initialize());

connectDB();

// Routes
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carrito", carritotRoutes);
app.use("/api/mocks", mocksRoutes);
app.use("/api/pets", petRoutes);


// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})
