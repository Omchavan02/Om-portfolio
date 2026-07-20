import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MainLayout() {
  return (
    <div className="omx-shell relative min-h-screen text-white">
      <Navbar />

      <main className="relative z-10">
        <Outlet />
      </main>

      <div className="omx-vignette pointer-events-none fixed inset-0 z-[60]" />
      <div className="omx-scanlines pointer-events-none fixed inset-0 z-[61]" />
    </div>
  );
}

export default MainLayout;
