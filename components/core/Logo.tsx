"use client";

import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logo/cherrystim-logo.png"
        alt="Cherrystim"
        width={600}
        height={180}
        className="mx-auto w-72 max-w-full drop-shadow-[0_0_22px_rgba(255,0,51,0.35)]"
        priority
      />
    </div>
  );
}
