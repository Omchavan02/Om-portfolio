import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const responses = {
  help: [
    "COMMAND INDEX",
    "about | skills | projects | journey | internship | achievements",
    "resume | github | linkedin | contact | clear",
  ],
  about: [
    "OM SURENDRA CHAVAN",
    "Computer Engineering Student",
    "Full Stack Development / Java / Machine Learning",
  ],
  skills: ["ROUTING TO ENGINEERING ARSENAL...", "Frontend, Backend, Database, Programming, AI/ML, Tools, Core CS"],
  projects: ["OPENING PROJECT INTELLIGENCE CENTER...", "3 priority files loaded. Archive expansion available."],
  journey: ["OPENING CORE EVOLUTION...", "Timeline particle stream active."],
  internship: ["OPENING PROFESSIONAL EXPERIENCE COMMAND CENTER...", "Sapphire Infocom Pvt. Ltd. record verified."],
  achievements: ["OPENING ACHIEVEMENT VAULT...", "Mission records decrypted."],
  contact: ["OPENING ENERGY TRANSMISSION CENTER...", "Secure channels active."],
  github: ["OPENING GITHUB NODE..."],
  linkedin: ["OPENING LINKEDIN NODE..."],
  resume: ["OPENING RESUME FILE..."],
};

const routes = {
  skills: "skills-reactor",
  projects: "project-database",
  journey: "core-evolution",
  internship: "internship-dossier",
  achievements: "achievement-wall",
  contact: "secure-transmission",
};

function CommandConsole() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([
    "OM-X TERMINAL ONLINE",
    "AI command shell mounted after hero.",
    "Type 'help' to inspect available modules.",
  ]);
  const outputRef = useRef();

  const pushLogs = (items) => {
    setLogs((prev) => [...prev, ...items]);
    requestAnimationFrame(() => {
      outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const execute = (value = command) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return;

    if (normalized === "clear") {
      setLogs(["TERMINAL CLEARED", "Awaiting command input."]);
      setCommand("");
      return;
    }

    pushLogs([`> ${normalized}`, ...(responses[normalized] || ["UNKNOWN COMMAND", "Type 'help' for command index."])]);

    if (routes[normalized]) {
      document.getElementById(routes[normalized])?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (normalized === "github") window.open("https://github.com/Omchavan02", "_blank");
    if (normalized === "linkedin") window.open("https://linkedin.com/in/omchavan02", "_blank");
    if (normalized === "resume") window.open("/resume/om-surendra-chavan-resume.pdf", "_blank");

    setCommand("");
  };

  return (
    <section id="command-console" className="section-shell console-bg px-5 py-20 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 42, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-lg border border-cyan-500/25 bg-black/65 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-cyan-500/15 px-5 py-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">OM-X Terminal</p>
              <h2 className="text-2xl font-black text-white">Interactive Command System</h2>
            </div>
          </div>
          <div className="hidden gap-2 md:flex">
            {["projects", "skills", "resume", "contact"].map((item) => (
              <button key={item} onClick={() => execute(item)} className="rounded-full border border-cyan-500/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200 hover:bg-cyan-400/10">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div ref={outputRef} className="h-[320px] overflow-y-auto p-5 font-mono text-sm text-green-300">
          {logs.map((line, index) => (
            <motion.p key={`${line}-${index}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mb-2">
              {line}
            </motion.p>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            execute();
          }}
          className="border-t border-cyan-500/15 p-4"
        >
          <div className="flex items-center gap-3 rounded-md border border-cyan-500/20 bg-slate-950/80 px-4 py-3">
            <span className="animate-pulse font-mono text-cyan-300">&gt;</span>
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="Enter command..."
              className="w-full bg-transparent font-mono text-cyan-100 outline-none"
            />
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default CommandConsole;
