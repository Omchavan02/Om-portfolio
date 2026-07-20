import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 80;
const particleData = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: (Math.random() - 0.5) * 4,
  y: (Math.random() - 0.5) * 3,
  z: (Math.random() - 0.5) * 3,
  speed: 0.002 + Math.random() * 0.008,
  size: 0.01 + Math.random() * 0.025,
  phase: Math.random() * Math.PI * 2,
}));

function Particles() {
  const particlesRef = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = t * 0.02;
      particlesRef.current.children.forEach((particle, index) => {
        const data = particleData[index];
        if (data && particle.position) {
          particle.position.y += data.speed * (Math.sin(t * 0.5 + data.phase) * 0.01);
          particle.position.x += Math.cos(t * 0.3 + data.phase) * data.speed * 0.5;
          particle.position.z += Math.sin(t * 0.4 + data.phase) * data.speed * 0.5;

          if (Math.abs(particle.position.y) > 2) particle.position.y = (Math.random() - 0.5) * 3;
          if (Math.abs(particle.position.x) > 2.5) particle.position.x = (Math.random() - 0.5) * 4;
          if (Math.abs(particle.position.z) > 2) particle.position.z = (Math.random() - 0.5) * 3;

          particle.scale.setScalar(data.size + Math.sin(t * 2 + data.phase) * 0.008);
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particleData.map((particle, index) => (
        <mesh
          key={`particle-${index}`}
          position={[
            particle.x,
            particle.y,
            particle.z,
          ]}
        >
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#00e5ff" : index % 3 === 1 ? "#a855f7" : "#22d3ee"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Particles;
