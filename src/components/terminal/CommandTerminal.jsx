import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import terminalCommands from "./terminalCommands";

const bootHistory = [
  "OM-X MISSION CONTROL TERMINAL",
  "AI Command Interface Online",
  "Initializing Quantum Core...",
  "Loading Neural Network...",
  "Synchronizing Mission Database...",
  "Mission Control Online...",
  "",
  "Try: help, projects, skills, recruiter, jarvis, status",
];

const suggestions = ["help", "about", "projects", "skills", "resume", "contact", "recruiter", "jarvis"];

function CommandTerminal({ onClose }) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState(bootHistory);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef();
  const outputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    const handleEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const addOutput = (...lines) => setHistory((prev) => [...prev, ...lines, ""]);
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const executeCommand = (input = command) => {
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    addOutput(`> ${cmd}`);

    if (cmd === "help") {
      addOutput(
        "AVAILABLE COMMANDS:",
        "about | whoami | omx",
        "skills | projects | achievements | internship",
        "resume | contact | recruiter | status | jarvis",
        "goto projects | goto skills | goto achievements | goto contact",
        "clear"
      );
    } else if (["about", "whoami", "omx"].includes(cmd)) {
      addOutput("OM SURENDRA CHAVAN", "Computer Engineering Student", "Full Stack Developer", "Java + MERN + Machine Learning", "Availability: OPEN");
    } else if (cmd === "skills") {
      addOutput("ENGINEERING ARSENAL:", "Frontend: React, JavaScript, Tailwind", "Backend: Node.js, Express, REST APIs", "Database: MongoDB, MySQL", "AI/ML: Python, Pandas, NumPy, Scikit-Learn", "Tools: Git, GitHub, Postman, VS Code");
    } else if (cmd === "projects") {
      addOutput("PROJECT COMMAND CENTER:", "Agrove Farmer Management System", "Virtual Banking System", "House Price Predictor", "KGCE College Website", "Vajra Gym Website", "OM-X Portfolio");
      scrollToSection("project-database");
    } else if (cmd === "internship") {
      addOutput("SOFTWARE DEVELOPER INTERN", "Sapphire Infocom Pvt. Ltd.", "Worked on MERN application modules, APIs, authentication, and media workflows.");
    } else if (cmd === "achievements") {
      addOutput("ACHIEVEMENT VAULT:", "Internship record", "Hackathon participation", "Java certification", "MERN certification", "Machine Learning certification");
      scrollToSection("achievement-wall");
    } else if (cmd === "contact") {
      addOutput("CONTACT CHANNELS:", "Email: chavanom020104@gmail.com", "GitHub: github.com/Omchavan02", "LinkedIn: linkedin.com/in/omchavan02");
      scrollToSection("secure-transmission");
    } else if (cmd === "status") {
      addOutput("MISSION STATUS:", "Quantum Core: ONLINE", "Project Database: ONLINE", "AI Tactical Assistant: ONLINE", "Recruiter Briefing: READY", "Secure Transmission: ACTIVE");
    } else if (cmd === "jarvis") {
      addOutput("JARVIS PROTOCOL ACKNOWLEDGED", "Good evening. Candidate profile is verified, project database is indexed, and recruiter briefing is ready.");
    } else if (cmd === "recruiter") {
      addOutput("LAUNCHING EXECUTIVE BRIEFING INTERFACE...");
      document.querySelector("#recruiter-toggle")?.click();
    } else if (cmd === "resume") {
      window.open("/resume/om-surendra-chavan-resume.pdf", "_blank");
      addOutput("OPENING RESUME...");
    } else if (cmd === "clear") {
      setHistory(["TERMINAL CLEARED", "Type help for commands."]);
    } else if (cmd.startsWith("goto ")) {
      const section = cmd.replace("goto ", "");
      const target = terminalCommands[section] || section;
      scrollToSection(target);
      addOutput(`NAVIGATING TO ${section.toUpperCase()}`);
    } else if (terminalCommands[cmd]) {
      scrollToSection(terminalCommands[cmd]);
      addOutput("COMMAND EXECUTED");
    } else {
      addOutput("UNKNOWN COMMAND", "Type HELP for available commands.");
    }

    setCommand("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] bg-black/80 p-4 backdrop-blur-md">
      <div className="mx-auto mt-8 h-[86vh] max-w-5xl rounded-lg border border-cyan-500/25 bg-slate-950 p-5 shadow-[0_0_80px_rgba(0,229,255,0.25)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">Mission Control Console</p>
            <h2 className="mt-1 text-2xl font-bold text-white">OM-X Command Terminal</h2>
          </div>
          <button onClick={onClose} className="rounded-md border border-red-400/30 px-3 py-2 text-red-300 hover:bg-red-400/10">ESC</button>
        </div>

        <div ref={outputRef} className="mb-4 h-[56vh] overflow-y-auto rounded-lg border border-cyan-500/10 bg-black p-4 font-mono text-sm text-green-300">
          {history.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button key={item} onClick={() => executeCommand(item)} className="rounded-full border border-cyan-500/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/10">
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-cyan-500/20 bg-slate-900/70 px-4 py-3">
          <span className="animate-pulse font-bold text-cyan-400">&gt;</span>
          <input
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") executeCommand();
              if (e.key === "ArrowUp" && commandHistory.length) {
                const next = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(next);
                setCommand(commandHistory[commandHistory.length - 1 - next]);
              }
            }}
            placeholder="Enter command..."
            className="w-full bg-transparent font-mono text-cyan-200 outline-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CommandTerminal;
