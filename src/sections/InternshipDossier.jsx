import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, CheckCircle2, Cpu, MapPin } from "lucide-react";
import internships from "../data/internship";

function InternshipDossier({ compact = false }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const internship = internships[selectedIndex] || internships[0];

  return (
    <section id="internship-dossier" className={`section-shell experience-bg px-5 md:px-10 ${compact ? "py-14" : "py-20"}`}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-orange-300">
          {compact ? "Recruiter Dossier / Experience" : "Internship Dossier"}
        </p>
        <h2 className="text-4xl font-black text-white md:text-6xl">
          {compact ? "Verified Professional Experience" : "Professional Experience Command Center"}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Industry work record with role, deliverables, technologies, impact, and mission outcome.
        </p>

        {/* Experience Selector Tabs */}
        {internships.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {internships.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group flex items-center gap-3 rounded-lg border px-5 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
                  selectedIndex === index
                    ? "border-orange-400/60 bg-orange-500/10 text-orange-200 shadow-[0_0_25px_rgba(249,115,22,0.15)]"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-orange-500/30 hover:text-slate-200"
                }`}
              >
                <span className={`font-mono text-xs ${selectedIndex === index ? "text-orange-400" : "text-slate-500"}`}>
                  0{index + 1}
                </span>
                <span className="font-bold">{item.company}</span>
                <span className="hidden sm:inline text-[10px] text-slate-400">| {item.role}</span>
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="rounded-lg border border-orange-500/25 bg-slate-950/80 p-6 backdrop-blur flex flex-col justify-between">
              <div>
                <BriefcaseBusiness className="text-orange-300" size={38} />
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-orange-300">Role</p>
                <h3 className="mt-3 text-3xl font-black text-white">{internship.role}</h3>
                <p className="mt-3 text-xl text-cyan-200">{internship.company}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin size={18} className="text-cyan-300" /> {internship.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-green-300" /> {internship.duration} / {internship.status}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-md border border-green-400/20 bg-green-400/5 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-green-300">Mission Impact</p>
                <p className="mt-3 text-slate-300 leading-relaxed text-sm">{internship.outcome}</p>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Mission Overview</p>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">{internship.mission}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Deliverables</p>
                  <div className="mt-5 space-y-3">
                    {internship.responsibilities.map((item) => (
                      <div key={item} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-300" /> {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-purple-500/20 bg-slate-950/80 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-300">Technologies</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {internship.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-cyan-500/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                        <Cpu size={13} className="mr-1 inline" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default InternshipDossier;
