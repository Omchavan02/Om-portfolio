import { useState } from "react";
import { motion } from "framer-motion";
import skills from "../data/skills";
import EngineeringGenome from "../components/skills/EngineeringGenome";

// 6 ENGINEERING SECTOR POSITIONS (symmetric)
const nodePositions = [
  { left: "50%", top: "2%" }, // Top
  { left: "88%", top: "25%" }, // Top Right
  { left: "88%", top: "75%" }, // Bottom Right
  { left: "50%", top: "98%" }, // Bottom
  { left: "12%", top: "75%" }, // Bottom Left
  { left: "12%", top: "25%" }, // Top Left
];

function SkillReactor() {
  const groups = skills; // Always use 6 sectors
  const [activeCategory, setActiveCategory] = useState(groups[0]?.category);
  const activeGroup = groups.find((group) => group.category === activeCategory) || groups[0];

  return (
    <section id="skills-reactor" className="section-shell reactor-bg px-5 py-20 md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* PHASE 1: RENAMED SECTION */}
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-cyan-400">Engineering Dashboard</p>
        <h2 className="text-4xl font-black text-white md:text-5xl">Technology Intelligence Core</h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Select an engineering sector to view capability matrix, specializations, and project usage data.
        </p>

        <div className="mt-14 grid items-center gap-12 xl:grid-cols-[1fr_0.8fr]">
          {/* PHASE 2: INCREASED REACTOR SIZE BY ~20% */}
          <div className="relative mx-auto aspect-square w-full max-w-[710px]">
            <EngineeringGenome activeCategory={activeCategory} />

            {/* PHASE 3: 6 ENGINEERING SECTOR NODES */}
            {groups.map((group, index) => {
              const active = activeCategory === group.category;
              return (
                <button
                  key={group.category}
                  onClick={() => setActiveCategory(group.category)}
                  data-drone-scan={`${group.category} sector node`}
                  style={nodePositions[index]}
                  className={`reactor-node absolute min-w-36 -translate-x-1/2 -translate-y-1/2 border px-4 py-4 text-center transition-all duration-300 ${
                    active
                      ? "border-cyan-300 bg-cyan-400/20 text-cyan-50 shadow-[0_0_50px_rgba(0,229,255,0.4)]"
                      : "border-slate-700 bg-slate-950/90 text-slate-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-[0.2em] font-semibold">{group.category}</span>
                  <span className="mt-1 block text-[10px] text-slate-500">{group.items.length} technologies</span>
                </button>
              );
            })}
          </div>

          {/* PHASE 5: REDESIGNED RIGHT-SIDE INFORMATION PANEL */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-cyan-500/25 bg-slate-950/85 p-7 backdrop-blur-xl shadow-[0_0_80px_rgba(0,229,255,0.2)]"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Capability Matrix</p>
            <h3 className="mt-2 text-3xl font-black text-white">{activeGroup.category}</h3>

            {/* PRIMARY STACK */}
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-3">Primary Stack</p>
              <div className="flex flex-wrap gap-2">
                {activeGroup.primaryStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/12 border border-cyan-400/30 text-cyan-200 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* SPECIALIZATIONS */}
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-3">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {activeGroup.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* KEY METRICS: PROJECT USAGE, TECHNOLOGY COUNT, CONFIDENCE SCORE */}
            <div className="mt-7 grid grid-cols-3 gap-4 pt-5 border-t border-cyan-500/20">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Project Usage</p>
                <p className="text-3xl font-black text-cyan-300">{activeGroup.projectUsage}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Tech Count</p>
                <p className="text-3xl font-black text-cyan-300">{activeGroup.items.length}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Confidence</p>
                <p className="text-3xl font-black text-green-400">{activeGroup.confidenceScore}</p>
              </div>
            </div>

            {/* INDIVIDUAL TECHNOLOGY PROFICIENCIES */}
            <div className="mt-6 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Proficiency Levels</p>
              {activeGroup.items.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="skill-signal"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-100">{skill.name}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.06 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(0,229,255,0.9)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SkillReactor;
