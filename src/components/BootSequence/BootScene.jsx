import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const seeded = (index, salt) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const BootScene = ({ phase }) => {
  const coreRef = useRef();
  const innerCoreRef = useRef();
  const ringsRef = useRef();
  const networkRef = useRef();
  const droneRef = useRef();
  const scannerRef = useRef();
  const warpRef = useRef();
  const groupRef = useRef();

  const particleCount = 1000;
  const particleGeo = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (seeded(i, 1) - 0.5) * 20;
      pos[i * 3 + 1] = (seeded(i, 2) - 0.5) * 20;
      pos[i * 3 + 2] = (seeded(i, 3) - 0.5) * 20;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, []);

  useEffect(() => () => particleGeo.dispose(), [particleGeo]);

  useEffect(() => {
    if (phase === 1) {
      if (innerCoreRef.current) gsap.to(innerCoreRef.current.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 1 });
    }
    if (phase === 2) {
      if (coreRef.current) gsap.to(coreRef.current.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power4.out" });
      if (innerCoreRef.current) gsap.to(innerCoreRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(2)" });
    }
    if (phase === 3) {
      if (networkRef.current) gsap.to(networkRef.current.position, { z: 0, duration: 1.5, ease: "power2.inOut" });
    }
    if (phase === 4) {
      if (droneRef.current) gsap.to(droneRef.current.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "expo.out" });
      if (coreRef.current) gsap.to(coreRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1 });
    }
    if (phase === 5) {
      if (scannerRef.current) gsap.fromTo(scannerRef.current.position, { y: 5 }, { y: -5, duration: 1, ease: "none" });
    }
    if (phase === 7) {
      if (groupRef.current) gsap.to(groupRef.current.position, { z: 20, duration: 1, ease: "power4.in" });
      if (warpRef.current) gsap.to(warpRef.current.scale, { x: 2, y: 2, z: 30, duration: 1, ease: "power4.in" });
    }
  }, [phase]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x += 0.005;
    }
    if (innerCoreRef.current) {
      const s = 1 + Math.sin(t * 10) * 0.1;
      innerCoreRef.current.scale.set(s, s, s);
    }
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z += 0.01 * (i + 1);
        ring.rotation.x += 0.005 * (i + 1);
        ring.rotation.y += 0.008 * (i + 1);
      });
    }
    if (networkRef.current && phase >= 3) {
      networkRef.current.rotation.y += 0.002;
    }
    if (droneRef.current && phase >= 4) {
      droneRef.current.rotation.y += 0.015;
      droneRef.current.position.y = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phase 1 & 2: Energy Core */}
      <group position={[0, 0, 0]}>
        <mesh ref={coreRef} scale={[0, 0, 0]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.9} />
        </mesh>
        <mesh ref={innerCoreRef} scale={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.95} />
        </mesh>
      </group>

      {/* Phase 2: Energy Rings */}
      <group ref={ringsRef}>
        {phase >= 2 && [1.2, 1.5, 1.8].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial
              color={i === 1 ? "#8b5cf6" : "#00ffff"}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Phase 3: Neural Network */}
      <group ref={networkRef} position={[0, 0, -15]}>
        {phase >= 3 && (
          <points geometry={particleGeo}>
            <pointsMaterial
              transparent
              color="#00aaff"
              size={0.05}
              sizeAttenuation={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        )}
      </group>

      {/* Phase 4: Drone Assembly (Wireframe) */}
      <group ref={droneRef} scale={[0, 0, 0]}>
        {phase >= 4 && (
          <>
            <mesh>
              <octahedronGeometry args={[0.8, 2]} />
              <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.7} />
            </mesh>
            {[0, 1, 2, 3].map((i) => (
              <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
                <mesh position={[1, 0, 0]}>
                  <boxGeometry args={[0.8, 0.1, 0.4]} />
                  <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.6} />
                </mesh>
                <mesh position={[1.4, 0, 0]}>
                  <sphereGeometry args={[0.1, 8, 8]} />
                  <meshBasicMaterial color="#00ffff" transparent opacity={0.9} />
                </mesh>
              </group>
            ))}
          </>
        )}
      </group>

      {/* Phase 5: Scanning Beam */}
      {phase === 5 && (
        <group ref={scannerRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 0.5]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}

      {/* Phase 7: Warp Effect */}
      <group ref={warpRef} scale={[1, 1, 1]}>
        {phase >= 7 && (
          <>
            <points geometry={particleGeo}>
              <pointsMaterial
                transparent
                color="#ffffff"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </points>
            <mesh position={[0, 0, -5]}>
              <ringGeometry args={[1, 1.2, 32]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.8} side={THREE.DoubleSide} />
            </mesh>
          </>
        )}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00aaff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
    </group>
  );
};

export default BootScene;
