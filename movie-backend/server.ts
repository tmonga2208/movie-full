import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./src/routes/user.routes.js";
import movieRoutes from "./src/routes/movie.routes.js";
import tvshowRoutes from "./src/routes/tvshow.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ status: "API running 🚀" });
});

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/tvshows", tvshowRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));