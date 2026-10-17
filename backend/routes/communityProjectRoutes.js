import { Router } from "express";
import {
  listCommunityProjects,
  getStudentCommunityProjects,
} from "../controllers/communityProjectController.js";

const router = Router();

// List all sample community projects
router.get("/", listCommunityProjects);

// Get personalized project suggestions for a student
router.get("/students/:studentId", getStudentCommunityProjects);

export default router;
