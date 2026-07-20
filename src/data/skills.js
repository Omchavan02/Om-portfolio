export const skills = [
  {
    category: "Frontend",
    color: "cyan",
    specializations: ["React", "Interactive UI", "Responsive Design"],
    primaryStack: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    projectUsage: 5, // projects that use this
    confidenceScore: 93,
    items: [
      { name: "React", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },

  {
    category: "Backend",
    color: "purple",
    specializations: ["REST APIs", "Authentication", "Cloud Services"],
    primaryStack: ["Node.js", "Express.js", "REST APIs"],
    projectUsage: 4,
    confidenceScore: 85,
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "Google OAuth", level: 80 },
      { name: "Cloudinary", level: 80 },
    ],
  },

  {
    category: "Database",
    color: "orange",
    specializations: ["NoSQL", "Relational DBs", "Data Modeling"],
    primaryStack: ["MongoDB", "MySQL"],
    projectUsage: 5,
    confidenceScore: 87,
    items: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 88 },
    ],
  },

  {
    category: "Java",
    color: "yellow",
    specializations: ["OOP", "Core Java", "Problem Solving"],
    primaryStack: ["Java", "IntelliJ IDEA"],
    projectUsage: 2,
    confidenceScore: 90,
    items: [
      { name: "Java", level: 90 },
      { name: "OOP", level: 90 },
      { name: "Data Structures", level: 88 },
    ],
  },

  {
    category: "Machine Learning",
    color: "green",
    specializations: ["Data Analysis", "Predictive Modeling", "NLP"],
    primaryStack: ["Python", "Pandas", "NumPy", "Scikit-Learn"],
    projectUsage: 2,
    confidenceScore: 80,
    items: [
      { name: "Python", level: 85 },
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 80 },
      { name: "Scikit-Learn", level: 78 },
      { name: "NLP", level: 75 },
    ],
  },

  {
    category: "Tools",
    color: "pink",
    specializations: ["Version Control", "DevOps", "IDE Mastery"],
    primaryStack: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
    projectUsage: 6,
    confidenceScore: 89,
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "IntelliJ IDEA", level: 90 },
      { name: "Docker", level: 70 },
    ],
  },
];

export default skills;
