import type { Request, Response } from "express";
import { prisma } from "../../index.js";

export const getUsers = async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany({ include: { movie: true } });
    res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await prisma.user.create({
            data: { name, email, password },
        });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};