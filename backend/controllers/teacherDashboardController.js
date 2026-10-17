import { students } from "../data/studentStore.js";
import { skillPassports } from "../data/skillPassportStore.js";

function countValues(values) {
  const counts = new Map();

  for (const value of values) {
    if (typeof value !== "string" || !value.trim()) continue;

    const label = value.trim();
    const key = label.toLowerCase();
    const existing = counts.get(key);

    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { label, count: 1 });
    }
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 5);
}

function countStudentFields(studentList, field) {
  return countValues(studentList.flatMap((student) =>
    Array.isArray(student[field]) ? student[field] : []
  ));
}

export function getTeacherDashboard(req, res) {
  const studentList = Array.from(students.values());

  const educationLevels = countValues(
    studentList.map((student) => student.educationLevel)
  );

  const preferredLanguages = countValues(
    studentList.map((student) => student.preferredLanguage)
  );

  const passports = studentList
    .map((student) => skillPassports.get(student.id))
    .filter(Boolean);

  const uniqueSkills = studentList.flatMap((student) => {
    const passport = skillPassports.get(student.id);
    const studentSkills = Array.isArray(student.skills) ? student.skills : [];
    const passportSkills = Array.isArray(passport?.skills)
      ? passport.skills
      : [];

    // Count each skill at most once per student.
    return [...new Set(
      [...studentSkills, ...passportSkills]
        .filter((skill) => typeof skill === "string" && skill.trim())
        .map((skill) => skill.trim())
    )];
  });

  const progressCounts = {
    "not-started": 0,
    "in-progress": 0,
    completed: 0,
  };

  let totalProjects = 0;
  let totalAchievements = 0;

  for (const passport of passports) {
    totalProjects += Array.isArray(passport.projects)
      ? passport.projects.length
      : 0;

    totalAchievements += Array.isArray(passport.achievements)
      ? passport.achievements.length
      : 0;

    for (const item of Array.isArray(passport.learningProgress)
      ? passport.learningProgress
      : []) {
      if (item && Object.hasOwn(progressCounts, item.status)) {
        progressCounts[item.status] += 1;
      }
    }
  }

  return res.json({
    success: true,
    dashboard: {
      totalStudents: studentList.length,
      educationLevels,
      preferredLanguages,
      popularInterests: countStudentFields(studentList, "interests"),
      popularStrengths: countStudentFields(studentList, "strengths"),
      popularSkills: countValues(uniqueSkills),
      skillPassports: {
        total: passports.length,
        studentsWithoutPassport: studentList.length - passports.length,
        totalProjects,
        totalAchievements,
      },
      learningProgress: {
        ...progressCounts,
        total: Object.values(progressCounts).reduce(
          (sum, count) => sum + count,
          0
        ),
      },
    },
    generatedAt: new Date().toISOString(),
    notice:
      "Aggregate statistics only; no individual student profiles are returned. " +
      "Data is held in memory and resets when the backend restarts.",
  });
}
