import Winner from "../models/Winner.js";

export const uploadWinnerProof = async (req, res) => {
  const { winnerId, proofUrl } = req.body;
  try {
    const winner = await Winner.findOneAndUpdate(
      { _id: winnerId, userId: req.user.id },
      { proofUrl, status: "pending" },
      { new: true },
    );
    res.status(200).json(winner);
  } catch (err) {
    console.error("Error From uploadWinnerProof controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyPayout = async (req, res) => {
  const { winnerId, status } = req.body; // status: 'verified' or 'rejected'
  try {
    const winner = await Winner.findByIdAndUpdate(
      winnerId,
      { status: status === "verified" ? "paid" : "rejected" },
      { new: true },
    );
    res.status(200).json(winner);
  } catch (err) {
    console.error("Error From verifyPayout controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
