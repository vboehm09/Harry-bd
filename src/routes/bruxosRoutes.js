import express from "express";
import { getAllBruxos, getBruxosById } from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);

export default router;