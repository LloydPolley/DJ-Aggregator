import { Router } from "express";
import { searchDJ } from "../controllers/dj.controller";

export const djRoutes = Router();

// GET /api/dj/search?name=Carl+Cox
djRoutes.get("/search", searchDJ);
