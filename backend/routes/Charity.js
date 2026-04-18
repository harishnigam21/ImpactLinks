import express from "express";
import { getCharities, getCharityById } from "../controllers/Charity.js";
const router = express.Router();
router.get("/", getCharities);
router.get("/:id", getCharityById);

export default router;
