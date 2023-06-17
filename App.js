import { Canvas } from "@react-three/fiber";
import { PointLightShadow } from "three";

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} castShadow />
      <mesh>
        <sphereGeometry />
        <meshToonMaterial color={"orange"} />
      </mesh>
      <mesh position={[-1, -3, -1]}>
        <torusGeometry  />
        <meshPhysicalMaterial color={"purple"} />
      </mesh>
    </Canvas>
  );
}
