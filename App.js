import { Canvas, useFrame } from "@react-three/fiber";
import { PointLightShadow } from "three";
import { useState, useRef } from "react";

export default function App() {
  function Box(props) {
    const [active, setActive] = useState(false);
    const ref = useRef();
    useFrame((state, delta, xrFrame) => {
      if (active) {
        ref.current.rotation.x -= delta *2;
      }
    });
    return (
      <mesh
        {...props}
        scale={active ? 1.5 : 1.0}
        ref={ref}
        onClick={() => setActive(!active)}
      >
        <boxGeometry />
        <meshToonMaterial color={active ? "blue" : "orange"} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} castShadow />
      <Box />
      <Box position={[0, -2, 0]} />
    </Canvas>
  );
}
