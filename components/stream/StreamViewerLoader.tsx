"use client";

import { useEffect, useState } from "react";

type StreamViewerProps = {
  dancerId: string;
  streamUrl: string;
  isLive: boolean;
};

export default function StreamViewerLoader(props: StreamViewerProps) {
  const [StreamViewer, setStreamViewer] = useState<React.ComponentType<StreamViewerProps> | null>(null);

  useEffect(() => {
    import("./StreamViewer").then((mod) => {
      setStreamViewer(() => mod.default);
    });
  }, []);

  if (!StreamViewer) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-lg text-white/50">Loading stream&hellip;</div>
      </div>
    );
  }

  return <StreamViewer {...props} />;
}
