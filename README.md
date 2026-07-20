# OM-X Mission Control

OM-X Mission Control is an interactive, premium developer portfolio designed as a futuristic mission control dashboard. Built to showcase technical skills, professional projects, academic achievements, internships, and engineering capabilities, it delivers an immersive sci-fi aesthetic paired with high-performance web standards.

---

## Overview

OM-X Mission Control reimagines the traditional developer portfolio as a command center interface. Developed with a high-fidelity dark UI, interactive 3D graphics, an autonomous assistant drone, and a command terminal, the platform is designed to instantly engage recruiters and engineers. It offers a specialized "Recruiter Mode" that filters out decorative graphics and boots into a highly functional, compact view for quick review of the candidate profile, core experience, projects, and contact channels.

---

## Features

- **Futuristic Mission Control UI**: A premium command center dashboard styling offering fluid page transitions, interactive grids, and high-tech typography.
- **Diagnostics Boot Sequence**: Sci-fi inspired grid system verification, console logs, and particle loading animation (with custom R3F rendering) during initial load. Accessible skipping via the `?skipBoot=1` query parameter.
- **Dual Operating Modes**:
  - **Standard Mode**: Full visual experience, featuring 3D animations, command console, full dossier, and interactive walls.
  - **Recruiter Mode**: Streamlined interface focusing on fast information delivery. Offers clean panels, compact listings of projects/internships, and quick actions for downloading the candidate resume.
- **Autonomous AI Drone Assistant**: An interactive helper (`AIDrone` and `DroneAssistant`) configured to answer text prompts (e.g., *who is om*, *skills*, *projects*, *internship*, *contact*) and automatically navigate to corresponding sections.
- **Keyboard-Accessible Command Terminal**: A retro command console terminal summoned with keybinds (`/` or `Ctrl + K`), supporting navigational commands (`projects`, `skills`, `internship`, `achievements`, `contact`).
- **Detailed Project Database**: Rich breakdown of academic and flagship projects detailing the problem statements, technical architectures, implemented challenges, and learnings.
- **Cloudinary-Hosted Video Streaming**: Real-time project previews and video demos streamed directly from Cloudinary CDN to optimize page load speeds.
- **3D Particle Scene**: Immersive interactive canvas integrating Three.js, React Three Fiber (R3F), and custom 3D models (such as the *OMX Recon Drone*).
- **Internship Dossier**: Dedicated section highlighting industrial experience, responsibilities, and outcomes during the candidate's software engineering internship.
- **Achievement Wall**: Grid wall showcasing certifications and career milestones.
- **Secure Contact Transmission**: Integrated communication panel supported by EmailJS for direct hiring inquiries.

---

## Tech Stack

### Frontend Core
- **React 19** - Single-page application framework
- **Vite 8** - Fast frontend toolchain and bundler
- **JavaScript** - Core programming logic
- **React Router DOM 7** - Declarative client-side routing

### Styling & Layout
- **Tailwind CSS v4** - Utility-first styling framework
- **Vanilla CSS** - Customized futuristic variables and background shaders

### 3D Graphics & Rendering
- **Three.js** - 3D WebGL rendering engine
- **React Three Fiber (R3F) 9** - React renderer wrapper for Three.js
- **Drei 10** - Collection of useful helpers for R3F scenes
- **OGL 1.0** - High-performance WebGL library integration

### Animations
- **Framer Motion 12** - Declarative UI animations and enter/exit states
- **GSAP (GreenSock Animation Platform) 3** - Performance-oriented scroll triggers and micro-animations

### Services & APIs
- **EmailJS** - Client-side form submissions to email inbox
- **Cloudinary** - Dynamic media hosting and video CDN optimization

### Utilities & Icons
- **Lucide React** - High-quality developer-oriented svg iconography

---

## Project Structure

```text
om-x-portfolio/
├── public/                 # Static assets, logos, and favicon
├── src/
│   ├── 3d/                 # Three.js / React Three Fiber scenes, models, and particles
│   ├── ai/                 # AI Drone Assistant logic, responses, and knowledge base
│   ├── components/         # Reusable UI elements (BootSequence, recruiter panel, terminal)
│   ├── context/            # React global context providers (RecruiterContext)
│   ├── data/               # Static datasets (projects, skills, journey, achievements)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layouts (MainLayout)
│   ├── pages/              # Page views (Home.jsx)
│   ├── routes/             # App Router configuration
│   ├── sections/           # Core page sections (Hero, SkillReactor, ProjectDatabase, etc.)
│   ├── styles/             # Stylesheets and custom animation utilities
│   ├── App.jsx             # Main application wrapper
│   ├── index.css           # Entry point stylesheet
│   └── main.jsx            # DOM mounting and React initialization
├── index.html              # HTML shell template
├── package.json            # Project manifest, scripts, and dependencies
└── vite.config.js          # Vite configuration file
```

---

## Installation

To set up and run OM-X Mission Control locally, make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omchavan02/Om-Portfolio.git
   ```

2. **Navigate to the project root:**
   ```bash
   cd om-x-portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).

---

## Build

To compile the application into static files optimized for production:

```bash
npm run build
```

This will run the Vite builder and generate a highly optimized bundle inside the `dist/` directory.

---

## Deployment

This project is optimized and ready for zero-configuration deployment on **Vercel**. 

- Import the repository to your Vercel Dashboard.
- Ensure the build command is configured as `npm run build` and output directory as `dist`.
- Click deploy.

---

## Highlights

- **Modular Architecture**: Clean separation of 3D rendering, AI interaction models, and UI layout components for maintainability.
- **Component-Based Design**: Extensible React architecture leveraging modular components that decouple layout logic from static datasets.
- **Responsive Layout**: Dynamically adjusts to screen dimensions with special compact modes designed for recruiter convenience on mobile platforms.
- **Cloudinary Media Optimization**: Heavy video walkthroughs and project previews are hosted and streamed from Cloudinary CDN to ensure near-instant page response times.
- **Productive Utilities & shortcuts**: Custom URL hooks like `?skipBoot=1` and hotkey commands (`/` or `Ctrl + K`) for instant navigation.
- **Clean Bundles**: Vite-optimized modular building structure ensuring minimal JavaScript execution footprint.

---

## About Me

**Om Surendra Chavan** is a Computer Engineering student based in Mumbai, Maharashtra, India. With graduation targeted for 2027, Om is a passionate software developer focused on Full Stack Development, Machine Learning, and designing modern, highly interactive web systems. He has hands-on industry experience from his Software Developer Internship at Sapphire Infocom Pvt. Ltd., where he contributed to production web platforms, integrated robust APIs, and refined relational and NoSQL database structures.

---

## Contact

- **Email**: [chavanom020104@gmail.com](mailto:chavanom020104@gmail.com)
- **LinkedIn**: [linkedin.com/in/omchavan02](https://linkedin.com/in/omchavan02)
- **GitHub**: [github.com/Omchavan02](https://github.com/Omchavan02)
- **Location**: Mumbai, Maharashtra, India

