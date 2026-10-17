import CommunityProject from '../models/communityProjectModel.js';

export const listCommunityProjects = async (req, res) => {
  try {
    const projects = await CommunityProject.find({});
    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(`Error fetching community projects: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch community projects',
      error: error.message
    });
  }
};

export const createCommunityProject = async (req, res) => {
  try {
    const project = await CommunityProject.create(req.body);
    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid community project data',
      error: error.message
    });
  }
};

export const getCommunityProject = async (req, res) => {
  try {
    const project = await CommunityProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found." });
    }
    return res.json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Invalid project ID or server error." });
  }
};