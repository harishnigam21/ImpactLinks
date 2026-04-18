import mongoose from "mongoose";
const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 45,
    },
    scoreDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
scoreSchema.index({ userId: 1, scoreDate: 1 }, { unique: true });
export default mongoose.model("scores", scoreSchema);
