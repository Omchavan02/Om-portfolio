import { motion } from "framer-motion";

const genomeProfiles = {
  Frontend: { color: "#22d3ee", glow: "rgba(34,211,238,0.72)", nodes: ["React", "JavaScript", "Tailwind", "HTML", "CSS"] },
  Backend: { color: "#34d399", glow: "rgba(52,211,153,0.72)", nodes: ["Node.js", "Express", "JWT", "MongoDB", "REST APIs"] },
  Database: { color: "#f59e0b", glow: "rgba(245,158,11,0.72)", nodes: ["MongoDB", "MySQL", "Schemas", "Modeling"] },
  Java: { color: "#facc15", glow: "rgba(250,204,21,0.68)", nodes: ["Java", "OOP", "DSA", "IntelliJ"] },
  "Machine Learning": { color: "#c084fc", glow: "rgba(192,132,252,0.72)", nodes: ["Python", "OpenCV", "TensorFlow", "Scikit"] },
  Tools: { color: "#dbeafe", glow: "rgba(219,234,254,0.72)", nodes: ["Git", "VS Code", "Postman", "Docker"] },
};

const nodePositions = [
  [38, 17], [62, 27], [36, 43], [64, 56], [39, 73],
];

function EngineeringGenome({ activeCategory }) {
  const profile = genomeProfiles[activeCategory] || genomeProfiles.Frontend;
  const strandA = "M42 9 C62 20 62 35 42 50 C22 65 22 80 42 91";
  const strandB = "M58 9 C38 20 38 35 58 50 C78 65 78 80 58 91";

  return (
    <motion.div
      animate={{ rotate: [0, 1.8, 0, -1.8, 0], scale: [0.985, 1.01, 0.985] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-[14%]"
      aria-label={`${activeCategory} engineering genome`}
    >
      <motion.div
        animate={{ opacity: [0.35, 0.72, 0.35], scale: [0.9, 1.06, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[20%] rounded-full"
        style={{ background: `radial-gradient(circle, ${profile.glow.replace("0.72", "0.18").replace("0.68", "0.18")} 0%, transparent 68%)` }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" role="presentation">
        <defs>
          <filter id="genome-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.25" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="genome-energy" x1="0" x2="1">
            <stop offset="0" stopColor={profile.color} stopOpacity="0.18" />
            <stop offset="0.5" stopColor={profile.color} stopOpacity="1" />
            <stop offset="1" stopColor="#c084fc" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {[18, 32, 46, 60, 74, 87].map((y) => (
          <motion.line
            key={y}
            x1={y === 46 || y === 87 ? 35 : 39}
            y1={y}
            x2={y === 46 || y === 87 ? 65 : 61}
            y2={y}
            animate={{ opacity: [0.25, 0.92, 0.25] }}
            transition={{ duration: 2.8, delay: y / 140, repeat: Infinity, ease: "easeInOut" }}
            stroke={profile.color}
            strokeWidth="0.42"
          />
        ))}
        <path d={strandA} fill="none" stroke="url(#genome-energy)" strokeWidth="1.05" filter="url(#genome-glow)" />
        <path d={strandB} fill="none" stroke="url(#genome-energy)" strokeWidth="1.05" filter="url(#genome-glow)" />
        <path d={strandA} fill="none" stroke={profile.color} strokeOpacity="0.45" strokeWidth="0.22" />
        <path d={strandB} fill="none" stroke="#c084fc" strokeOpacity="0.32" strokeWidth="0.22" />

        {[strandA, strandB, strandA, strandB].map((path, index) => (
          <circle key={`${path}-${index}`} r={index < 2 ? "1.05" : "0.62"} fill={profile.color} filter="url(#genome-glow)">
            <animateMotion dur={`${5.5 + index * 0.7}s`} repeatCount="indefinite" path={path} begin={`${index * -1.5}s`} />
          </circle>
        ))}
      </svg>

      <motion.div
        animate={{ y: [-2, 2, -2], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 z-10 w-28 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <strong className="block text-base text-white">OM-X</strong>
        <span className="mt-1 block text-[7px] font-semibold tracking-[0.25em] text-cyan-200">ENGINEERING GENOME</span>
        <span className="mt-1 block text-[7px] tracking-[0.28em]" style={{ color: profile.color }}>SYSTEM ONLINE</span>
      </motion.div>

      {profile.nodes.map((node, index) => {
        const [left, top] = nodePositions[index] || nodePositions[0];
        return (
          <motion.div
            key={node}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.42, 1, 0.42], scale: [0.82, 1.08, 0.82] }}
            transition={{ duration: 2.5, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-default"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: profile.color, boxShadow: `0 0 10px ${profile.glow}` }} />
            <span className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-[7px] uppercase tracking-[0.14em] text-slate-300 opacity-35 transition-opacity duration-200 group-hover:opacity-100">
              {node}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default EngineeringGenome;
