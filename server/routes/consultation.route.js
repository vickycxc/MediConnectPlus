import express from "express";
import {
  addConsultation,
  addDoctorNote,
  addRecipe,
  getConsultations,
  updateConsultation,
} from "../controller/consultation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addConsultation);
router.put("/update", protectRoute, updateConsultation);
router.get("/", protectRoute, getConsultations);
router.post("doctor-note/add", protectRoute, addDoctorNote);
router.post("/recipe/add", protectRoute, addRecipe);

export default router;
