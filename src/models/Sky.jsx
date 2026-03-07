// src/models/Sky.jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Sky({ isRotating }) {
  const skyRef = useRef();

  const material = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },

      // ✅ Theme colors (Night Ocean + Gold + Red)
      uTop: { value: new THREE.Color("#c1c7d7") },      // near-black / deep night
      uHorizon: { value: new THREE.Color("#063a66") },  // ocean blue horizon
      uAccentGold: { value: new THREE.Color("#f6c453") }, // gold glow
      uAccentRed: { value: new THREE.Color("#8a182b") },  // red glow

      // Clouds
      uCloud: { value: new THREE.Color("#e6f4ff") },
      uCloudAmount: { value: 0.54 },
      uCloudSoftness: { value: 0.55 },
      uCloudSpeed: { value: 0.02 },
      uCloudTopStart: { value: 0.62 },
      uCloudTopEnd: { value: 0.98 },
    };

    return new THREE.ShaderMaterial({
      uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float uTime;

        uniform vec3 uTop;
        uniform vec3 uHorizon;
        uniform vec3 uAccentGold;
        uniform vec3 uAccentRed;

        uniform vec3 uCloud;
        uniform float uCloudAmount;
        uniform float uCloudSoftness;
        uniform float uCloudSpeed;
        uniform float uCloudTopStart;
        uniform float uCloudTopEnd;

        varying vec3 vWorld;

        // --- tiny hash/noise helpers (procedural clouds) ---
        float hash(vec2 p){
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return fract(sin(p.x + p.y) * 43758.5453123);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
        }

        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.5;
          for(int i=0;i<5;i++){
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          // Normalize world position to get "upness"
          vec3 dir = normalize(vWorld);
          float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0); // 0 bottom .. 1 top

          // Base ocean-night gradient
          vec3 skyCol = mix(uHorizon, uTop, pow(h, 1.35));

          // Subtle top accents (gold + red) near the very top
          float topBand = smoothstep(0.72, 0.98, h);
          vec3 accent = mix(uAccentRed, uAccentGold, 0.55);
          skyCol = mix(skyCol, mix(skyCol, accent, 0.20), topBand);

          // Clouds only near the top
          float band = smoothstep(uCloudTopStart, uCloudTopEnd, h);

          // Cloud UV from direction (stable on sphere)
          vec2 uv = dir.xz * 2.2;
          uv += vec2(uTime * uCloudSpeed, uTime * uCloudSpeed * 0.6);

          float n = fbm(uv * 1.6);
          float clouds = smoothstep(uCloudAmount, uCloudAmount + uCloudSoftness, n);

          // Blend clouds softly (not too bright)
          vec3 col = skyCol;
          col = mix(col, mix(col, uCloud, 0.45), clouds * band);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    // animate shader time + rotate sky
    material.uniforms.uTime.value += delta;

    if (skyRef.current) {
      const baseSpeed = 0.04;
      const extra = isRotating ? 0.06 : 0;
      skyRef.current.rotation.y += (baseSpeed + extra) * delta;
    }
  });

  return (
    <group ref={skyRef}>
      {/* Big sky sphere */}
      <mesh>
        <sphereGeometry args={[500, 48, 48]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Soft horizon haze (ocean vibe) */}
      <mesh position={[0, -20, 0]}>
        <cylinderGeometry args={[230, 230, 22, 64, 1, true]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}