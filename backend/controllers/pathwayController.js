
import { students } from "../data/studentStore.js";
import {
  generatePathway,
  getPathwayCatalog,
} from "../services/pathwayService.js";

export function listPathways(req, res) {
  return res.json({
    success: true,
    count: getPathwayCatalog().length,
    pathways: getPathwayCatalog(),
  });
}

export function getStudentPathway(req, res) {
  const student = students.get(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Student not found.",
    });
  }

  const result = generatePathway(student);

  return res.json({
    success: true,
    ...result,
  });
}

export function getStudentSkillGaps(req, res) {
  const student = students.get(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Student not found.",
    });
  }

  const result = generatePathway(student);

  return res.json({
    success: true,
    studentId: student.id,
    pathway: result.pathway,
    skillGaps: result.skillGaps,
    learningPlan: result.learningPlan,
  });
}
