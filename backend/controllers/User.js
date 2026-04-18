import User from "../models/User.js";
import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
import Charity from "../models/Charity.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("charityId");
    const scores = await Score.find({ userId })
      .sort({ scoreDate: -1 })
      .limit(5);
    const winnings = await Winner.find({ userId });
    const totalWon = winnings.reduce((acc, win) => acc + win.amount, 0);

    res.status(200).json({
      subscription: {
        status: user.subscriptionStatus,
        contributionPct: user.contributionPct,
        selectedCharity: user.charityId ? user.charityId.name : "None Selected",
      },
      scores,
      winnings: {
        totalWon,
        history: winnings,
      },
    });
  } catch (err) {
    console.error("Error From getDashboardData controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
