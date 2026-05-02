import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(express.json());

// routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

export default app;