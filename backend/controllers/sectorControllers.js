import Sector from "../schemas/sectorSchema.js";

export const getAllSectors = async (req, res) => {
  try {
    const sectors = await Sector.find();
    res.json(sectors);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSectorById = async (req, res) => {
  const sectorId = req.params.sectorId;
  try {
    const sector = await Sector.findById(sectorId);
    if (!sector) {
      return res.status(404).json({ error: "Sector not found" });
    }
    res.json(sector);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
