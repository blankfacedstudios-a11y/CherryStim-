"use client";

import { useMemo, useRef } from "react";
import { Html, useVideoTexture } from "@react-three/drei";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { StreamMode } from "@/hooks/useStreamMode";

interface VolumetricAvatarProps {
  streamUrl: string;
  mode: StreamMode;
  dancerId: string;
}

export default function VolumetricAvatar({ streamUrl, mode, dancerId }: VolumetricAvatarProps) {
  const dancerRef = useRef<Group>(null);
  const texture = useVideoTexture(streamUrl);

  const visualScale = useMemo(() => (mode === "IMMERSIVE" ? 1.25 : mode === "VR" ? 1.15 : 1), [mode]);

  useFrame((state) => {
    if (!dancerRef.current) return;
    dancerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
    dancerRef.current.position.y = 0.75 + Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
  });

  return (
    <group ref={dancerRef} scale={visualScale}>
      <mesh position={[0, 0, -1]} receiveShadow>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial color="#170008" metalness={0.5} roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.15, -0.9]}>
        <planeGeometry args={[1.6, 2.7]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, 2.65, -1]}>
        <torusGeometry args={[0.75, 0.06, 16, 64]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.45} />
      </mesh>

      <Html position={[0, 2.95, -0.9]} center>
        <div className="rounded-xl border border-gold-500/40 bg-black/60 px-3 py-1 text-xs tracking-[0.2em] text-gold-400">
          LIVE • DANCER {dancerId}
        </div>
      </Html>
    </group>
  );
}
