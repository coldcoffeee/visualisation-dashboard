import { Schema, model } from "mongoose";

const topicSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Topic = model("Topic", topicSchema);

export default Topic;
