import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { HomeInfo, Loader } from "../components";
import { Bird, Island, Plane, Sky, Pirate } from "../models";

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sceneConfig = useMemo(() => {
    if (screenWidth < 480) {
      return {
        islandScale: [30, 30, 30],
        islandPosition: [0, -6.5, -43.4],

        planeScale: [0.08, 0.08, 0.08],
        planePosition: [1.7, -1.0, 0],

        pirateScale: [0.16, 0.16, 0.16],
        pirateOffset: [-1.45, -0.15, 0.8],
      };
    }

    if (screenWidth < 640) {
      return {
        islandScale: [34, 34, 34],
        islandPosition: [0, -5.8, -43.4],

        planeScale: [0.09, 0.09, 0.09],
        planePosition: [2.0, -1.2, 0],

        pirateScale: [0.18, 0.18, 0.18],
        pirateOffset: [-1.6, -0.1, 0.8],
      };
    }

    if (screenWidth < 768) {
      return {
        islandScale: [40, 40, 40],
        islandPosition: [0, -4.8, -43.4],

        planeScale: [0.11, 0.11, 0.11],
        planePosition: [2.4, -1.5, 0],

        pirateScale: [0.21, 0.21, 0.21],
        pirateOffset: [-1.9, -0.05, 0.9],
      };
    }

    if (screenWidth < 1024) {
      return {
        islandScale: [50, 50, 50],
        islandPosition: [0, -2.8, -43.4],

        planeScale: [0.14, 0.14, 0.14],
        planePosition: [2.8, -2.1, 0],

        pirateScale: [0.25, 0.25, 0.25],
        pirateOffset: [-2.3, 0.1, 1],
      };
    }

    return {
      islandScale: [65, 65, 65],
      islandPosition: [0, 0, -43.4],

      planeScale: [0.2, 0.2, 0.2],
      planePosition: [3, -3, 0],

      pirateScale: [0.3, 0.3, 0.3],
      pirateOffset: [-3, 0.5, 1],
    };
  }, [screenWidth]);

  const piratePosition = [
    sceneConfig.planePosition[0] + sceneConfig.pirateOffset[0],
    sceneConfig.planePosition[1] + sceneConfig.pirateOffset[1],
    sceneConfig.planePosition[2] + sceneConfig.pirateOffset[2],
  ];

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[560px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#041b33] to-[#063a66]" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_15%,rgba(125,211,252,.16),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(246,196,83,.14),transparent_45%),radial-gradient(circle_at_60%_90%,rgba(255,59,92,.12),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 opacity-25 bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)] blur-2xl" />
      </div>

      <div className="absolute bottom-20 sm:bottom-6 left-4 sm:left-6 z-10 w-auto max-w-[calc(100%-2rem)] sm:max-w-md pointer-events-none">
  <div className="pointer-events-auto">
    {currentStage && <HomeInfo currentStage={currentStage} />}
  </div>
</div>

      <Canvas
        className={`w-full h-full bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />

          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={sceneConfig.islandPosition}
            rotation={[0.1, 5, 0]}
            scale={sceneConfig.islandScale}
          />

          <Plane
            isRotating={isRotating}
            position={sceneConfig.planePosition}
            rotation={[0, Math.PI / 8, 0]}
            scale={sceneConfig.planeScale}
          />

          <Pirate
            isRunning={isRotating}
            position={piratePosition}
            rotation={[0, Math.PI / 2, 0]}
            scale={sceneConfig.pirateScale}
          />
        </Suspense>
      </Canvas>

    </section>
  );
};

export default Home;