"use client";

import Image from "next/image";

export function Logo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const widthMap = { sm: 180, default: 320, lg: 500 };
  const heightMap = { sm: 54, default: 96, lg: 150 };
  const cssWidthMap = { sm: "w-44", default: "w-72", lg: "w-[28rem]" };

  return (
    <div className={className}>
      <Image
        src="/logo/cherrystim-logo.svg"
        alt="Cherrystim"
        width={widthMap[size]}
        height={heightMap[size]}
        className={`mx-auto ${cssWidthMap[size]} max-w-full drop-shadow-[0_0_22px_rgba(255,0,51,0.35)]`}
        priority
      />
    </div>
  );
}
