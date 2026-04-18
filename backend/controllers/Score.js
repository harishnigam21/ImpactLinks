import Score from "../models/Score.js";

export const addScore = async (req, res) => {
  try {
    const { value, date } = req.body;
    const userId = req.user.id;
    const scoreDate = new Date(date);

    const userScores = await Score.find({ userId }).sort({ scoreDate: 1 });

    if (userScores.length >= 5) {
      const oldestScoreId = userScores[0]._id;
      await Score.findByIdAndDelete(oldestScoreId);
    }

    const newScore = new Score({
      userId,
      value,
      scoreDate,
    });
    await newScore.save();
    res
      .status(201)
      .json({ message: "Score added successfully", data: newScore });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Only one score entry permitted per date." });
    }
    console.error("Error From addScore controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id }).sort({
      scoreDate: -1,
    });
    res.status(200).json(scores);
  } catch (err) {
    console.error("Error From getUserScores controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
