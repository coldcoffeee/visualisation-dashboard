import { Schema, model } from "mongoose";

const sectorSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Sector = model("Sector", sectorSchema);

export default Sector;
