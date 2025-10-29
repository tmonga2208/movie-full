import type { Request, Response } from "express";
import { prisma } from "../../index.js";

export const getTVShows = async (_req: Request, res: Response) => {
    const shows = await prisma.tVShow.findMany();
    res.json(shows);
};

export const createTVShow = async (req: Request, res: Response) => {
    try {
        const show = await prisma.tVShow.create({ data: req.body });
        res.status(201).json(show);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const editTVShow = async (req: Request, res: Response) => {
    try {
        const showId = Number(req.params.id);
        const show = await prisma.tVShow.update({
            where: { id: showId },
            data: req.body,
        });
        res.json(show);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteTVShow = async (req: Request, res: Response) => {
    try {
        const showId = Number(req.params.id);
        await prisma.tVShow.delete({ where: { id: showId } });
        res.status(204).end();
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};