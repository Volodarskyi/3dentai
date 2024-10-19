import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Cube() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1}
            position={[0, 0, 5]}
          />
          <color attach="background" args={["orange"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
}

const ModelStep = () => {
  return (
    <div
      className={
        "flex justify-center items-center w-full min-h-96 border border-gray-200 rounded-b-lg overflow-hidden"
      }
    >
      <Canvas
        fallback={<div>Sorry no WebGL supported!</div>}
        camera={{ position: [5, 5, 5], fov: 25 }}
        className={"w-full h-full min-h-96"}
        style={{ width: "50vh", height: "50vh" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} />
        <Cube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelStep;
