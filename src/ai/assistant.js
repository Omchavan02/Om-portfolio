import KNOWLEDGE from "./knowledge";
import { RESPONSES } from "./responses";

function executeCommand(command) {
  const query = command.toLowerCase().trim();

  if (
    query.includes("who is om") ||
    query.includes("about") ||
    query.includes("about om")
  ) {
    return {
      type: "response",
      message: `
${KNOWLEDGE.name}

${KNOWLEDGE.about}

Role:
${KNOWLEDGE.role}

Location:
${KNOWLEDGE.location}
      `,
    };
  }

  if (
    query.includes("skills") ||
    query.includes("tech stack")
  ) {
    return {
      type: "navigate",
      target: "skills-reactor",
      message: `
Engineering Arsenal

${KNOWLEDGE.skills.join(", ")}
      `,
    };
  }

  if (
    query.includes("projects") ||
    query.includes("project")
  ) {
    return {
      type: "navigate",
      target: "project-database",
      message: `
Mission Projects

${KNOWLEDGE.projects.join("\n")}
      `,
    };
  }

  if (
    query.includes("internship") ||
    query.includes("experience")
  ) {
    return {
      type: "navigate",
      target: "internship-dossier",
      message: `
Internship Dossier

Company:
${KNOWLEDGE.internship.company}

Role:
${KNOWLEDGE.internship.role}

Duration:
${KNOWLEDGE.internship.duration}
      `,
    };
  }

  if (
    query.includes("achievement") ||
    query.includes("certificate")
  ) {
    return {
      type: "navigate",
      target: "achievement-wall",
      message: "Achievement Wall Loaded.",
    };
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("linkedin") ||
    query.includes("github")
  ) {
    return {
      type: "navigate",
      target: "secure-transmission",
      message: `
Secure Transmission

Email:
${KNOWLEDGE.contact.email}

GitHub:
${KNOWLEDGE.contact.github}

LinkedIn:
${KNOWLEDGE.contact.linkedin}
      `,
    };
  }

  if (query.includes("education")) {
    return {
      type: "response",
      message: RESPONSES.education,
    };
  }

  if (query.includes("resume")) {
  window.open(
    "/resume/om-surendra-chavan-resume.pdf",
    "_blank"
  );

  return {
    type: "response",
    message:
      "Opening candidate resume dossier...",
  };
}

  if (query.includes("help")) {
    return {
      type: "response",
      message: RESPONSES.help,
    };
  }

  return {
    type: "response",
    message: RESPONSES.unknown,
  };
}

export default executeCommand;