import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    drawId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
      required: true,
    },
    proofUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "verified", "paid", "rejected"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    verifiedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Winner", winnerSchema);
