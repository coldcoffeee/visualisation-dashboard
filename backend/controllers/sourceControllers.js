import Source from "../schemas/sourceSchema.js";

export const getAllSources = async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
