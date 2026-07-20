import { useGLTF } from "@react-three/drei";

export default function RobotModel() {
  const { scene } = useGLTF("/assets/model/Robot.glb");

  return (
    <primitive
      object={scene}
      scale={1.25}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}
