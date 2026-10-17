import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Opportunity from './models/opportunityModel.js';
import CommunityProject from './models/communityProjectModel.js';

dotenv.config();
connectDB();

const mockOpportunities = [
  {
    title: "Community Teaching Assistant",
    category: "Education",
    description: "Help younger students practice foundational skills.",
    type: "community-project",
    status: "sample",
    verified: false,
    eligibility: "Suitable for students interested in teaching.",
  },
  {
    title: "Digital Skills Learner",
    category: "Technology",
    description: "Build basic digital skills through guided practice.",
    type: "learning",
    status: "sample",
    verified: false,
    eligibility: "Beginner-friendly; basic digital access recommended.",
  },
  {
    title: "Local Problem-Solving Project",
    category: "Community",
    description: "Develop a project addressing a local community need.",
    type: "community-project",
    status: "sample",
    verified: false,
    eligibility: "Open to students interested in community improvement.",
  },
];

const mockCommunityProjects = [
  {
    title: "Digital Literacy for the Community",
    description: "Help community members practise basic computer, internet, and online safety skills.",
    category: "Technology",
    suitableFor: ["technology", "computers", "teaching", "education"],
    suggestedSkills: ["Computer fundamentals", "Communication", "Internet and online safety"],
    difficulty: "Beginner",
    estimatedDuration: "1-2 weeks",
    type: "sample",
    verified: false,
  },
  {
    title: "Peer Learning Circle",
    description: "Organize small study sessions where students explain concepts and learn together.",
    category: "Education",
    suitableFor: ["teaching", "education", "reading", "helping others"],
    suggestedSkills: ["Communication", "Teamwork", "Lesson planning"],
    difficulty: "Beginner",
    estimatedDuration: "1 week",
    type: "sample",
    verified: false,
  }
];

const importData = async () => {
  try {
    // Clear out existing data to prevent duplicates
    await Opportunity.deleteMany();
    await CommunityProject.deleteMany();

    // Insert the mock data arrays
    await Opportunity.insertMany(mockOpportunities);
    await CommunityProject.insertMany(mockCommunityProjects);

    console.log('Database successfully seeded with Opportunities and Community Projects!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

importData();