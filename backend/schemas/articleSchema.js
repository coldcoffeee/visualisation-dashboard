import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  title: String,
  insight: String,
  url: String,
  published: Date,
  added: Date,
  relevance: Number,
  likelihood: Number,
  end_year: Number,
  intensity: Number,
  impact: Number,
  start_year: Number,
  country: String,
  sector: String,
  topic: String,
  source: String,
  pestle: String,
  region: String,
});

const Article = model("Article", articleSchema);

export default Article;
