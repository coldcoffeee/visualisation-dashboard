import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import uploadDataToDB from "./utils/dataUploadHandler.js";
import Article from "./schemas/articleSchema.js";

import express from "express";
import countryRoutes from "./routes/countryRoutes.js";
import sectorRoutes from "./routes/sectorRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import sourceRoutes from "./routes/sourceRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import pestleRoutes from "./routes/pestleRoutes.js";

import cors from "cors";

const app = express();

configDotenv();

app.use(cors());
app.use("/countries", countryRoutes);
app.use("/sectors", sectorRoutes);
app.use("/topics", topicRoutes);
app.use("/sources", sourceRoutes);
app.use("/articles", articleRoutes);
app.use("/pestles", pestleRoutes);

(async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Uploading...");
    (await Article.findOne()) || (await uploadDataToDB());
    console.log("Upload successful");
    app.listen(4000, () => console.log("Server started"));
  } catch (err) {
    throw err;
  }
})();
