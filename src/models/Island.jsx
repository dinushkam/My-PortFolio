// src/models/Island.jsx
import { a } from "@react-spring/three";
import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import lighthouseScene from "../assets/3d/lighthouse.glb"; // ✅ use lighthouse

export function Island({ isRotating, setIsRotating, setCurrentStage, ...props }) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();

  // ✅ Use scene (not nodes) so no geometry undefined errors
  const { scene } = useGLTF(lighthouseScene);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          obj.material.side = THREE.FrontSide;
          obj.material.needsUpdate = true;
        }
      }
    });
  }, [model]);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!isRotating || !islandRef.current) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const delta = (clientX - lastX.current) / viewport.width;

    islandRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  };

  const handleKeyDown = (event) => {
    if (!islandRef.current) return;

    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, viewport.width, isRotating]);

  useFrame(() => {
    if (!islandRef.current) return;

    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      islandRef.current.rotation.y += rotationSpeed.current;
      return;
    }

    const rotation = islandRef.current.rotation.y;
    const normalizedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    switch (true) {

      case normalizedRotation >= 3.10 && normalizedRotation <= 3.55:
  setCurrentStage(5);
  break;
      case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
        setCurrentStage(4);
        break;
      case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
        setCurrentStage(3);
        break;
      case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
        setCurrentStage(2);
        break;
      case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
        setCurrentStage(1);
        break;
      default:
        setCurrentStage(null);
    }
  });

  return (
    <a.group ref={islandRef} dispose={null} {...props}>
      {/* ✅ Renders the entire lighthouse.glb safely */}
      <primitive object={model} />
    </a.group>
  );
}

useGLTF.preload(lighthouseScene);