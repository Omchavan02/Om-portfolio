import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import achievements from "../data/achievements";
import AchievementModal from "../components/achievements/AchievementModal";

function AchievementWall() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const visibleAchievements = showAllCertificates ? achievements : achievements.slice(0, 3);
  const hasMoreCertificates = achievements.length > 3;

  return (
    <section id="achievement-wall" className="section-shell archive-bg px-5 py-24 md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-cyan-400">Achievement Vault</p>
        <h2 className="text-4xl font-black text-white md:text-6xl">Verified Mission Records</h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Certificates, internship proof, academic records, and event participation displayed as an encrypted archive.
        </p>

        <div className="mt-12">
          <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleAchievements.map((achievement, index) => (
                <motion.button
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ y: -10, rotateX: 4, rotateY: -4, scale: 1.02 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setSelectedAchievement(achievement)}
                  className="group rounded-lg border border-cyan-500/20 bg-slate-950/75 p-5 text-left backdrop-blur transition hover:border-cyan-300 hover:shadow-[0_0_45px_rgba(0,229,255,0.18)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <LockKeyhole className="text-cyan-300" />
                    <span className="rounded-full border border-green-400/25 px-3 py-1 text-xs uppercase tracking-[0.2em] text-green-300">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{achievement.category} / {achievement.date}</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{achievement.title}</h3>
                  <p className="mt-2 text-sm text-cyan-200">{achievement.issuer}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{achievement.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                    <ShieldCheck size={14} />
                    {achievement.category === "Academic" ? "View Academic Record" : "View Certificate"}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMoreCertificates && (
            <div className="mt-6 flex justify-center">
              <motion.button
                type="button"
                onClick={() => setShowAllCertificates((value) => !value)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border border-cyan-400/35 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_20px_rgba(0,229,255,0.12)] transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
              >
                {showAllCertificates ? "View Less" : "View More"}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {selectedAchievement && <AchievementModal achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />}
    </section>
  );
}

export default AchievementWall;
