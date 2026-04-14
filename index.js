import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", phase: "modular-architecture-fixed" });
});

// Movies routes
app.get("/api/movies", async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies" });
    }
});

app.post("/api/movies", async (req, res) => {
    try {
        const movie = await prisma.movie.create({
            data: {
                title: req.body.title,
                year: Number(req.body.year),
                genre: req.body.genre,
                description: req.body.description
            }
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: "Error creating movie" });
    }
});

app.put("/api/movies/:id", async (req, res) => {
    try {
        const movie = await prisma.movie.update({
            where: { id: Number(req.params.id) },
            data: {
                title: req.body.title,
                year: Number(req.body.year),
                genre: req.body.genre,
                description: req.body.description
            }
        });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Could not update movie" });
    }
});

app.delete("/api/movies/:id", async (req, res) => {
    try {
        await prisma.movie.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie" });
    }
});

app.post("/api/movies/sync", async (req, res) => {
    try {
        const keyword = req.body.keyword || "batman";
        const apiKey = process.env.OMDB_API_KEY || "demo";
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;
        const externalResponse = await fetch(url);
        const externalData = await externalResponse.json();
        const list = externalData.Search || [];

        await prisma.movie.createMany({
            data: list.map((item) => ({
                title: item.Title,
                year: Number(item.Year),
                genre: "Unknown",
                externalId: item.imdbID,
                description: "Synced from OMDb"
            })),
            skipDuplicates: true
        });

        res.status(200).json({
            message: "Sync completed",
            insertedCount: list.length
        });
    } catch (error) {
        res.status(500).json({ message: "Sync failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
