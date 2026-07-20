import { motion } from "framer-motion";

function SectionReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "brightness(0.75) blur(1px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "brightness(1) blur(0px)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SectionReveal;
