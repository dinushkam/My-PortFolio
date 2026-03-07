import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import pirateScene from "../assets/3d/pirate.glb";

export function Pirate({ isRunning = false, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(pirateScene);
  const { actions, names } = useAnimations(animations, ref);

  // choose the best animation once
  const actionName = useMemo(() => {
    if (!names || names.length === 0) return null;
    const run =
      names.find((n) => n.toLowerCase().includes("run")) ||
      names.find((n) => n.toLowerCase().includes("walk")) ||
      names[0];
    return run;
  }, [names]);

  useEffect(() => {
    if (!actionName || !actions?.[actionName]) return;

    const action = actions[actionName];
    action.reset();
    action.play();
    action.paused = !isRunning; // start paused if not running

    return () => {
      action.stop();
    };
  }, [actions, actionName]);

  // toggle running without restarting the animation
  useEffect(() => {
    if (!actionName || !actions?.[actionName]) return;
    actions[actionName].paused = !isRunning;
  }, [isRunning, actions, actionName]);

  // optional tiny bob ONLY while running
  useFrame(({ clock }) => {
    if (!ref.current) return;

    if (ref.current.userData.baseY === undefined) {
      ref.current.userData.baseY = ref.current.position.y;
    }

    const bob = isRunning ? Math.sin(clock.elapsedTime * 4) * 0.01 : 0;
    ref.current.position.y = ref.current.userData.baseY + bob;
  });

  return (
    <group ref={ref} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(pirateScene);