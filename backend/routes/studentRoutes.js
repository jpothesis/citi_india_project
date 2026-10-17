import { Router } from "express";
import {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
} from "../controllers/studentController.js";

const router = Router();

router.post("/", createStudent);
router.get("/", listStudents);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);

export default router;
