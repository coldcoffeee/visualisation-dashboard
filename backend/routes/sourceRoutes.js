import { Router } from "express";
import * as sourceControllers from "../controllers/sourceControllers.js";
const router = Router();

router.get("/", sourceControllers.getAllSources);

export default router;
