import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, Play, ShieldCheck } from "lucide-react";
import projects from "../data/projects";
import ProjectModal from "../components/projects/ProjectModal";

function ProjectDatabase({ compact = false }) {
  const featured = useMemo(() => projects.filter((project) => project.featured).slice(0, 3), []);
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(featured[0]?.id || projects[0]?.id);
  const [dossierOpen, setDossierOpen] = useState(false);
  const activeProject = projects.find((project) => project.id === activeId) || projects[0];
  const visibleProjects = compact || !expanded ? featured : projects;

  return (
    <section id="project-database" className="section-shell database-bg px-5 py-20 md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-cyan-400">Project Database</p>
          <h2 className="text-4xl font-black text-white md:text-6xl">Project Command Center</h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Classified engineering records with mission overview, stack, architecture decisions, challenges, and outcomes.
          </p>
        </motion.div>

        {!compact && (
          <div className="mb-12 grid gap-5 lg:grid-cols-3">
            {featured.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setActiveId(project.id)}
                className="group overflow-hidden rounded-lg border border-cyan-500/20 bg-slate-950/75 text-left transition hover:-translate-y-1 hover:border-cyan-300"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden">
                  {/* Thumbnail Background */}
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} thumbnail`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Dark Overlay (reduced darkness) */}
                  <div className="absolute inset-0 bg-black/45" />
                  {/* Preview Scan Button */}
                  <div className="relative z-10 rounded-full border border-cyan-300/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-200">
                    Preview Scan
                  </div>
                </div>
                <div className="p-5">
                  {project.id === 1 && (
                    <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1">
                      <span className="text-xs uppercase tracking-[0.25em] text-yellow-300">
                        Flagship Project
                      </span>
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-[0.25em] text-green-300">{project.status}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.35fr_1fr]">
          <div className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-4 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Mission Directory</p>
              {!compact && (
                <button
                  onClick={() => setExpanded((value) => !value)}
                  className="rounded-full border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/10"
                >
                  {expanded ? "Collapse Archive" : "Expand Database"}
                </button>
              )}
            </div>
            <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
              {visibleProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`w-full rounded-md border p-3 text-left transition ${
                    activeId === project.id
                      ? "border-cyan-300 bg-cyan-400/10"
                      : "border-slate-800 bg-slate-950/50 hover:border-cyan-500/40"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{project.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{project.category} / {project.year}</p>
                </button>
              ))}
            </div>
            {!expanded && !compact && (
              <p className="mt-4 rounded-md border border-orange-400/20 bg-orange-400/5 p-3 text-xs uppercase tracking-[0.18em] text-orange-200">
                {projects.length - featured.length} archived mission files hidden.
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-lg border border-cyan-500/20 bg-slate-950/80 backdrop-blur"
            >
              <div className="relative flex min-h-[360px] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18),transparent_48%)]">
                <div className="absolute inset-0 mission-grid opacity-40" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute h-56 w-56 rounded-full border border-dashed border-cyan-300/35" />
                <div className="relative rounded-lg border border-cyan-300/25 bg-black/40 px-8 py-6 text-center transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(0,229,255,0.22)]">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Loading Classified Project</p>
                  <h3 className="mt-4 text-3xl font-black text-white">{activeProject.title}</h3>
                  <p className="mt-3 text-sm text-slate-400">{activeProject.status}</p>
                </div>
              </div>
              <div className="grid gap-3 border-t border-cyan-500/10 p-4 md:grid-cols-3">
                <button onClick={() => setDossierOpen(true)} className="mission-button secondary"><Play size={16} /> Open Dossier</button>
                {activeProject.github && <a className="mission-button secondary" href={activeProject.github} target="_blank" rel="noreferrer"><GitBranch size={16} /> GitHub</a>}
                {activeProject.live && <a className="mission-button secondary" href={activeProject.live} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live Demo</a>}
                {!activeProject.github && <span className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-500">GitHub pending</span>}
                {!activeProject.live && <span className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-500">Demo pending</span>}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject.id}-intel`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-5 backdrop-blur"
            >
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="text-green-300" />
                <p className="text-xs uppercase tracking-[0.3em] text-green-300">Project Intelligence</p>
              </div>
              <h3 className="text-2xl font-bold text-white">{activeProject.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{activeProject.mission}</p>

              {[
                ["Architecture", activeProject.solution],
                ["Challenge", activeProject.challenge],
                ["Lessons / Outcome", activeProject.outcome],
              ].map(([label, value]) => (
                <div key={label} className="mt-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{value}</p>
                </div>
              ))}

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Tech Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan-500/20 px-3 py-1 text-xs text-cyan-100">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {dossierOpen && <ProjectModal project={activeProject} onClose={() => setDossierOpen(false)} />}
    </section>
  );
}

export default ProjectDatabase;
