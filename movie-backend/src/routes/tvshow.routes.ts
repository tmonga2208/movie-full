import express from "express";
import { getTVShows, createTVShow, editTVShow, deleteTVShow } from "../controllers/tvshow.controller.js";

const router = express.Router();

router.get("/", getTVShows);
router.post("/", createTVShow);
router.put("/:id", editTVShow);
router.delete("/:id", deleteTVShow);

export default router;