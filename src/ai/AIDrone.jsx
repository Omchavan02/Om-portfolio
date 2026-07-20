import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MainScene from "../3d/scenes/MainScene";
import useActiveSection from "../hooks/useActiveSection";
import DroneMessage from "./DroneMessage";
import messages from "./messages";

const droneStates = {
  hero: { label: "IDENTITY VERIFIED", progress: 100, color: "#00e5ff", x: -30, y: -110 },
  "command-console": { label: "COMMAND LINK ACTIVE", progress: 82, color: "#38bdf8", x: -90, y: -45 },
  "project-database": { label: "MISSION FILES SCANNED", progress: 94, color: "#22c55e", x: -180, y: -90 },
  "skills-reactor": { label: "REACTOR SYNCHRONIZED", progress: 88, color: "#a855f7", x: -100, y: -150 },
  "core-evolution": { label: "ARCHIVE STREAM ACTIVE", progress: 76, color: "#f59e0b", x: -210, y: -55 },
  "internship-dossier": { label: "EXPERIENCE VERIFIED", progress: 91, color: "#fb923c", x: -80, y: -130 },
  "achievement-wall": { label: "VAULT INDEXED", progress: 97, color: "#facc15", x: -175, y: -75 },
  "secure-transmission": { label: "CHANNEL ENCRYPTED", progress: 100, color: "#34d399", x: -55, y: -115 },
};

function AIDrone() {
  const activeSection = useActiveSection();
  const current = droneStates[activeSection] || droneStates.hero;
  const currentMessages = messages[activeSection] || messages.hero;
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scanTarget, setScanTarget] = useState("");

  useEffect(() => {
    let frame;
    const handlePointer = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPointer({
          x: ((event.clientX / window.innerWidth) - 0.5) * 24,
          y: ((event.clientY / window.innerHeight) - 0.5) * 18,
        });
      });
    };
    const setHoveredTarget = (targetNode) => {
      const target = targetNode?.closest?.("button, a, [data-drone-scan]");
      setScanTarget(target?.dataset?.droneScan || target?.textContent?.trim().slice(0, 28) || "");
    };
    const handleHover = (event) => setHoveredTarget(event.target);
    const handleHoverOut = (event) => setHoveredTarget(event.relatedTarget);

    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("pointerover", handleHover);
    document.addEventListener("pointerout", handleHoverOut);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("pointerover", handleHover);
      document.removeEventListener("pointerout", handleHoverOut);
    };
  }, []);

  return (
    <motion.div
      animate={{ x: current.x + pointer.x, y: current.y + pointer.y }}
      transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.2 }}
      className="ai-drone pointer-events-none fixed z-50 h-[220px] w-[220px]"
      style={{ "--drone-color": current.color }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 1.5, -1.5, 0] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative h-full w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSection}-${scanTarget}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="drone-status absolute left-1/2 top-[182px] -translate-x-1/2 whitespace-nowrap"
          >
            {scanTarget ? `SCANNING / ${scanTarget.toUpperCase()}` : current.label}
          </motion.div>
        </AnimatePresence>

        <div className="drone-progress absolute left-1/2 top-[216px] w-[150px] -translate-x-1/2">
          <div className="mb-1 flex justify-between text-[9px] uppercase tracking-wider text-slate-500">
            <span>{scanTarget ? "Target" : "Section"}</span>
            <span style={{ color: current.color }}>{current.progress}%</span>
          </div>
          <div className="h-px bg-white/10">
            <motion.div
              animate={{ width: `${current.progress}%` }}
              className="h-full"
              style={{ background: current.color, boxShadow: `0 0 12px ${current.color}` }}
            />
          </div>
        </div>

        <DroneMessage key={activeSection} messages={currentMessages} />

        <AnimatePresence>
          {scanTarget && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.2], scaleY: 1 }}
              exit={{ opacity: 0 }}
              className="drone-scan-beam absolute left-1/2 top-[120px] h-36 w-24 -translate-x-1/2 origin-top"
            />
          )}
        </AnimatePresence>

        <motion.div
          key={`${activeSection}-scan`}
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 2.3, opacity: 0 }}
          transition={{ duration: 1.15 }}
          className="absolute left-1/2 top-[82px] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ border: `1px solid ${current.color}` }}
        />

        <div className="h-[182px] w-[220px]">
          <MainScene />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AIDrone;
