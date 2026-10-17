
import { Router } from "express";
import {
  getSkillPassport,
  createOrUpdateSkillPassport,
} from "../controllers/skillPassportController.js";

const router = Router();

// Retrieve a student's skill passport
router.get("/:studentId", getSkillPassport);

// Create or update a student's skill passport
router.put("/:studentId", createOrUpdateSkillPassport);

export default router;
