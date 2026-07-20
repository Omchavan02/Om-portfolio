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

          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Unlocked Capabilities</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {achievement.details.map((detail) => (
              <div key={detail} className="flex gap-3 border border-cyan-400/10 bg-cyan-400/[0.02] p-4 text-sm text-slate-300">
                <CheckCircle2 className="shrink-0 text-green-300" size={17} />
                {detail}
              </div>
            ))}
          </div>

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
