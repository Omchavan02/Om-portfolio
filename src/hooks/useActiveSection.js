import { useEffect, useRef, useState } from "react";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");
  const activeSectionRef = useRef("hero");

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
        let nextActiveSection = activeSectionRef.current;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id !== nextActiveSection) {
            nextActiveSection = entry.target.id;
          }
        });

        if (nextActiveSection !== activeSectionRef.current) {
          activeSectionRef.current = nextActiveSection;
          setActiveSection(nextActiveSection);
        }
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
  }, []);

  return activeSection;
}
