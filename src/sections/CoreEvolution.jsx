import { motion } from "framer-motion";
import { journey } from "../data/journey";

function CoreEvolution() {
  return (
    <section id="core-evolution" className="section-shell evolution-bg px-5 py-24 md:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-cyan-400">
          Core Evolution
        </p>
        <h2 className="text-4xl font-bold text-white md:text-6xl">
          Career Progression System
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Academic growth, real-world building, internship execution, and the next professional objective.
        </p>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-purple-400 to-orange-400 md:left-1/2" />
          {journey.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.35) }}
              viewport={{ once: true, amount: 0.35 }}
              className={`relative mb-8 grid gap-6 md:grid-cols-2 ${
                index % 2 ? "md:text-left" : "md:text-right"
              }`}
            >
              <div className={index % 2 ? "md:col-start-2" : ""}>
                <div className="ml-12 rounded-lg border border-cyan-500/20 bg-slate-950/75 p-5 backdrop-blur md:ml-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                    {item.year}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.12 }}
                className="absolute left-2 top-7 h-5 w-5 rounded-full border border-cyan-300 bg-slate-950 shadow-[0_0_22px_rgba(0,229,255,0.85)] md:left-1/2 md:-translate-x-1/2"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreEvolution;
