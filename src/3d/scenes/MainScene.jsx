import { Canvas } from "@react-three/fiber";
import OmxReconDrone from "../models/OmxReconDrone";
import Particles from "../effects/Particles";

function MainScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={1.5} />

      <pointLight
        position={[3, 3, 3]}
        intensity={30}
        color="#00e5ff"
      />

      <pointLight
        position={[-3, -3, 3]}
        intensity={15}
        color="#4f46e5"
      />
     
     <Particles />
      <OmxReconDrone />
    </Canvas>
  );
}

export default MainScene;