import express from "express";
import cors from "cors";
import connectDB from "./DB/DBConnection.js";
import Auth from "./routes/Auth.js";
import Score from "./routes/Score.js";
import Charity from "./routes/Charity.js";
import Admin from "./routes/Admin.js";
import Payment from "./routes/Payment.js";
import corsOptions from "./config/cors.js";
import { envList } from "./envConfig.js";
import credentials from "./middlewares/credentials/credentials.js";
import cookieParser from "cookie-parser";
connectDB();
const app = express();
const PORT = envList.PORT || 5004;

//middleware's
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routes
app.use("/api/auth", Auth);
app.use("/api/score", Score);
app.use("/api/charities", Charity);
app.use("/api/admin", Admin);
app.use("/api/payment", Payment);

app.get("/", (req, res) =>
  res.status(200).json({ message: "Backend Server running successfully" }),
);
app.listen(PORT, () =>
  console.log(`Backend Server is running at PORT No.-->> ${PORT}`),
);
