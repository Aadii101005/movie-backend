import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";

dotenv.config();
await import("./cron/syncjob.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

export default app;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/series", seriesRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", phase: "modular-architecture-fixed" });
});


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
            