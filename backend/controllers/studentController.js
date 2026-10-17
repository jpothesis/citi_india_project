import Student from '../models/studentModel.js';

const allowedStudentFields = [
  "name",
  "age",
  "preferredLanguage",
  "location",
  "educationLevel",
  "interests",
  "strengths",
  "skills",
  "careerGoals",
];

function validateStudentData(data, isUpdate = false) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Request body must be a JSON object.";
  }

  if (!isUpdate && (typeof data.name !== "string" || !data.name.trim())) {
    return "Name is required.";
  }

  if (
    data.age !== undefined && data.age !== null &&
    (!Number.isInteger(data.age) || data.age < 1 || data.age > 120)
  ) {
    return "Age must be an integer between 1 and 120.";
  }

  for (const field of ["interests", "strengths", "skills", "careerGoals"]) {
    if (
      data[field] !== undefined &&
      (!Array.isArray(data[field]) || !data[field].every((item) => typeof item === "string"))
    ) {
      return `${field} must be an array of strings.`;
    }
  }

  for (const field of ["name", "preferredLanguage", "location", "educationLevel"]) {
    if (data[field] !== undefined && typeof data[field] !== "string") {
      return `${field} must be a string.`;
    }
  }

  return null;
}

export const createStudent = async (req, res) => {
  const error = validateStudentData(req.body);

  if (error) {
    return res.status(400).json({ success: false, error });
  }

  try {
    const studentData = {
      name: req.body.name.trim(),
      age: req.body.age ?? null,
      preferredLanguage: req.body.preferredLanguage ?? "English",
      location: req.body.location ?? "",
      educationLevel: req.body.educationLevel ?? "",
      interests: req.body.interests ?? [],
      strengths: req.body.strengths ?? [],
      skills: req.body.skills ?? [],
      careerGoals: req.body.careerGoals ?? [],
    };

    const student = await Student.create(studentData);
    return res.status(201).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const listStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.json({
      success: true,
      count: students.length,
      students,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found." });
    }
    return res.json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Invalid student ID or server error." });
  }
};

export const updateStudent = async (req, res) => {
  const error = validateStudentData(req.body, true);
  if (error) {
    return res.status(400).json({ success: false, error });
  }

  const updates = {};
  for (const field of allowedStudentFields) {
    if (req.body[field] !== undefined) {
      updates[field] = field === "name" ? req.body[field].trim() : req.body[field];
    }
  }

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found." });
    }

    return res.json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};