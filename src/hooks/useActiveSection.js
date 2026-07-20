import { useEffect, useState } from "react";
import { useRecruiterMode } from "../context/RecruiterContext";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");
  const { recruiterMode } = useRecruiterMode();

  useEffect(() => {
    const sections = [
      "hero",
      "command-console",
      "project-database",
      "skills-reactor",
      "core-evolution",
      "internship-dossier",
      "achievement-wall",
      "secure-transmission",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-22% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.45],
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [recruiterMode]);

  return activeSection;
}
