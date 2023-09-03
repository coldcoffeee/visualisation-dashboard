import { Router } from "express";
import * as topicControllers from "../controllers/topicControllers.js";
const router = Router();

router.get("/", topicControllers.getAllTopics);

export default router;
