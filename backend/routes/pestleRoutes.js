import { Router } from "express";
import * as pestleControllers from "../controllers/pestleControllers.js";
const router = Router();

router.get("/", pestleControllers.getAllPestles);

export default router;
