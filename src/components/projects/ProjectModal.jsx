import { motion } from "framer-motion";
import { ExternalLink, GitBranch, X, Image, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ImageLightbox from "./ImageLightbox";

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentLightboxIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentLightboxIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [project]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!project) return null;

  const renderDetails = (details) => {
    if (!Array.isArray(details)) {
      return <p className="mt-3 text-sm leading-relaxed text-slate-400">{details}</p>;
    }

    return (
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
        {details.map((detail) => <li key={detail}>• {detail}</li>)}
      </ul>
    );
  };

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] overflow-y-auto bg-[#01040a]/95 p-4 backdrop-blur-xl md:p-8"
        onClick={onClose}
      >
        <motion.article
          ref={modalRef}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          onClick={(event) => event.stopPropagation()}
          className="mx-auto max-w-6xl border border-cyan-400/20 bg-slate-950/90 shadow-[0_0_80px_rgba(0,229,255,0.12)]"
        >
          <header className="flex items-start justify-between gap-6 border-b border-cyan-400/15 p-6 md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-cyan-300">Classified Mission Dossier / MX-{String(project.id).padStart(3, "0")}</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">{project.title}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-green-300">{project.status} / {project.category} / {project.year}</p>
            </div>
            <button onClick={onClose} className="border border-cyan-400/20 p-2 text-cyan-200 hover:bg-cyan-400/10" aria-label="Close dossier">
              <X size={20} />
            </button>
          </header>

          <div className="space-y-6 p-6 md:p-8">
            {/* Mission Overview */}
            <section>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Mission Overview</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{project.mission}</p>
            </section>

            {/* Problem Statement, Features, Key Learnings */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Problem Solved</p>
                {renderDetails(project.problem || project.challenge)}
              </div>
              <div className="border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Features</p>
                {renderDetails(project.features || project.solution)}
              </div>
              <div className="border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Key Learnings</p>
                {renderDetails(project.learnings || project.outcome)}
              </div>
            </div>

            {(project.architecture || project.challenges) && (
              <div className="grid gap-4 md:grid-cols-2">
                {project.architecture && (
                  <div className="border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Architecture</p>
                    {renderDetails(project.architecture)}
                  </div>
                )}
                {project.challenges && (
                  <div className="border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Challenges</p>
                    {renderDetails(project.challenges)}
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Tech Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs text-cyan-100">{tech}</span>
                ))}
              </div>
            </div>

            {/* Video Walkthrough */}
            {project.videos && project.videos.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4 flex items-center gap-2">
                  <Play size={14} /> Video Walkthrough
                </p>
                <div className="border border-cyan-400/15 bg-black/30 rounded-lg overflow-hidden aspect-video">
                  <video
                    src={project.videos[0]}
                    controls
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4 flex items-center gap-2">
                  <Image size={14} /> Screenshots Gallery
                </p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {project.gallery.map((img, index) => (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${project.title} screenshot ${index + 1}`}
                      className="border border-cyan-400/15 bg-black/30 rounded-lg overflow-hidden aspect-video cursor-pointer transition-transform hover:scale-[1.02]"
                      onClick={() => openLightbox(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openLightbox(index);
                        }
                      }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {project.galleryCaptions?.[index] && (
                        <p className="border-t border-cyan-400/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100">
                          {project.galleryCaptions[index]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline - Added per request */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Timeline</p>
              <div className="mt-4 border-l-2 border-cyan-500/30 pl-4">
                <div className="relative pb-4">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500/20 border-2 border-cyan-500"></div>
                  <p className="text-sm text-cyan-300">{project.year}</p>
                  <p className="text-slate-400">{project.status}</p>
                </div>
              </div>
            </div>

            {/* GitHub and Live Demo Buttons */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="mission-button flex items-center justify-center gap-2">
                  <GitBranch size={16} /> GitHub Repository
                </a>
              ) : (
                <span className="mission-button secondary opacity-50 flex items-center justify-center gap-2">
                  <GitBranch size={16} /> GitHub Unavailable
                </span>
              )}
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="mission-button flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Live Demo
                </a>
              ) : (
                <span className="mission-button secondary opacity-50 flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Demo Unavailable
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </motion.div>

      {/* Image Lightbox */}
      {lightboxOpen && project.gallery && (
        <ImageLightbox
          images={project.gallery}
          currentIndex={currentLightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>,
    document.body
  );
}

export default ProjectModal;
