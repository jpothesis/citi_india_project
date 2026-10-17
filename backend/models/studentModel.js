import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, default: null },
    preferredLanguage: { type: String, default: "English" },
    location: { type: String, default: "" },
    educationLevel: { type: String, default: "" },
    interests: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    careerGoals: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;