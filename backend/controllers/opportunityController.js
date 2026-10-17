import Opportunity from '../models/opportunityModel.js';

export const listOpportunities = async (req, res) => {
  try {
    // Fetch all opportunities from the MongoDB collection
    const opportunities = await Opportunity.find({});

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    console.error(`Error fetching opportunities: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch opportunities',
      error: error.message
    });
  }
};