import { Router } from "express";
import * as articleControllers from "../controllers/articleControllers.js";
const router = Router();

router.get("/", articleControllers.getAllArticles);
router.get("/year/:year", articleControllers.getArticlesByYear);
router.get("/country/:country", articleControllers.getArticlesByCountry);
router.get("/pestle/:pestle", articleControllers.getArticlesByPestle);

export default router;
