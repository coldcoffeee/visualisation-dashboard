import Country from "../schemas/countrySchema.js";
import Sector from "../schemas/sectorSchema.js";
import Source from "../schemas/sourceSchema.js";
import Topic from "../schemas/topicSchema.js";
import Report from "../schemas/reportSchema.js";
import Pestle from "../schemas/pestleSchema.js";
import Article from "../schemas/articleSchema.js";

const getData = async () => {
  try {
    const { default: data } = await import("./data.js");
    return Promise.resolve(data);
  } catch (err) {
    throw err;
  }
};

const getOrganisedData = async () => {
  try {
    const rawData = await getData();
    const organisedData = {
      countries: new Map(),
      sectors: new Set(),
      sources: new Set(),
      topics: new Set(),
      pestle: new Set(),
    };
    Array.isArray(rawData) &&
      rawData.forEach((data) => {
        if (data.region && data.country)
          organisedData.countries.set(data.country, data.region);
        if (data.sector) organisedData.sectors.add(data.sector);
        if (data.source) organisedData.sources.add(data.source);
        if (data.topic) organisedData.topics.add(data.topic);
        if (data.pestle) organisedData.pestle.add(data.pestle);
      });

    return Promise.resolve({ organisedData, rawData });
  } catch (err) {
    throw err;
  }
};

const upload = async () => {
  try {
    const { organisedData, rawData } = await getOrganisedData();

    const collectionDocuments = {
      countries: [],
      sectors: [],
      sources: [],
      topics: [],
      pestle: [],
    };
    for (const [country, region] of organisedData.countries)
      collectionDocuments.countries.push({ name: country, region });

    for (const sector of organisedData.sectors)
      collectionDocuments.sectors.push({ name: sector });

    for (const source of organisedData.sources)
      collectionDocuments.sources.push({ name: source });

    for (const topic of organisedData.topics)
      collectionDocuments.topics.push({ name: topic });

    for (const pestle of organisedData.pestle)
      collectionDocuments.pestle.push({ name: pestle });

    await Promise.all([
      Country.create(collectionDocuments.countries),
      Sector.create(collectionDocuments.sectors),
      Topic.create(collectionDocuments.topics),
      Source.create(collectionDocuments.sources),
      Pestle.create(collectionDocuments.pestle),
    ]);

    const reportDocuments = [];

    for (const reportData of rawData) {
      const country = reportData.country
        ? await Country.findOne({ name: reportData.country })
        : null;
      const sector = reportData.sector
        ? await Sector.findOne({ name: reportData.sector })
        : null;
      const topic = reportData.topic
        ? await Topic.findOne({ name: reportData.topic })
        : null;
      const source = reportData.source
        ? await Source.findOne({ name: reportData.source })
        : null;

      const report = new Report({
        ...reportData,
        country: country ? country._id : null,
        sector: sector ? sector._id : null,
        topic: topic ? topic._id : null,
        source: source ? source._id : null,
      });

      await report.save();
    }

    for (const article of rawData) {
      await Article.create(article);
    }

    return Promise.resolve("Upload successful.");
  } catch (err) {
    throw err;
  }
};

export default upload;
