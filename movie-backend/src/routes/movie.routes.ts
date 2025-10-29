import express from "express";
import { getMovies, createMovie, editMovie, deleteMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", editMovie);
router.delete("/:id", deleteMovie);


export default router;