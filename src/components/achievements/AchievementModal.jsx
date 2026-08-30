import { motion } from "framer-motion";
import { Award, CheckCircle2, X, Download, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function AchievementModal({ achievement, onClose }) {
  const [certificateExists, setCertificateExists] = useState(true);
  const [activeCertificateIndex, setActiveCertificateIndex] = useState(0);

  useEffect(() => {
    const checkCertificate = async () => {
      const currentPath = achievement.certificates 
        ? achievement.certificates[activeCertificateIndex].path 
        : achievement.certificate;
      
      if (currentPath) {
        try {
          const response = await fetch(currentPath, { method: "HEAD" });
          setCertificateExists(response.ok);
        } catch {
          setCertificateExists(false);
        }
      }
    };

    checkCertificate();
  }, [achievement, activeCertificateIndex]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!achievement) return null;

  const currentCertificatePath = achievement.certificates 
    ? achievement.certificates[activeCertificateIndex].path 
    : achievement.certificate;

  const currentCertificateTitle = achievement.certificates 
    ? achievement.certificates[activeCertificateIndex].title 
    : `${achievement.title} Certificate`;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#01040a]/95 p-4 backdrop-blur-xl md:p-8"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto max-w-4xl border border-cyan-400/20 bg-slate-950/90"
      >
        <header className="flex items-start justify-between gap-5 border-b border-cyan-400/15 p-6 md:p-8">
          <div className="flex gap-4">
            <Award className="mt-1 shrink-0 text-yellow-300" size={34} />
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Achievement Vault / Verified Record</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">{achievement.title}</h2>
              <p className="mt-3 text-sm text-slate-400">{achievement.issuer} / {achievement.date}</p>
            </div>
          </div>
          <button onClick={onClose} className="border border-cyan-400/20 p-2 text-cyan-200 hover:bg-cyan-400/10" aria-label="Close record">
            <X size={20} />
          </button>
        </header>

        <div className="p-6 md:p-8 space-y-6">
          <div className="border border-yellow-300/15 bg-yellow-300/[0.02] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">{achievement.category}</p>
            <p className="mt-3 text-lg leading-relaxed text-slate-300">{achievement.description}</p>
          </div>

          {achievement.semesterData ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4">Semester Performance Records</p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {achievement.semesterData.map((semItem) => (
                    <div
                      key={semItem.sem}
                      className="group rounded-md border border-cyan-500/20 bg-slate-900/70 p-4 transition duration-200 hover:border-cyan-400/50 hover:bg-slate-900/90"
                    >
                      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{semItem.sem}</span>
                        <span className="rounded border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan-200">Verified</span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-xs uppercase tracking-wider text-slate-400">SGPI</span>
                        <span className="text-2xl font-black text-white group-hover:text-cyan-200">{semItem.sgpi.toFixed(2)}</span>
                      </div>
                      {semItem.marks ? (
                        <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-2.5 text-xs text-slate-400">
                          <div className="flex justify-between">
                            <span>TOTAL MARKS:</span>
                            <span className="font-mono text-slate-200">{semItem.marks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CREDITS:</span>
                            <span className="font-mono text-slate-200">{semItem.credits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CR × GP:</span>
                            <span className="font-mono text-slate-200">{semItem.crGp}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 border-t border-slate-800/80 pt-2.5 text-xs text-slate-400 flex justify-between">
                          <span>STATUS:</span>
                          <span className="font-mono text-green-300">Verified</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SGPI Progression Line Chart */}
              <div className="rounded-md border border-cyan-500/20 bg-slate-950/80 p-5 backdrop-blur">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Academic Performance</p>
                  <span className="text-[11px] uppercase tracking-widest text-slate-400">Semester Progression (Sem I – VI)</span>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[500px]">
                    <svg viewBox="0 0 600 160" className="w-full h-auto overflow-visible">
                      {/* Grid Lines */}
                      <line x1="40" y1="30" x2="570" y2="30" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />
                      <line x1="40" y1="75" x2="570" y2="75" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />
                      <line x1="40" y1="120" x2="570" y2="120" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />

                      {/* Line Path */}
                      <path
                        d="M 60 119 L 160 76.6 L 260 49 L 360 77.3 L 460 76.3 L 560 47"
                        fill="none"
                        stroke="#00e5ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Gradient Fill under path */}
                      <path
                        d="M 60 119 L 160 76.6 L 260 49 L 360 77.3 L 460 76.3 L 560 47 L 560 145 L 60 145 Z"
                        fill="url(#sgpiGradient)"
                        opacity="0.25"
                      />

                      <defs>
                        <linearGradient id="sgpiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Nodes & Labels */}
                      {[
                        { sem: "Sem I", sgpi: 6.33, x: 60, y: 119 },
                        { sem: "Sem II", sgpi: 7.60, x: 160, y: 76.6 },
                        { sem: "Sem III", sgpi: 8.43, x: 260, y: 49 },
                        { sem: "Sem IV", sgpi: 7.58, x: 360, y: 77.3 },
                        { sem: "Sem V", sgpi: 7.61, x: 460, y: 76.3 },
                        { sem: "Sem VI", sgpi: 8.49, x: 560, y: 47 },
                      ].map((pt) => (
                        <g key={pt.sem}>
                          <circle cx={pt.x} cy={pt.y} r="5" fill="#00e5ff" stroke="#01040a" strokeWidth="2" />
                          <text x={pt.x} y={pt.y - 12} textAnchor="middle" className="fill-cyan-200 text-[11px] font-bold">
                            {pt.sgpi.toFixed(2)}
                          </text>
                          <text x={pt.x} y="145" textAnchor="middle" className="fill-slate-400 text-[10px] uppercase font-semibold">
                            {pt.sem}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Unlocked Capabilities</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {achievement.details.map((detail) => (
                  <div key={detail} className="flex gap-3 border border-cyan-400/10 bg-cyan-400/[0.02] p-4 text-sm text-slate-300">
                    <CheckCircle2 className="shrink-0 text-green-300" size={17} />
                    {detail}
                  </div>
                ))}
              </div>
            </>
          )}

          {achievement.internshipProjects && (
            <div className="mt-6 rounded-md border border-cyan-400/20 bg-cyan-950/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Internship Projects</p>
                <span className="rounded border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200">
                  Language: {achievement.internshipProjects.language}
                </span>
              </div>
              <div className="mt-3 grid gap-2.5 md:grid-cols-3">
                {achievement.internshipProjects.items.map((proj) => (
                  <div key={proj} className="flex items-center gap-2 rounded border border-cyan-500/15 bg-slate-900/60 p-3 text-sm text-slate-200">
                    <CheckCircle2 className="shrink-0 text-cyan-300" size={16} />
                    {proj}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate Document */}
          {(achievement.certificate || achievement.certificates) && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4">Certificate Document</p>
              
              {/* Certificate Selector for multiple certificates */}
              {achievement.certificates && achievement.certificates.length > 1 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {achievement.certificates.map((cert, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCertificateIndex(index)}
                      className={`px-3 py-2 rounded-md border text-xs transition-all ${
                        activeCertificateIndex === index
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                          : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-cyan-500/50"
                      }`}
                    >
                      {cert.title}
                    </button>
                  ))}
                </div>
              )}

              {certificateExists ? (
                <div className="border border-cyan-400/15 bg-black/30 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-cyan-400/10 flex items-center justify-between">
                    <span className="text-sm text-slate-300">{currentCertificateTitle}</span>
                    <div className="flex gap-3">
                      <a
                        href={currentCertificatePath}
                        target="_blank"
                        rel="noreferrer"
                        className="mission-button secondary flex items-center gap-2"
                      >
                        <ExternalLink size={16} /> View Certificate
                      </a>
                      <a
                        href={currentCertificatePath}
                        download
                        className="mission-button flex items-center gap-2"
                      >
                        <Download size={16} /> Download Certificate
                      </a>
                    </div>
                  </div>
                  <div className="aspect-[8.5/11]">
                    <iframe
                      src={`${currentCertificatePath}#toolbar=0`}
                      title={currentCertificateTitle}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="border border-orange-400/20 bg-orange-400/5 rounded-lg p-6 text-center">
                  <p className="text-orange-400 font-medium">Certificate unavailable</p>
                  <p className="text-slate-500 text-sm mt-2">Certificate file not found in public/certificates directory</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
}

export default AchievementModal;
