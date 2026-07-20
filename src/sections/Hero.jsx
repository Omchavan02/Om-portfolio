import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Terminal, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import projects from "../data/projects";
import skills from "../data/skills";


const roles = [
  "Computer Engineering Student",
  "Full Stack Developer",
  "AI Enthusiast",
  "Mission Control Architect",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const techCount = new Set(skills.flatMap((group) => group.items.map((skill) => skill.name))).size;

  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2300);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="section-shell hero-neural-bg min-h-[calc(100vh-90px)] px-5 py-12 md:px-10 flex items-center justify-center">
      <div className="hero-coordinates" aria-hidden="true"><span>19.0760 N</span><span>72.8777 E</span></div>

      <div className="relative z-10 mx-auto w-full max-w-[1350px]">
        <div className="grid items-center gap-12 xl:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT COLUMN: TEXT & INFO */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div className="system-kicker"><span /> IDENTITY NODE / OSC-0201</div>
            <h1 className="hero-title">
              <span>OM SURENDRA</span>
              <strong>CHAVAN</strong>
            </h1>
            <motion.p
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-role"
            >
              {roles[roleIndex]}
            </motion.p>
            <p className="hero-summary">
              I engineer full-stack products, Java systems, and machine-learning experiments. This interface is the live operating layer for that journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="mission-button" onClick={() => document.getElementById("project-database")?.scrollIntoView({ behavior: "smooth" })}>
                <Zap size={17} /> Enter Mission Database
              </button>
              <a className="mission-button secondary" href="/resume/om-surendra-chavan-resume.pdf" target="_blank" rel="noreferrer">
                <Download size={17} /> Resume
              </a>
              <button className="mission-button secondary" onClick={() => window.dispatchEvent(new CustomEvent("omx:terminal"))}>
                <Terminal size={17} /> Command
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: HUMAN OPERATOR CORE V3 */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hero-reactor hero-identity-scanner relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Crosshair Background */}
              <div className="reactor-crosshair opacity-50" />

              {/* PHASE 1: LAYERED SCANNER RINGS (OUTER TO INNER) */}

              {/* LAYER 7 - OUTER ENERGY RING */}
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.01, 1] }}
                transition={{ rotate: { duration: 48, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute w-[130%] h-[130%] rounded-full border border-cyan-400/25 shadow-[0_0_100px_rgba(0,229,255,0.25)]"
              />

              {/* LAYER 6 - ORBIT RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                className="reactor-ring ring-a absolute w-[118%] h-[118%]"
              />

              {/* LAYER 5 - PULSE RING */}
              <motion.div
                animate={{
                  scale: [0.98, 1.02, 0.98],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[8%] rounded-full border border-purple-400/40 shadow-[0_0_60px_rgba(168,85,247,0.3)]"
              />

              {/* LAYER 4 - BIOMETRIC RING */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="reactor-ring ring-b absolute w-[105%] h-[105%]"
              />

              {/* LAYER 3 - SCANNER RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="reactor-ring ring-c absolute w-[92%] h-[92%]"
              />

              {/* LAYER 2 - INNER GLOW RING */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(0,229,255,0.35)",
                    "0 0 70px rgba(0,229,255,0.55)",
                    "0 0 40px rgba(0,229,255,0.35)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[20%] rounded-full border-2 border-cyan-400/70"
              />

              {/* PROFILE IMAGE - CROPPED & CENTERED PERFECTLY */}
              <div className="relative z-20 w-[62%] h-[62%] rounded-full overflow-hidden border-[5px] border-cyan-400/80 shadow-[0_0_100px_rgba(0,229,255,0.65)]">
                <img
                  src="/images/profile-main.jpeg"
                  alt="Om Surendra Chavan"
                  className="w-full h-full object-cover object-[center_20%]"
                />

                {/* SCAN SWEEP EFFECT (CYAN GRADIENT) */}
                <motion.div
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                />

                {/* SOFT INNER GLOW */}
                <div className="absolute inset-0 bg-cyan-400/15" />

                {/* GLOSS OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              </div>

              {/* PHASE 3: HUD LABELS AROUND PROFILE (MINIMAL, PREMIUM) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* TOP - IDENTITY VERIFIED */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.45em] text-green-400 font-semibold">IDENTITY VERIFIED</p>
                </motion.div>

                {/* RIGHT - FULL STACK DEVELOPER */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute right-[2%] top-1/2 -translate-y-1/2 text-right"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">FULL STACK DEVELOPER</p>
                </motion.div>

                {/* BOTTOM - MISSION STATUS ACTIVE */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center"
                >
                  <p className="text-xs uppercase tracking-[0.45em] text-cyan-400 font-semibold">MISSION STATUS ACTIVE</p>
                </motion.div>

                {/* LEFT - MUMBAI UNIVERSITY */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute left-[2%] top-1/2 -translate-y-1/2 text-left"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-semibold">MUMBAI UNIVERSITY</p>
                </motion.div>

                {/* CENTER CANDIDATE DETECTED */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-[25%] flex items-center justify-center pointer-events-none"
                >
                  <p className="text-[9px] uppercase tracking-[0.5em] text-cyan-400/50">CANDIDATE DETECTED</p>
                </motion.div>
              </div>

              {/* PHASE 2: REDUCED OM-X CORE (SUBTLE, NOT COMPETING) */}
              <div className="reactor-core hero-ai-core opacity-70 scale-90">
                <span className="text-[13px]">OM-X</span>
                <small className="text-[9px] tracking-[0.3em]">AI CORE</small>
              </div>
            </motion.div>

            {/* PHASE 4: ADVANCED HOVER DOSSIER PANEL (CLASSIFIED PERSONNEL FILE) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.85, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 50, scale: 0.85, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-full top-1/2 ml-10 -translate-y-1/2 w-[320px] glass-panel rounded-2xl border border-cyan-500/50 bg-slate-950/85 p-7 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,229,255,0.4)]"
                >
                  {/* Hologram Sweep */}
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent pointer-events-none z-10"
                  />

                  <div className="relative z-20">
                    <div className="mb-5 border-b border-cyan-500/30 pb-4">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.5em] text-cyan-400">
                        CLASSIFIED PERSONNEL FILE
                      </p>
                      <h3 className="text-2xl font-black text-white">
                        OM SURENDRA CHAVAN
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Primary Role</p>
                          <p className="text-cyan-300 font-semibold text-sm">Computer Engineering Student</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Secondary Role</p>
                          <p className="text-cyan-200 font-semibold text-sm">Full Stack Developer</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Institution</p>
                        <p className="text-white font-medium text-sm">Mumbai University</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Internship</p>
                        <p className="text-green-400 font-semibold text-sm">Completed</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cyan-500/20">
                        <div className="bg-cyan-500/12 rounded-xl p-4 border border-cyan-500/25">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Projects</p>
                          <p className="text-2xl font-black text-cyan-300">{projects.length}</p>
                        </div>
                        <div className="bg-cyan-500/12 rounded-xl p-4 border border-cyan-500/25">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1">Technologies</p>
                          <p className="text-2xl font-black text-cyan-300">{techCount}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cyan-500/20">
                        <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-2.5 text-xs text-green-400 font-bold">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                          Available For Opportunities
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <a href="#command-console" className="hero-scroll absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span>SCROLL TO DESCEND</span><ArrowDown size={16} />
      </a>
    </section>
  );
}

export default Hero;
