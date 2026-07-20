export const projects = [
  {
    id: 1,
    title: "Agrove – Farmer Management System",
    year: "2025",
    status: "Deployment Under Maintenance",
    category: "Flagship Project",
    featured: true,
    mission:
      "A full-stack MERN application built for modern agricultural management. It helps farmers efficiently manage crops, expenses, user authentication, and farm records through a centralized platform.",
    description:
      "A full-stack MERN application built for modern agricultural management.",
    problem:
      "Traditional farm management relies on manual records and disconnected systems. Agrove digitizes crop tracking, expense management, and user operations in a centralized platform.",
    architecture: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT Authentication"],
    features: ["User Authentication", "Secure Login", "Crop Management", "Expense Tracking", "Cloud Image Upload", "Responsive Dashboard", "Profile Management"],
    challenges: ["Designing scalable CRUD operations", "Cloudinary media handling", "Secure authentication", "Responsive dashboard", "Database relationships"],
    learnings: ["MERN Architecture", "REST APIs", "Authentication", "MongoDB Modeling", "State Management", "Production Deployment"],
    challenge:
      "Traditional farm management relies on manual records and disconnected systems.",
    solution:
      "Centralized crop tracking, expense management, user authentication, and cloud media workflows.",
    outcome:
      "Built practical MERN, REST API, authentication, MongoDB modeling, state management, and deployment experience.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "JWT",
    ],
    github: "https://github.com/Omchavan02/Agrove",
    live: "https://agrove-six.vercel.app",
    thumbnail: "/projects/agrove/agrove-thumbnail.png",
    gallery: [
      "/projects/agrove/agrove-home.png",
      "/projects/agrove/agrove-dashboard.png",
      "/projects/agrove/agrove-crops.png",
      "/projects/agrove/agrove-profile.png",
    ],
    galleryCaptions: ["Landing Page", "Admin Dashboard", "Crop Management", "User Profile"],
    videos: ["https://res.cloudinary.com/dl2kpp6kb/video/upload/v1784537400/agrove-video_gwvfbb.mp4"],
  },

  {
    id: 2,
    title: "Vajra Gym",
    year: "2025",
    status: "Completed",
    category: "Full Stack",
    featured: true,
    mission:
      "Create a fitness platform providing workout, yoga and wellness resources.",
    description:
      "Fitness platform containing workout information, yoga guides and exercise resources.",
    challenge:
      "Organizing fitness content into a structured and user-friendly experience.",
    solution:
      "Built a React website integrated with EmailJS and responsive UI design principles.",
    outcome:
      "Created an accessible platform for fitness guidance and wellness education.",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    github: "https://github.com/Omchavan02/vajra-gym.git",
    live: "https://vajra-gym.vercel.app",
    thumbnail: "/projects/vajra/Vajra Thumbnail.png",
    gallery: [
      "/projects/vajra/Vajra Workouts.png",
      "/projects/vajra/Vajra admin panel.png",
      "/projects/vajra/Vajra before login.png",
      "/projects/vajra/Vajra yoga.png",
    ],
    videos: [
      "https://res.cloudinary.com/dl2kpp6kb/video/upload/v1784537482/Vajra_Gym_video_pjf28t.mp4",
    ],
  },

  {
    id: 3,
    title: "ATS Optimizer",
    year: "2025",
    status: "Completed",
    category: "Machine Learning",
    featured: true,
    mission:
      "Optimize resumes for ATS (Applicant Tracking Systems) using machine learning techniques.",
    description:
      "Tool that analyzes resumes and provides recommendations to improve ATS compatibility.",
    challenge:
      "Understanding ATS algorithms and developing accurate parsing and scoring mechanisms.",
    solution:
      "Developed an ML-based application with Flask backend and NLP techniques.",
    outcome:
      "Created a tool that helps users improve their resume's chances of passing ATS filters.",
    tech: [
      "Machine Learning",
      "Python",
      "NLP",
      "Flask",
    ],
    github: "https://github.com/Omchavan02/ats-optimizer.git",
    live: "https://ats-optimizer-six.vercel.app",
    thumbnail: "/projects/ATS/ATS thumbnail.png",
    gallery: [
      "/projects/ATS/ATS career resource.png",
      "/projects/ATS/ATS check.png",
    ],
    videos: [
      "https://res.cloudinary.com/dl2kpp6kb/video/upload/v1784536884/ATS_video_s9czbq.mp4",
    ],
  },

  {
    id: 4,
    title: "KGCE College Website",
    year: "2025",
    status: "Completed",
    category: "Full Stack",
    featured: false,
    mission:
      "Build a modern digital presence for Konkan Gyanpeeth College of Engineering.",
    description:
      "College website with information modules, communication channels and responsive UI.",
    challenge:
      "Creating a professional educational website with inquiry and communication functionality.",
    solution:
      "Developed a React-based website integrated with EmailJS for communication workflows.",
    outcome:
      "Delivered a modern college website experience with responsive design and contact capabilities.",
    tech: [
      "React",
      "Firebase",
      "Responsive UI",
    ],
    github: "https://github.com/Omchavan02/kgce-college-website.git",
    live: "https://kgce-college-website-sjet-i8k3iibo7.vercel.app",
    thumbnail: "/projects/kgce/kgce thumbnail.png",
    gallery: [
      "/projects/kgce/kgce coruse.png",
      "/projects/kgce/kgce staff.png",
    ],
    videos: [
      "https://res.cloudinary.com/dl2kpp6kb/video/upload/v1784536634/KGCE_video_wdkyey.mp4",
    ],
  },

  {
    id: 5,
    title: "House Price Predictor",
    year: "2025",
    status: "Completed",
    category: "Machine Learning",
    featured: false,
    mission:
      "Predict house prices using machine learning algorithms and housing datasets.",
    description:
      "Machine learning model for predicting house prices using Bangalore housing data.",
    challenge:
      "Cleaning and preparing large housing datasets for accurate predictions.",
    solution:
      "Applied preprocessing techniques and machine learning algorithms using Scikit-Learn.",
    outcome:
      "Built a predictive model capable of estimating housing prices based on input parameters.",
    tech: [
      "Machine Learning",
      "Python",
      "Scikit-Learn",
      "Streamlit",
    ],
    github: "https://github.com/Omchavan02/house-price-predictor.git",
    live: "https://house-price-predictor-ten-rust.vercel.app",
    thumbnail: "/projects/house-price/HP thumbnail.png",
    gallery: [
      "/projects/house-price/HP emi calci.png",
      "/projects/house-price/HP predictor.png",
      "/projects/house-price/HP properties.png",
    ],
    videos: [
      "https://res.cloudinary.com/dl2kpp6kb/video/upload/v1784536855/House_Price_Predictor_video_bex0hv.mp4",
    ],
  },
];

export default projects;
