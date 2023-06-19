import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
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
    const material = useLoader(
      MTLLoader,
      require("./assets/bundle/Airmax/shoe.mtl")
    );
    const obj = useLoader(
      OBJLoader,
      require("./assets/bundle/Airmax/shoe.obj")
    );
    return (
      <mesh rotation={[1, 0, 0]}>
        <primitive object={obj} scale={15} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
      <Shoe />
    </Canvas>
  );
}
