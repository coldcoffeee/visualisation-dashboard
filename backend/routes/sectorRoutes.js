import { Router } from "express";
import * as sectorControllers from "../controllers/sectorControllers.js";
const router = Router();

router.get("/", sectorControllers.getAllSectors);
router.get("/:sectorId", sectorControllers.getSectorById);

export default router;
