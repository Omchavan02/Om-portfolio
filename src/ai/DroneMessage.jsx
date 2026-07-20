import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function DroneMessage({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }

        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div
      className="
        absolute
        top-[242px]
        left-1/2
        -translate-x-1/2
        w-[200px]
      "
    >
      {messages.slice(0, index + 1).map((msg) => (
        <motion.p
          key={msg}
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="
            mb-2
            text-[9px]
            text-cyan-300
          "
        >
          {">"} {msg}
        </motion.p>
      ))}
    </div>
  );
}

export default DroneMessage;
