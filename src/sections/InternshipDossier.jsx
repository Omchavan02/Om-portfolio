import { motion } from "framer-motion";
import { BriefcaseBusiness, CheckCircle2, Cpu, MapPin } from "lucide-react";
import internships from "../data/internship";

function InternshipDossier({ compact = false }) {
  const internship = internships[0];

  return (
    <section id="internship-dossier" className="section-shell experience-bg px-5 py-20 md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-orange-300">Internship Dossier</p>
        <h2 className="text-4xl font-black text-white md:text-6xl">Professional Experience Command Center</h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Industry work record with role, deliverables, technologies, impact, and mission outcome.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-lg border border-orange-500/25 bg-slate-950/80 p-6 backdrop-blur">
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

            <div className="mt-6 rounded-md border border-green-400/20 bg-green-400/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-green-300">Mission Impact</p>
              <p className="mt-3 text-slate-300">{internship.outcome}</p>
            </div>
          </motion.div>

          <div className="grid gap-5">
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Mission Overview</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{internship.mission}</p>
            </motion.div>

            {!compact && (
              <div className="grid gap-5 md:grid-cols-2">
                <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Deliverables</p>
                  <div className="mt-5 space-y-3">
                    {internship.responsibilities.map((item) => (
                      <div key={item} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-300" /> {item}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-purple-500/20 bg-slate-950/80 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-300">Technologies</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {internship.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-cyan-500/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                        <Cpu size={13} className="mr-1 inline" /> {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InternshipDossier;
