import express from "express";
import {
  publishDraw,
  getAdminStats,
  getAllUsers,
  updatePlayerScore,
} from "../controllers/Admin.js";
import { isAdmin, jwtVerifier } from "../middlewares/jwt/jwtVerifier.js";
import validate from "../middlewares/validate.js";
import { adminScoreUpdateSchema } from "../validations/adminSchema.js";
import { verifyPayout } from "../controllers/Winner.js";
import { runDrawSimulation } from "../controllers/Draw.js";

const router = express.Router();

router.post("/draw/simulate", jwtVerifier, isAdmin, runDrawSimulation);
router.post("/draw/publish", jwtVerifier, isAdmin, publishDraw);

router.get("/users", jwtVerifier, isAdmin, getAllUsers);
router.patch(
  "/scores/update",
  jwtVerifier,
  isAdmin,
  validate(adminScoreUpdateSchema),
  updatePlayerScore,
);

router.patch("/payouts/verify", jwtVerifier, isAdmin, verifyPayout);

router.get("/stats", jwtVerifier, isAdmin, getAdminStats);

export default router;
