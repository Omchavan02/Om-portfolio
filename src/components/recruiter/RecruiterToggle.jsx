import { useRecruiterMode } from "../../context/RecruiterContext";

function RecruiterToggle() {
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();

  return (
    <button
      id="recruiter-toggle"
      onClick={toggleRecruiterMode}
      className={`recruiter-toggle ${recruiterMode ? "is-active" : ""}`}
    >
      <span className="recruiter-toggle-light" />
      <span className="hidden sm:inline">{recruiterMode ? "Exit Brief" : "Recruiter"}</span>
    </button>
  );
}

export default RecruiterToggle;
