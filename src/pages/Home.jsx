import { useEffect, useState } from "react";
import { useRecruiterMode } from "../context/RecruiterContext";

import Hero from "../sections/Hero";
import SkillReactor from "../sections/SkillReactor";
import CommandConsole from "../sections/CommandConsole";
import ProjectDatabase from "../sections/ProjectDatabase";
import CoreEvolution from "../sections/CoreEvolution";
import AchievementWall from "../sections/AchievementWall";
import SecureTransmission from "../sections/SecureTransmission";
import InternshipDossier from "../sections/InternshipDossier";

import RecruiterPanel from "../components/recruiter/RecruiterPanel";
import RecruiterBoot from "../components/recruiter/RecruiterBoot";


import CommandTerminal from "../components/terminal/CommandTerminal";
import SectionReveal from "../components/animations/SectionReveal";

function Home() {
  const { recruiterMode, showBootScreen } = useRecruiterMode();
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setTerminalOpen(true);
      }
    };
    const openTerminal = () => setTerminalOpen(true);

    window.addEventListener("keydown", handler);
    window.addEventListener("omx:terminal", openTerminal);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("omx:terminal", openTerminal);
    };
  }, []);

  return (
    <>
      {showBootScreen && <RecruiterBoot />}

      {recruiterMode ? (
        <>
          <SectionReveal delay={0}>
            <RecruiterPanel />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <ProjectDatabase compact />
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <SkillReactor />
          </SectionReveal>
          <SectionReveal delay={0.45}>
            <InternshipDossier compact />
          </SectionReveal>
          <SectionReveal delay={0.6}>
            <SecureTransmission compact />
          </SectionReveal>
        </>
      ) : (
        <>
          <SectionReveal delay={0}>
            <Hero />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <CommandConsole />
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <ProjectDatabase />
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <SkillReactor />
          </SectionReveal>
          <SectionReveal delay={0.4}>
            <CoreEvolution />
          </SectionReveal>
          <SectionReveal delay={0.5}>
            <InternshipDossier />
          </SectionReveal>
          <SectionReveal delay={0.6}>
            <AchievementWall />
          </SectionReveal>
          <SectionReveal delay={0.7}>
            <SecureTransmission />
          </SectionReveal>
        </>
      )}

      {terminalOpen && <CommandTerminal onClose={() => setTerminalOpen(false)} />}
    </>
  );
}

export default Home;
