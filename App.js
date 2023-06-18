import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useState, useRef, Suspense } from "react";

export default function App() {
  function Box(props) {
    const [active, setActive] = useState(false);
    const ref = useRef();
    useFrame((state, delta, xrFrame) => {
      if (active) {
        ref.current.rotation.x -= delta * 2;
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

  function Shoe(props) {
    const obj = useLoader(
      OBJLoader,
      require("./assets/Asset Bundle/Airmax/shoe.obj")
    );
    return (
      <mesh>
        <primitive object={obj} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} castShadow />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
      <Shoe />
    </Canvas>
  );
}
