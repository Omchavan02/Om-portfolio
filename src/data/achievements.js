export const achievements = [
  {
    id: 1,
    title: "Java Programming",
    category: "Certification",
    issuer: "Professional Certification",
    date: "Completed",
    description: "Completed Java Programming certification.",
    details: [
      "Core Java",
      "Object Oriented Programming",
      "Exception Handling",
      "Collections",
    ],
    certificate: "/certificates/Om Java Certificate.pdf",
    thumbnail: "/certificates/thumbnails/java-thumb.png",
  },

  {
    id: 2,
    title: "Machine Learning",
    category: "Certification",
    issuer: "Professional Certification",
    date: "Completed",
    description: "Completed Machine Learning certification.",
    details: [
      "Data Analysis",
      "Scikit-Learn",
      "Regression",
      "Model Evaluation",
    ],
    certificate: "/certificates/Om Machine learning Certificate.pdf",
    thumbnail: "/certificates/thumbnails/ml-thumb.png",
  },

  {
    id: 3,
    title: "MERN Stack Development",
    category: "Certification",
    issuer: "Professional Certification",
    date: "Completed",
    description: "Completed MERN Stack Development certification.",
    details: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    certificate: "/certificates/Om Mernstack Certificate.pdf",
    thumbnail: "/certificates/thumbnails/mern-thumb.png",
  },

  {
    id: 4,
    title: "Sapphire Internship",
    category: "Certification",
    issuer: "Sapphire Infocom Pvt. Ltd.",
    date: "2025",
    description: "Successfully completed Software Developer Internship.",
    details: [
      "Worked on React frontend development",
      "Built REST APIs using Node.js and Express.js",
      "Integrated MongoDB database",
      "Implemented Google OAuth",
      "Integrated Cloudinary media storage",
    ],
    certificate: "/certificates/Om Sapphire cert.pdf",
    thumbnail: "/certificates/thumbnails/sapphire-thumb.png",
  },

  {
    id: 5,
    title: "KGCE Hackathon 2K25",
    category: "Hackathon",
    issuer: "Konkan Gyanpeeth College of Engineering",
    date: "2025",
    description: "Participated in KGCE Hackathon.",
    details: [
      "Hackathon Participant",
      "Team Collaboration",
      "Technical Problem Solving",
    ],
    certificate: "/certificates/Om KGCE hackthon Cert.pdf",
    thumbnail: "/certificates/thumbnails/kgce-thumb.png",
  },

  {
    id: 6,
    title: "ITM Hackathon",
    category: "Hackathon",
    issuer: "ITM",
    date: "2025",
    description: "Participated in ITM Hackathon.",
    details: [
      "Hackathon Participant",
      "Team Collaboration",
      "Technical Problem Solving",
    ],
    certificate: "/certificates/Om ITM Hackthon Cert.pdf",
    thumbnail: "/certificates/thumbnails/itm-thumb.png",
  },

  {
    id: 7,
    title: "Codealpha Internship",
    category: "Certification",
    issuer: "CodeAlpha",
    date: "1 July 2026 – 30 July 2026",
    description: "Completed Java Programming Internship at CodeAlpha.",
    details: [
      "Virtual Internship Program",
      "Java Programming",
      "Student Grade Tracker",
      "Hotel Reservation System",
      "Stock Trading Platform",
    ],
    certificate: "/certificates/Codealpha Internship.pdf",
    thumbnail: "/certificates/thumbnails/codealpha-thumb.png",
    issueDate: "12 August 2026",
    duration: "1 Month",
    internshipProjects: {
      language: "Java",
      items: [
        "Student Grade Tracker",
        "Hotel Reservation System",
        "Stock Trading Platform",
      ],
    },
  },

  {
    id: 8,
    title: "Academic Growth Record",
    category: "Academic",
    issuer: "Mumbai University",
    date: "2023 - 2026",
    description: "Mumbai University Academic Progress across Semesters I to VI.",
    details: [
      "Sem I - 6.33",
      "Sem II - 7.60",
      "Sem III - 8.43",
      "Sem IV - 7.58",
      "Sem V - 7.61",
      "Sem VI - 8.49",
    ],
    semesterData: [
      { sem: "Sem I", sgpi: 6.33, marks: "405 / 675", credits: 18, crGp: 114 },
      { sem: "Sem II", sgpi: 7.60, marks: "509 / 725", credits: 20, crGp: 152 },
      { sem: "Sem III", sgpi: 8.43, marks: "563 / 775", credits: 23, crGp: 194 },
      { sem: "Sem IV", sgpi: 7.58, marks: "523 / 775", credits: 24, crGp: 182 },
      { sem: "Sem V", sgpi: 7.61, marks: "543 / 775", credits: 23, crGp: 175 },
      { sem: "Sem VI", sgpi: 8.49 },
    ],
    thumbnail: "/certificates/thumbnails/academic-growth-thumb.png",
    certificates: [
      {
        title: "FY Engineering Marksheets",
        path: "/certificates/Om FY Engg Marksheets.pdf",
      },
      {
        title: "SY Engineering Marksheet",
        path: "/certificates/Om SY Engg marksheets.pdf",
      },
      {
        title: "TY Engineering Marksheet",
        path: "/certificates/Om TY Engg Marksheet.pdf",
      },
    ],
  },
];

export default achievements;
