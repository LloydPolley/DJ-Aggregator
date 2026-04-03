import { Request, Response, NextFunction } from "express";
import { aggregateDJData } from "../services/aggregator.service";

export const searchDJ = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      res.status(400).json({ error: "DJ Name is required" });
      return;
    }

    const data = await aggregateDJData(name);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
