import { motion, AnimatePresence } from 'framer-motion';

const phases = {
  1: {
    title: "INITIALIZING SYSTEM...",
    subtitle: "Core systems offline"
  },
  2: {
    title: "POWER CORE ONLINE",
    subtitle: "Energy stabilization in progress"
  },
  3: {
    title: "BUILDING NEURAL NETWORK",
    subtitle: "AI SYSTEMS ACTIVATING"
  },
  4: {
    title: "AI DRONE DEPLOYED",
    subtitle: "RECON SYSTEM ONLINE"
  },
  5: {
    title: "IDENTITY VERIFIED",
    subtitle: "OM SURNDRA CHAVAN"
  },
  6: {
    title: "PORTFOLIO DATABASE LOADING",
    subtitle: "Accessing mission archives"
  },
  7: {
    title: "MISSION CONTROL ONLINE",
    subtitle: "WELCOME BACK COMMANDER"
  }
};

const modules = [
  "Loading Projects Database",
  "Loading Technology Matrix",
  "Loading Experience Records",
  "Loading Mission Archive",
  "Loading Recruiter Interface",
  "Loading AI Assistant"
];

const BootUI = ({ phase }) => {
  const current = phases[phase] || phases[1];

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* HUD Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#00ffff]/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-[#00ffff]/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-[#00ffff]/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-[#00ffff]/30" />

      {/* Main Text Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-[#00ffff] font-mono text-xs tracking-[0.5em] mb-2 uppercase">
            {current.subtitle}
          </h2>
          <h1 className="text-white font-mono text-4xl md:text-6xl font-bold tracking-tighter uppercase">
            {current.title}
          </h1>
          
          {phase === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-[#00ffff]/80 font-mono text-sm uppercase tracking-widest"
            >
              COMPUTER ENGINEERING STUDENT<br />
              MISSION CONTROL ACCESS GRANTED
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Database Modules (Phase 6) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-10">
        <AnimatePresence>
          {phase === 6 && (
            <div className="grid grid-cols-1 gap-2">
              {modules.map((module, i) => (
                <motion.div
                  key={module}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-[#00ffff]/5 border border-[#00ffff]/20 p-2 rounded"
                >
                  <div className="w-2 h-2 bg-[#00ffff] animate-pulse" />
                  <span className="text-[#00ffff] font-mono text-[10px] uppercase tracking-wider">
                    {module}
                  </span>
                  <div className="ml-auto text-[#00ffff] font-mono text-[10px]">
                    DONE
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
};

export default BootUI;
