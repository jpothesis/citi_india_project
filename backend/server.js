import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 

import opportunityRoutes from "./routes/opportunityRoutes.js";
// Temporarily comment out these routes until their controllers are updated to use MongoDB
// import studentRoutes from "./routes/studentRoutes.js";
// import pathwayRoutes from "./routes/pathwayRoutes.js";
// import skillPassportRoutes from "./routes/skillPassportRoutes.js";
import communityProjectRoutes from "./routes/communityProjectRoutes.js";
// import teacherDashboardRoutes from "./routes/teacherDashboardRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Prakash backend is running!",
    project: "Prakash - Learn. Earn. Guide. Grow.",
  });
});

app.use("/api/opportunities", opportunityRoutes);
// app.use("/api/pathways", pathwayRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/skill-passports", skillPassportRoutes);
app.use("/api/community-projects", communityProjectRoutes);
// app.use("/api/teacher-dashboard", teacherDashboardRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Prakash backend running at http://localhost:${PORT}`);
});