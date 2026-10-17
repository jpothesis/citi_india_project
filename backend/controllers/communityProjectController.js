
import { students } from "../data/studentStore.js";
import {
  getCommunityProjectCatalog,
  recommendCommunityProjects,
} from "../services/communityProjectService.js";

export function listCommunityProjects(req, res) {
  const projects = getCommunityProjectCatalog();

  return res.json({
    success: true,
    count: projects.length,
    projects,
    notice:
      "These are sample project ideas, not verified programs or guaranteed opportunities.",
  });
}

export function getStudentCommunityProjects(req, res) {
  const student = students.get(req.params.studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Student not found.",
    });
  }

  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 5)
      : 3;

  const projects = recommendCommunityProjects(student, limit);

  return res.json({
    success: true,
    studentId: student.id,
    count: projects.length,
    projects,
    notice:
      "Suggestions are rule-based and use the student's profile. All projects are samples and have not been independently verified.",
  });
}
