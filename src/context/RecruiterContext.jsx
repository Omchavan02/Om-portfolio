import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const RecruiterContext = createContext();

export function RecruiterProvider({
  children,
}) {
  const [recruiterMode, setRecruiterMode] =
    useState(false);

  const [showBootScreen, setShowBootScreen] =
    useState(false);
  const bootTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current);
  }, []);

  const toggleRecruiterMode = () => {
    if (!recruiterMode) {
      setShowBootScreen(true);

      bootTimeoutRef.current = setTimeout(() => {
        setShowBootScreen(false);
        setRecruiterMode(true);
      }, 1500);
    } else {
      if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current);
      setRecruiterMode(false);
    }
  };

  return (
    <RecruiterContext.Provider
      value={{
        recruiterMode,
        toggleRecruiterMode,
        showBootScreen,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecruiterMode() {
  return useContext(RecruiterContext);
}
