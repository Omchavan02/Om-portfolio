import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OmxReconDrone() {
  const groupRef = useRef();
  const coreGroupRef = useRef();
  const cyanRingRef = useRef();
  const purpleRingRef = useRef();
  const eyeRef = useRef();
  const thruster1Ref = useRef();
  const thruster2Ref = useRef();
  const thruster3Ref = useRef();
  const thruster4Ref = useRef();
  const neuralLatticeRef = useRef();
  const innerEnergyRef = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    const float = Math.sin(t * 1.5) * 0.08;
    const driftX = Math.sin(t * 0.8) * 0.05;
    const driftZ = Math.cos(t * 0.6) * 0.05;

    if (groupRef.current) {
      groupRef.current.position.y = float;
      groupRef.current.position.x = driftX;
      groupRef.current.position.z = driftZ;
      groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.06;
    }

    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.x = (mouse.y * 0.5) * 0.2 + t * 0.1;
      coreGroupRef.current.rotation.y = (mouse.x * 0.5) * 0.3 + t * 0.15;
    }

    if (cyanRingRef.current) {
      cyanRingRef.current.rotation.z = t * 0.8;
      cyanRingRef.current.rotation.x = 0.3 + Math.sin(t * 0.4) * 0.1;
    }

    if (purpleRingRef.current) {
      purpleRingRef.current.rotation.z = -t * 0.6;
      purpleRingRef.current.rotation.y = 0.4 + Math.cos(t * 0.5) * 0.12;
    }

    if (eyeRef.current) {
      const eyePulse = 0.8 + Math.sin(t * 3) * 0.2;
      eyeRef.current.scale.set(eyePulse, eyePulse, eyePulse);
      eyeRef.current.material.emissiveIntensity = 2 + Math.sin(t * 3) * 0.5;
    }

    const thrusterPulse = 1 + Math.sin(t * 4) * 0.3;
    if (thruster1Ref.current) {
      thruster1Ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + 0) * 0.8;
      thruster1Ref.current.scale.set(1, 1, thrusterPulse);
    }
    if (thruster2Ref.current) {
      thruster2Ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + 1.5) * 0.8;
      thruster2Ref.current.scale.set(1, 1, thrusterPulse);
    }
    if (thruster3Ref.current) {
      thruster3Ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + 3) * 0.8;
      thruster3Ref.current.scale.set(1, 1, thrusterPulse);
    }
    if (thruster4Ref.current) {
      thruster4Ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + 4.7) * 0.8;
      thruster4Ref.current.scale.set(1, 1, thrusterPulse);
    }

    if (neuralLatticeRef.current) {
      neuralLatticeRef.current.rotation.x = t * 0.08;
      neuralLatticeRef.current.rotation.y = t * 0.12;
    }

    if (innerEnergyRef.current) {
      const energyScale = 0.9 + Math.sin(t * 2.5) * 0.15;
      innerEnergyRef.current.scale.set(energyScale, energyScale, energyScale);
      innerEnergyRef.current.material.opacity = 0.5 + Math.sin(t * 2.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cyan Orbital Ring */}
      <mesh ref={cyanRingRef}>
        <torusKnotGeometry args={[0.85, 0.025, 128, 32, 2, 3]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} />
      </mesh>

      {/* Purple Orbital Ring */}
      <mesh ref={purpleRingRef} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1.0, 0.02, 16, 128]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Core Group */}
      <group ref={coreGroupRef}>
        {/* Hexagonal Segmented Shell */}
        <mesh>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#001a33"
            emissiveIntensity={1.2}
            metalness={0.98}
            roughness={0.05}
          />
        </mesh>

        {/* Hexagonal Segments */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={new THREE.Vector3().setFromSphericalCoords(0.46, (i * Math.PI) / 3, (i * Math.PI) / 2)}>
            <circleGeometry args={[0.08, 6]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#00e5ff"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Neural Lattice - Wireframe Sphere */}
        <group ref={neuralLatticeRef}>
          <mesh>
            <icosahedronGeometry args={[0.38, 2]} />
            <meshBasicMaterial
              color="#00e5ff"
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>

        {/* Inner Pulsing Energy */}
        <mesh ref={innerEnergyRef}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Central AI Eye */}
        <mesh ref={eyeRef} position={[0, 0.02, 0.48]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2.5}
            metalness={0.1}
            roughness={0.05}
          />
        </mesh>

        {/* Eye Glow Outer */}
        <mesh position={[0, 0.02, 0.46]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Energy Vents */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]} position={[0, 0, -0.44]}>
            <boxGeometry args={[0.03, 0.12, 0.02]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={1.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Thrusters */}
        <mesh ref={thruster1Ref} position={[0.35, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.05, 0.12, 8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={thruster2Ref} position={[-0.35, -0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.05, 0.12, 8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={thruster3Ref} position={[0, -0.2, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.12, 8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={thruster4Ref} position={[0, -0.2, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.12, 8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default OmxReconDrone;
