import RecruiterToggle from "../recruiter/RecruiterToggle";
import { useRecruiterMode } from "../../context/RecruiterContext";
import useActiveSection from "../../hooks/useActiveSection";
import { Menu, X, Terminal } from "lucide-react";
import { useState } from "react";

const moduleNavigation = [
  { id: "hero", label: "Command" },
  { id: "command-console", label: "Terminal" },
  { id: "project-database", label: "Projects" },
  { id: "skills-reactor", label: "Arsenal" },
  { id: "core-evolution", label: "Evolution" },
  { id: "internship-dossier", label: "Experience" },
  { id: "achievement-wall", label: "Vault" },
  { id: "secure-transmission", label: "Contact" },
];

const recruiterNavigation = [
  { id: "hero", label: "Profile" },
  { id: "project-database", label: "Projects" },
  { id: "skills-reactor", label: "Skills" },
  { id: "internship-dossier", label: "Experience" },
  { id: "secure-transmission", label: "Contact" },
];

function Navbar() {
  const { recruiterMode } = useRecruiterMode();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = recruiterMode ? recruiterNavigation : moduleNavigation;

  const activateModule = (id) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/");
    setMobileOpen(false);
  };

  return (
    <header className={`mission-nav sticky top-0 z-[70] ${recruiterMode ? "is-recruiter" : ""}`}>
      <div className="nav-frame mx-auto flex max-w-[1600px] items-center justify-between gap-5 px-4 py-4 md:px-8">
        {/* OM-X Logo */}
        <button onClick={() => activateModule("hero")} className="group flex select-none items-center gap-3 text-left">
          <span className="brand-reactor">
            <span />
          </span>
          <span>
            <span className="block text-2xl font-black tracking-[0.18em] text-white">OM-X</span>
          </span>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center xl:flex gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => activateModule(item.id)}
              className={`
                relative px-6 py-3 rounded-lg font-semibold text-white/80
                transition-all duration-300 hover:text-cyan-300 hover:bg-cyan-500/10
                ${activeSection === item.id ? "text-cyan-300 bg-cyan-500/15" : ""}
              `}
            >
              {/* Hover Glow */}
              {activeSection === item.id && (
                <div className="absolute inset-0 rounded-lg border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.25)]" />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("omx:terminal"))}
            className="nav-terminal hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
            title="Open command terminal"
          >
            <Terminal size={16} />
            <span className="font-semibold">CMD</span>
            <kbd className="text-[10px] px-1 py-0.5 rounded bg-white/10 border border-white/20">/</kbd>
          </button>
          <RecruiterToggle />
          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="nav-mobile-toggle xl:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="nav-mobile-grid xl:hidden">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => activateModule(item.id)}
              className={activeSection === item.id ? "is-active" : ""}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
