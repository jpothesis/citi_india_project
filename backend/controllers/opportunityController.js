import { opportunities } from "../data/opportunityData.js";

export function listOpportunities(req, res) {
  return res.json({
    success: true,
    count: opportunities.length,
    opportunities,
  });
}
