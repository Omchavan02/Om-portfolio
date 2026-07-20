import { Canvas } from "@react-three/fiber";
import RobotModel from "./RobotModel";

export default function AIAssistantAvatar() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <RobotModel />
      </Canvas>
    </div>
  );
}
