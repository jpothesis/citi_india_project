
import { communityProjects } from "../data/communityProjectData.js";

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function toList(value) {
  return Array.isArray(value) ? value : [];
}

export function recommendCommunityProjects(student, limit = 3) {
  const interests = toList(student.interests).map(normalize);
  const strengths = toList(student.strengths).map(normalize);
  const skills = toList(student.skills).map(normalize);

  const rankedProjects = communityProjects.map((project) => {
    const keywords = project.suitableFor.map(normalize);

    const interestMatches = interests.filter((interest) =>
      keywords.some(
        (keyword) =>
          interest.includes(keyword) || keyword.includes(interest)
      )
    ).length;

    const strengthMatches = strengths.filter((strength) =>
      keywords.some(
        (keyword) =>
          strength.includes(keyword) || keyword.includes(strength)
      )
    ).length;

    const skillMatches = skills.filter((skill) =>
      project.suggestedSkills.some(
        (suggestedSkill) =>
          normalize(suggestedSkill) === skill
      )
    ).length;

    const score =
      interestMatches * 3 +
      strengthMatches * 2 +
      skillMatches;

    return {
      ...project,
      matchScore: score,
      matchReasons: [
        ...(interestMatches > 0 ? ["Matches your interests"] : []),
        ...(strengthMatches > 0 ? ["Builds on your strengths"] : []),
        ...(skillMatches > 0 ? ["Connects to your existing skills"] : []),
      ],
    };
  });

  rankedProjects.sort(
    (a, b) =>
      b.matchScore - a.matchScore ||
      a.title.localeCompare(b.title)
  );

  return rankedProjects.slice(0, Math.max(1, limit)).map((project) => ({
    ...project,
    explanation:
      project.matchScore > 0
        ? "Suggested using a simple match of your profile to this sample project."
        : "A general starter project you can explore; add more interests and skills for more relevant suggestions.",
  }));
}

export function getCommunityProjectCatalog() {
  return communityProjects;
}
