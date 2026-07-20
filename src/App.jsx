import { useCallback, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import DroneAssistant from "./ai/DroneAssistant";
import AIDrone from "./ai/AIDrone";
import LightfallBackground from "./components/background/LightfallBackground";
import { RecruiterProvider } from "./context/RecruiterContext";
import BootSequence from "./components/BootSequence/BootSequence";

function shouldSkipBoot() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("skipBoot") === "1";
}

function App() {
  const [bootVisible, setBootVisible] = useState(() => !shouldSkipBoot());
  const [mainReady, setMainReady] = useState(shouldSkipBoot);

  const completeBoot = useCallback(() => {
    setBootVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMainReady(true));
    });
  }, []);

  return (
    <>
      {bootVisible && <BootSequence onComplete={completeBoot} />}

      {mainReady && (
        <RecruiterProvider>
          <LightfallBackground />
          <AppRoutes />
          <AIDrone />
          <DroneAssistant />
        </RecruiterProvider>
      )}
    </>
  );
}

export default App;
