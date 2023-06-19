import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useTexture } from "@react-three/drei";
import { useState, useRef, Suspense, useLayoutEffect } from "react";
import { Object3D } from "three";
import {
  useAnimatedSensor,
  SensorType,
  SensorConfig,
} from "react-native-reanimated";
import { THREE } from "expo-three";

export default function App() {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });

  function Shoe(props) {
    const ref = useRef();
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
          child.material.normalMap = normalMap;
          child.material.roughnessMap = roughnessMap;
        }
      });
    }, [obj]);
    useFrame((state, delta) => {
 
      ref.current.rotation.x = delta;
      ref.current.rotation.y -= delta;
    });
    return (
      <mesh rotation={[0.7, 2, -1]} ref={ref}>
        <primitive object={obj} scale={15} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Shoe animatedSensor={animatedSensor} />
      </Suspense>
    </Canvas>
  );
}
