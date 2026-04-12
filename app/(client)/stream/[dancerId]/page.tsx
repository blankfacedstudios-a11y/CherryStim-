"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useStreamMode } from "@/hooks/useStreamMode";
import { useWebXR } from "@/hooks/useWebXR";
import { Button } from "@/components/ui/button";
import { HapticsPanel } from "@/components/stream/HapticsPanel";
import StreamViewerLoader from "@/components/stream/StreamViewerLoader";

const GiftThrower = dynamic(() => import("@/components/stream/GiftThrower"), {
  ssr: false
});

export default function StreamPage() {
  const params = useParams<{ dancerId: string }>();
  const dancerId = params.dancerId;
  const { mode, setMode } = useStreamMode();
  const { enterXR, isInXR, error } = useWebXR();

  return (
    <div className="relative min-h-screen bg-black">
      <StreamViewerLoader
        dancerId={dancerId}
        streamUrl="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
        isLive
      />

      <div className="absolute left-6 top-6 z-50 flex flex-wrap gap-3">
        {(["2D", "3D", "VR", "IMMERSIVE"] as const).map((candidateMode) => (
          <Button
            key={candidateMode}
            variant={mode === candidateMode ? "default" : "outline"}
            onClick={() => setMode(candidateMode)}
            size="sm"
          >
            {candidateMode}
          </Button>
        ))}
      </div>

      <div className="absolute right-6 top-6 z-50 flex gap-4">
        <Button
          onClick={async () => {
            await enterXR();
            if (!error) {
              toast.success("Immersive VR session requested.");
            }
          }}
        >
          {isInXR ? "In Immersive Session" : "Enter Immersive"}
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-50 flex flex-col items-center gap-4 px-6 md:flex-row md:justify-center">
        {(mode === "3D" || mode === "VR" || mode === "IMMERSIVE") && (
          <div className="pointer-events-auto">
            <GiftThrower
              dancerId={dancerId}
              onGiftThrown={(giftType) => toast.success(`${giftType.toUpperCase()} NFT launched into 3D space`)}
            />
          </div>
        )}
        <div className="pointer-events-auto">
          <HapticsPanel />
        </div>
      </div>
    </div>
  );
}
