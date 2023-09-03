import { Schema, model } from "mongoose";

const sourceSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Source = model("Source", sourceSchema);

export default Source;
