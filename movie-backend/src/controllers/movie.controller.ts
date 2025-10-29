import type { Request, Response } from "express";
import { prisma } from "../../index.js";

export const getMovies = async (_req: Request, res: Response) => {
    const movies = await prisma.movie.findMany();
    res.json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
    try {
        const movie = await prisma.movie.create({ data: req.body });
        res.status(201).json(movie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const editMovie = async (req: Request, res: Response) => {
    try {
        const movieId = Number(req.params.id);
        const movie = await prisma.movie.update({
            where: { id: movieId },
            data: req.body,
        });
        res.json(movie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movieId = Number(req.params.id);
        await prisma.movie.delete({ where: { id: movieId } });
        res.status(204).end();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};