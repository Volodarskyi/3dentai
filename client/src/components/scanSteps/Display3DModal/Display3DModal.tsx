import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

const Display3DModal = () => {
  const gltf = useLoader(GLTFLoader, "./prod_4.gltf");
  return (
    <div
      className={
        "flex justify-center items-center w-full min-h-96 border border-gray-200 rounded-b-lg overflow-hidden"
      }
    >
      <Canvas
        fallback={<div>Sorry no WebGL supported!</div>}
        camera={{ position: [-8, 5, 10], fov: 0.4 }}
        className={"w-full h-full min-h-96"}
        style={{ width: "100vh", height: "50vh" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} />
        <primitive object={gltf.scene} scale={0.4} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Display3DModal;
