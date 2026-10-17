
const pathwayCatalog = [
    {
      id: "digital-skills",
      title: "Digital Skills and Technology",
      description:
        "Build confidence with computers, online tools, and basic digital work.",
      recommendedSkills: [
        "Computer fundamentals",
        "Internet and online safety",
        "Document and spreadsheet tools",
        "Digital communication",
      ],
      relatedInterests: ["technology", "computers", "digital", "coding"],
    },
    {
      id: "education",
      title: "Teaching and Community Learning",
      description:
        "Use communication and subject knowledge to help others learn.",
      recommendedSkills: [
        "Communication",
        "Subject fundamentals",
        "Explaining concepts",
        "Lesson planning",
      ],
      relatedInterests: [
        "teaching",
        "education",
        "helping others",
        "reading",
      ],
    },
    {
      id: "creative",
      title: "Creative and Communication Skills",
      description:
        "Explore content creation, storytelling, design, and communication.",
      recommendedSkills: [
        "Writing",
        "Visual design fundamentals",
        "Content creation",
        "Presentation skills",
      ],
      relatedInterests: [
        "art",
        "design",
        "writing",
        "drawing",
        "content",
        "creativity",
      ],
    },
    {
      id: "community",
      title: "Community Projects and Problem Solving",
      description:
        "Identify local needs and work with others on practical solutions.",
      recommendedSkills: [
        "Problem solving",
        "Teamwork",
        "Project planning",
        "Research and observation",
      ],
      relatedInterests: [
        "community",
        "social work",
        "environment",
        "leadership",
        "problem solving",
      ],
    },
  ];

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function toList(value) {
    return Array.isArray(value) ? value : [];
  }

  export function generatePathway(student) {
    const interests = toList(student.interests).map(normalize);
    const strengths = toList(student.strengths).map(normalize);
    const existingSkills = toList(student.skills).map(normalize);
    const goals = toList(student.careerGoals).map(normalize);

    const rankedPathways = pathwayCatalog.map((pathway) => {
      const keywords = pathway.relatedInterests;

      const interestMatches = interests.filter((item) =>
        keywords.some((keyword) => item.includes(keyword))
      ).length;

      const goalMatches = goals.filter((item) =>
        keywords.some((keyword) => item.includes(keyword))
      ).length;

      const strengthMatches = strengths.filter((item) =>
        keywords.some((keyword) => item.includes(keyword))
      ).length;

      return {
        ...pathway,
        matchScore:
          interestMatches * 3 + goalMatches * 4 + strengthMatches,
      };
    });

    rankedPathways.sort((a, b) => b.matchScore - a.matchScore);

    const selected = rankedPathways[0];
    const skillGaps = selected.recommendedSkills.filter(
      (skill) => !existingSkills.includes(normalize(skill))
    );

    return {
      studentId: student.id,
      pathway: {
        id: selected.id,
        title: selected.title,
        description: selected.description,
      },
      matchScore: selected.matchScore,
      skillGaps,
      learningPlan: skillGaps.map((skill, index) => ({
        step: index + 1,
        skill,
        action: `Start learning ${skill.toLowerCase()} through a beginner-friendly lesson and a small practical exercise.`,
      })),
      explanation:
        selected.matchScore > 0
          ? "This is a rule-based suggestion using the interests, goals, and strengths in your profile."
          : "Your profile has limited information, so this is a starting suggestion. Add interests and career goals to get a more relevant pathway.",
      generatedAt: new Date().toISOString(),
    };
  }

  export function getPathwayCatalog() {
    return pathwayCatalog.map(
      ({ id, title, description, recommendedSkills }) => ({
        id,
        title,
        description,
        recommendedSkills,
      })
    );
  }
