import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["subscriber", "admin"],
      default: "subscriber",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "lapsed"],
      default: "inactive",
    }, 
    charityId: { type: mongoose.Schema.Types.ObjectId, ref: "Charity" }, 
    contributionPct: { type: Number, default: 10.0 },
  },
  { timestamps: true },
);
export default mongoose.model("users", userSchema);
