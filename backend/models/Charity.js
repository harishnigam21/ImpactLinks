import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    contributionPct: { type: Number, default: 10.0 },
  },
  { timestamps: true },
);

export default mongoose.model("Charity", charitySchema);
