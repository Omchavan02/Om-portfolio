import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NOTIFICATIONS } from "../data/notifications";
import executeCommand from "../ai/assistant";
import AIAssistantAvatar from "../3d/components/AIAssistantAvatar";

function DroneAssistant() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [notification, setNotification] = useState("");
  const [command, setCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([
    "OM-X AI Assistant Online.",
    "",
    "Suggested Commands:",
    "- About Om",
    "- Skills",
    "- Projects",
    "- Internship",
    "- Resume",
    "- Contact",
  ]);

  const quickCommands = [
    "About Om",
    "Skills",
    "Projects",
    "Internship",
    "Resume",
    "Contact",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setNotification(NOTIFICATIONS[index]);

      index++;

      if (index >= NOTIFICATIONS.length) {
        index = 0;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const typeMessage = async (message) => {
    setIsTyping(true);

    setHistory((prev) => [...prev, ""]);

    for (let i = 0; i < message.length; i++) {
      const currentText = message.slice(0, i + 1);

      setHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = currentText;
        return updated;
      });

      await new Promise((resolve) => setTimeout(resolve, 15));
    }

    setIsTyping(false);
  };

  const executeAssistantCommand = async (input) => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isTyping) return;

    const result = executeCommand(trimmedInput);

    setHistory((prev) => [...prev, `> ${trimmedInput}`]);

    await typeMessage(result.message);

    if (result.type === "navigate") {
      const element = document.getElementById(result.target);

      if (element) {
        const navbarHeight = 80;

        const position =
          element.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCommand = async (e) => {
    e.preventDefault();

    if (!command.trim()) return;

    await executeAssistantCommand(command);

    setCommand("");
  };

  return createPortal(
    <>
      {/* SYSTEM NOTIFICATION */}

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="fixed right-28 top-24 z-[999]"
          >
            <div className="rounded-lg border border-cyan-500/30 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                System Update
              </p>

              <p className="mt-1 text-sm text-slate-300">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MESSAGE PANEL */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-28 right-10 z-[999]"
          >
            <div className="w-[520px] rounded-xl border border-cyan-500/30 bg-slate-950/95 p-4 backdrop-blur-xl">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-400">
                OM-X AI COMMAND CENTER
              </p>

              <div className="mb-4 h-64 overflow-y-auto rounded-lg border border-cyan-500/20 bg-black/50 p-3">
                <pre className="whitespace-pre-wrap text-sm text-cyan-300">
                  {history.join("\n\n")}
                </pre>

                {isTyping && (
                  <div className="mt-3 animate-pulse text-cyan-400">
                    AI Processing...
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {quickCommands.map((item) => (
                    <button
                      key={item}
                      onClick={() => executeAssistantCommand(item)}
                      className="
                        rounded-lg
                        border
                        border-cyan-500/20
                        px-3
                        py-2
                        text-xs
                        text-cyan-300
                        transition-all
                        duration-300
                        hover:border-cyan-400
                        hover:bg-cyan-500/10
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCommand}>
                <input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Type command..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-cyan-500/30
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                    outline-none
                  "
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI ASSISTANT AVATAR */}

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          fixed
          bottom-8
          right-8
          z-[99999]
          w-64
          h-64
          cursor-pointer
          relative
        "
        style={{
          position: "fixed",
          right: "-32px",
          bottom: "-25px",
          width: "220px",
          height: "220px",
          zIndex: 999999
        }}
      >
        {/* Pulse Effect */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-32
            h-32
            rounded-full
            border
            border-cyan-500/40
            pointer-events-none
          "
        />

        {/* 3D Avatar */}
        <div className="w-full h-full">
          <AIAssistantAvatar />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 20 }}
              className="
                absolute
                right-full
                top-1/2
                -translate-y-1/2
                mr-4
                bg-slate-950/95
                border
                border-cyan-500/40
                backdrop-blur-xl
                rounded-xl
                px-4
                py-3
                pointer-events-none
                w-48
              "
            >
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1 font-semibold">
                OM-X AI ASSISTANT
              </p>
              <p className="text-[11px] text-slate-300">
                Click to Chat
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>,
    document.body
  );
}

export default DroneAssistant;
