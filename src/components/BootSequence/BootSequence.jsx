import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import BootScene from './BootScene';
import BootUI from './BootUI';

const BootSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    let completionTimeout;
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure minimum 7 second runtime
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 7000 - elapsed);
        completionTimeout = setTimeout(onComplete, remaining);
      }
    });

    const startTime = Date.now();

    // EXACT timing as per user's requirements (7 total seconds):

    // Second 0-1: Dark Void + Tiny Energy Core
    tl.to({}, { duration: 1, onStart: () => setPhase(1) });
    
    // Second 1-2: Core expands + Energy rings
    tl.to({}, { duration: 1, onStart: () => setPhase(2) });
    
    // Second 2-3: Particle network emerges
    tl.to({}, { duration: 1, onStart: () => setPhase(3) });
    
    // Second 3-4: Drone assembles
    tl.to({}, { duration: 1, onStart: () => setPhase(4) });
    
    // Second 4-5: Identity verification
    tl.to({}, { duration: 1, onStart: () => setPhase(5) });
    
    // Second 5-6: Systems loading
    tl.to({}, { duration: 1, onStart: () => setPhase(6) });
    
    // Second 6-7: Warp transition + OM-X logo
    tl.to({}, { duration: 1, onStart: () => setPhase(7) });

    return () => {
      tl.kill();
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999999] bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-black">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: false
          }}
          dpr={[1, 2]}
          onCreated={({ gl }) => { gl.setClearColor('#000000'); }}
        >
          <BootScene phase={phase} />
        </Canvas>
      </div>

      <BootUI phase={phase} />
    </motion.div>
  );
};

export default BootSequence;
