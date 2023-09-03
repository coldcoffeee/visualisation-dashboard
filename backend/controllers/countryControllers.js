import Country from "../schemas/countrySchema.js";

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCountriesByRegion = async (req, res) => {
  const regionName = req.params.regionName.replace(/_/g, " ");
  console.log(regionName);
  try {
    const countriesInRegion = await Country.find({ region: regionName });
    res.json(countriesInRegion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCountryById = async (req, res) => {
  const countryId = req.params.countryId;
  try {
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllDistinctRegions = async (req, res) => {
  try {
    const distinctRegions = await Country.distinct("region");
    res.json(distinctRegions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
