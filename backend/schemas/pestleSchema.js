import { Schema, model } from "mongoose";

const pestleSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Pestle = model("Pestle", pestleSchema);

export default Pestle;
