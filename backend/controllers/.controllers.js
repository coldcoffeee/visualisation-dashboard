import Insight from "../models/insight.js";
export const listAllByParam = async (req, res) => {
  try {
    const { param } = req.query;
    const groupByParamPipeline = [
      {
        $group: {
          _id: `$${param}`,
        },
      },
      { $project: { _id: 0, [param]: "$_id" } },
      { $match: { [param]: { $ne: "" } } },
      { $sort: { [param]: 1 } },
    ];
    const resultList = await Insight.aggregate(groupByParamPipeline);
    res
      .status(200)
      .json({ [`${param}List`]: resultList.map((item) => item[param]) });
  } catch (err) {
    res.status(500).json("Couldn't fetch data!");
  }
};

export const fetchAllRecords = async (req, res) => {
	try {
		const records = await Insight.find({});
		res
		.status(200)
	      	.json({ records });
	} catch(err) {
		res.status(500).json("Couldn't fetch data!");
	}
}
