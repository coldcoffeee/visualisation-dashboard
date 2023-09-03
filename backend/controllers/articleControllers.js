import Article from "../schemas/articleSchema.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getArticlesByYear = async (req, res) => {
  const targetYear = parseInt(req.params.year);
  try {
    const pipeline = [
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$published" }, targetYear],
          },
        },
      },
    ];
    const articles = await Article.aggregate(pipeline);
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getArticlesByCountry = async (req, res) => {
  const country = req.params.country.replace(/_/g, " ");
  try {
    const articles = await Article.find({ country });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getArticlesByPestle = async (req, res) => {
  const pestle = req.params.pestle;
  try {
    const articles = await Article.find({ pestle });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ err });
  }
};
