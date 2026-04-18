import express from "express";
import { addScoreSchema } from "../validations/scoreSchema.js";
import validate from "../middlewares/validate.js";
import { activeOnly, jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";
import { addScore, getUserScores } from "../controllers/Score.js";
const router = express.Router();
router.post("/", jwtVerifier, activeOnly, validate(addScoreSchema), addScore);
router.get("/", jwtVerifier, getUserScores);

export default router;
