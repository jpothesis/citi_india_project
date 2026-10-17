import { Router } from "express";
import { getTeacherDashboard } from "../controllers/teacherDashboardController.js";

const router = Router();

router.get("/", getTeacherDashboard);

export default router;
