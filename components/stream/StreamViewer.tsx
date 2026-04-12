"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Controllers, Hands, XR, createXRStore } from "@react-three/xr";
import { Environment, OrbitControls } from "@react-three/drei";
import VolumetricAvatar from "./VolumetricAvatar";
import GiftThrower from "./GiftThrower";
import { useStreamMode } from "@/hooks/useStreamMode";

export default function StreamViewer({
  dancerId,
  streamUrl,
  isLive
}: {
  dancerId: string;
  streamUrl: string;
  isLive: boolean;
}) {
  const { mode } = useStreamMode();
  const xrStore = useMemo(() => createXRStore(), []);

  if (mode === "2D") {
    return (
      <div className="relative h-screen w-full bg-black">
        <video src={streamUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        {isLive && <div className="absolute left-6 top-6 rounded-xl bg-cherry-600 px-3 py-1 text-sm font-semibold">LIVE</div>}
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 55 }}>
        <color attach="background" args={["#040002"]} />
        <ambientLight intensity={0.55} />
        <spotLight position={[3, 5, 2]} intensity={4} color="#ffd700" angle={0.42} penumbra={0.4} castShadow />
        <Suspense fallback={null}>
          <XR store={xrStore}>
            <Controllers />
            <Hands />
            <Environment preset="night" />
            <VolumetricAvatar streamUrl={streamUrl} mode={mode} dancerId={dancerId} />
            <GiftThrower dancerId={dancerId} renderMode="scene" />
          </XR>
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2.5} maxDistance={6} />
      </Canvas>
    </div>
  );
}
