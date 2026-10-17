
import { Router } from "express";
import {
  listPathways,
  getStudentPathway,
  getStudentSkillGaps,
} from "../controllers/pathwayController.js";

const router = Router();

// List all available learning pathways
router.get("/", listPathways);

// Generate a personalized pathway for a student
router.get("/students/:id", getStudentPathway);

// Get a student's skill gaps and learning plan
router.get("/students/:id/skill-gaps", getStudentSkillGaps);

export default router;
