import Pestle from "../schemas/pestleSchema.js";

export const getAllPestles = async (req, res) => {
  try {
    const pestles = await Pestle.find();
    res.json(pestles);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
