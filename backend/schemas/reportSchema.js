import { Schema, model } from "mongoose";

const reportSchema = new Schema({
  title: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  sector: {
    type: Schema.Types.ObjectId,
    ref: "Sector",
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: "Source",
  },
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
});

const Report = model("Report", reportSchema);

export default Report;
