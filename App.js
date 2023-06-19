import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useTexture } from "@react-three/drei";
import { useState, useRef, Suspense, useLayoutEffect } from "react";
import { Object3D } from "three";
import { THREE } from "expo-three";

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
    const [colorMap, normalMap, roughnessMap] = useTexture([
      require("./assets/bundle/Airmax/textures/BaseColor.jpg"),
      require("./assets/bundle/Airmax/textures/Normal.jpg"),
      require("./assets/bundle/Airmax/textures/Roughness.png"),
    ]);

    const material = useLoader(
      MTLLoader,
      require("./assets/bundle/Airmax/shoe.mtl")
    );
    const obj = useLoader(
      OBJLoader,
      require("./assets/bundle/Airmax/shoe.obj"),
      (loader) => {
        material.preload();
        loader.setMaterials(material);
      }
    );
    useLayoutEffect(() => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = colorMap;
          child.material.normalMap=normalMap;
          child.material.roughnessMap=roughnessMap;
        }
      });
    }, [obj]);
    return (
      <mesh rotation={[1, 1, 0]}>
        <primitive object={obj} scale={15} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
    </Canvas>
  );
}
