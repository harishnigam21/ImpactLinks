import Draw from "../models/Draw.js";
import User from "../models/User.js";
import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
export const publishDraw = async (req, res) => {
  const { drawId } = req.body;
  try {
    const draw = await Draw.findById(drawId);
    if (!draw) return res.status(404).json({ message: "Draw not found" });
    draw.status = "published";
    await draw.save();
    res.status(200).json({ message: "Draw published successfully", draw });
  } catch (err) {
    console.error("Error From publishDraw controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubs = await User.find({ subscriptionStatus: "active" });
    const totalPrizePool = activeSubs.length * 50;
    const totalCharityImpact = activeSubs.reduce(
      (acc, user) => acc + 50 * (user.contributionPct / 100),
      0,
    );

    res.status(200).json({
      totalUsers,
      totalPrizePool,
      totalCharityImpact,
      drawsCount: await Draw.countDocuments(),
    });
  } catch (err) {
    console.error("Error From getAdminStats controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("charityId");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error From getAllUsers controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePlayerScore = async (req, res) => {
  const { scoreId, newValue } = req.body;
  try {
    const updatedScore = await Score.findByIdAndUpdate(
      scoreId,
      { value: newValue },
      { new: true },
    );
    res.status(200).json(updatedScore);
  } catch (err) {
    console.error("Error From updatePlayerScore controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

