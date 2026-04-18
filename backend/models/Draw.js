import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    drawDate: { type: Date, default: Date.now },
    winningNumbers: [{ type: Number }],
    totalPrizePool: { type: Number, required: true },
    status: {
      type: String,
      enum: ["simulated", "published"],
      default: "simulated",
    },
    winners: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tier: { type: Number },
        prizeAmount: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Draw", drawSchema);
