
import { randomUUID } from "node:crypto";
import { students } from "../data/studentStore.js";
import { skillPassports } from "../data/skillPassportStore.js";

const allowedFields = [
  "skills",
  "projects",
  "achievements",
  "learningProgress",
];

function validatePassportData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Request body must be a JSON object.";
  }

  if (
    data.skills !== undefined &&
    (!Array.isArray(data.skills) ||
      !data.skills.every(
        (skill) =>
          typeof skill === "string" && skill.trim().length > 0
      ))
  ) {
    return "skills must be an array of non-empty strings.";
  }

  for (const field of ["projects", "achievements"]) {
    if (
      data[field] !== undefined &&
      (!Array.isArray(data[field]) ||
        !data[field].every(
          (item) =>
            item !== null &&
            typeof item === "object" &&
            !Array.isArray(item)
        ))
    ) {
      return `${field} must be an array of objects.`;
    }
  }

  if (data.learningProgress !== undefined) {
    if (
      !Array.isArray(data.learningProgress) ||
      !data.learningProgress.every(
        (item) =>
          item !== null &&
          typeof item === "object" &&
          !Array.isArray(item) &&
          typeof item.title === "string" &&
          item.title.trim().length > 0 &&
          typeof item.status === "string" &&
          ["not-started", "in-progress", "completed"].includes(item.status)
      )
    ) {
      return (
        "learningProgress must be an array of objects with a title " +
        "and a valid status: not-started, in-progress, or completed."
      );
    }
  }

  for (const field of ["projects", "achievements"]) {
    if (Array.isArray(data[field])) {
      for (const item of data[field]) {
        for (const value of Object.values(item)) {
          if (
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean" &&
            value !== null
          ) {
            return `${field} entries may contain only simple values.`;
          }
        }
      }
    }
  }

  return null;
}

export function getSkillPassport(req, res) {
  const student = students.get(req.params.studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Student not found.",
    });
  }

  const passport = skillPassports.get(student.id);

  return res.json({
    success: true,
    passport:
      passport ?? {
        id: null,
        studentId: student.id,
        skills: student.skills ?? [],
        projects: [],
        achievements: [],
        learningProgress: [],
        message: "No passport has been created yet.",
      },
  });
}

export function createOrUpdateSkillPassport(req, res) {
  const student = students.get(req.params.studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: "Student not found.",
    });
  }

  const error = validatePassportData(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  const existing = skillPassports.get(student.id);

  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const passport = {
    id: existing?.id ?? randomUUID(),
    studentId: student.id,
    skills: existing?.skills ?? student.skills ?? [],
    projects: existing?.projects ?? [],
    achievements: existing?.achievements ?? [],
    learningProgress: existing?.learningProgress ?? [],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  skillPassports.set(student.id, passport);

  return res.status(existing ? 200 : 201).json({
    success: true,
    passport,
  });
}
