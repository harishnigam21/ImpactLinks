import { envList } from "../envConfig.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password, charityId, contributionPct } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      charityId,
      contributionPct: contributionPct >= 10 ? contributionPct : 10.0,
    });

    await newUser.save();
    res.status(201).json({ message: "Account created. Please log in." });
  } catch (err) {
    console.error("Error From signup controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, status: user.subscriptionStatus },
      envList.ACCESS_TOKEN_KEY,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      token,
      user: { email: user.email, status: user.subscriptionStatus },
    });
  } catch (err) {
    console.error("Error From login controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
