import { motion } from "framer-motion";
import { Download, GitBranch, Mail, Network, Rocket, CheckCircle, Clock } from "lucide-react";
import projects from "../../data/projects";
import skills from "../../data/skills";
import achievements from "../../data/achievements";
import internships from "../../data/internship";

const quickLinks = [
  { label: "Resume", href: "/resume/om-surendra-chavan-resume.pdf", icon: Download },
  { label: "GitHub", href: "https://github.com/Omchavan02", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/in/omchavan02", icon: Network },
  { label: "Contact", href: "mailto:chavanom020104@gmail.com", icon: Mail },
];

function RecruiterPanel() {
  const topProjects = projects.filter((project) => project.featured).slice(0, 3);
  const skillSnapshot = skills.slice(0, 6);
  const techCount = new Set(skills.flatMap((group) => group.items.map((skill) => skill.name))).size;

  const metrics = [
    { label: "Projects Built", value: projects.length },
    { label: "Technologies Learned", value: techCount },
    { label: "Internships Completed", value: internships.length },
    { label: "Certificates Earned", value: achievements.filter((item) => item.category === "Certification").length },
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="hero" className="section-shell recruiter-briefing-bg min-h-[calc(100vh-90px)] px-5 py-12 md:px-10">
      <div className="recruiter-status-strip relative z-10 mx-auto mb-5 flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
        <span><i /> EXECUTIVE BRIEFING ACTIVE</span>
        <span>REVIEW PATH / PROFILE / PROOF / STACK / CONTACT</span>
        <strong>EST. READ TIME 15 SEC</strong>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-cyan-500/20 bg-slate-950/80 p-6 backdrop-blur">
          <div className="flex flex-col gap-6 sm:flex-row">
            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              src="/images/profile-main.jpeg"
              alt="Om Surendra Chavan"
              className="h-44 w-44 rounded-lg border border-cyan-400/30 object-cover object-[center_10%] shadow-[0_0_30px_rgba(0,229,255,0.12)]"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-green-300">Executive Briefing Interface</p>
              <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">Om Surendra Chavan</h1>
              <p className="mt-3 text-lg text-cyan-200">Computer Engineering Student / Full Stack Developer</p>
              <p className="mt-2 text-slate-400">Available for internship and entry-level software engineering opportunities.</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* Availability */}
                <div className="rounded-md border border-green-500/20 bg-green-500/5 p-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-green-300">Availability</p>
                    <p className="text-sm font-semibold text-white">Open to Hire</p>
                  </div>
                </div>
                {/* Response Time */}
                <div className="rounded-md border border-cyan-500/20 bg-cyan-500/5 p-3 flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Response Time</p>
                    <p className="text-sm font-semibold text-white">&lt; 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer" className="mission-button justify-center">
                  <Icon size={17} /> {item.label}
                </a>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-green-400/20 bg-green-400/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-green-300">Recruiter Fast Track</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Top Projects", "project-database"],
                ["Skills", "skills-reactor"],
                ["Experience", "internship-dossier"],
                ["Contact", "secure-transmission"],
              ].map(([label, id]) => (
                <button key={label} onClick={() => scrollTo(id)} className="rounded-md border border-cyan-500/20 px-3 py-2 text-sm text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/10">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-lg border border-cyan-500/20 bg-slate-950/75 p-4">
                <p className="text-3xl font-black text-cyan-300">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {topProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + index * 0.07 }}
                whileHover={{ y: -4, borderColor: "rgba(92,236,255,0.55)" }}
                className="rounded-lg border border-cyan-500/20 bg-slate-950/75 p-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Top Project</p>
                <h3 className="mt-3 text-lg font-bold text-white">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-400">{project.mission}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-lg border border-purple-500/20 bg-slate-950/75 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-300">Skills Snapshot</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillSnapshot.map((group) => (
                <span key={group.category} className="rounded-full border border-cyan-500/20 px-3 py-2 text-sm text-slate-200">
                  {group.category}: {group.items.slice(0, 3).map((item) => item.name).join(", ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 flex max-w-[1500px] items-center gap-3 text-sm text-slate-400">
        <Rocket size={16} className="text-orange-300" />
        Designed for a 15-second candidate read: profile, proof, stack, links, contact.
      </div>
    </section>
  );
}

export default RecruiterPanel;
