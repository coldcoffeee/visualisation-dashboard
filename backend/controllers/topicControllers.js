import Topics from "../schemas/topicSchema.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topics.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
