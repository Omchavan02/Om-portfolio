import { motion } from "framer-motion";

function RecruiterBoot() {
  const loadingItems = [
    "Loading Candidate Profile",
    "Loading Experience Records",
    "Loading Project Database",
    "Loading Contact Channels",
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-[#020617]
      "
    >
      <div className="w-full max-w-4xl px-10">

        {/* REACTOR */}

        <div className="mb-12 flex justify-center">

          <div className="relative flex h-28 w-28 items-center justify-center">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-full
                w-full
                rounded-full
                border
                border-cyan-500/30
              "
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-20
                w-20
                rounded-full
                border
                border-cyan-400/40
              "
            />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="
                h-10
                w-10
                rounded-full
                bg-cyan-400
                shadow-[0_0_60px_#00E5FF]
              "
            />
          </div>

        </div>

        {/* TITLE */}

        <div className="text-center">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              mb-6
              text-sm
              tracking-[0.5em]
              text-cyan-400
            "
          >
            RECRUITER MODE ACTIVATED
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mb-10
              text-5xl
              font-bold
              text-white
            "
          >
            ACCESSING CANDIDATE DOSSIER
          </motion.h2>

        </div>

        {/* PROGRESS BAR */}

        <div className="mb-12">

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="
                h-full
                bg-cyan-400
                shadow-[0_0_25px_#00E5FF]
              "
            />

          </div>

        </div>

        {/* LOADING LOGS */}

        <div className="mx-auto max-w-xl space-y-4">

          {loadingItems.map((item, index) => (

            <motion.p
              key={item}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.3,
              }}
              className="
                text-lg
                text-cyan-300
              "
            >
              ✓ {item}
            </motion.p>

          ))}

        </div>

        {/* TERMINAL STATUS */}

        <div className="mt-12 text-center">

          <span className="font-mono text-cyan-400">
            ACCESS GRANTED
          </span>

          <motion.span
            animate={{
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
            }}
            className="font-mono text-cyan-400"
          >
            _
          </motion.span>

        </div>

      </div>
    </motion.div>
  );
}

export default RecruiterBoot;