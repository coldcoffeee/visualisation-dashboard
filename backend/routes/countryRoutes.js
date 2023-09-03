import { Router } from "express";
import * as countryControllers from "../controllers/countryControllers.js";
const router = Router();

router.get("/", countryControllers.getAllCountries);
router.get("/region/", countryControllers.getAllDistinctRegions);
router.get("/region/:regionName", countryControllers.getCountriesByRegion);
router.get("/:countryId", countryControllers.getCountryById);

export default router;
