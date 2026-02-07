"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function DubaiParallax({ className }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = rootRef.current;
    const image = imageRef.current;
    if (!root || !image) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const translateX = currentX * 18;
      const translateY = currentY * 14;
      const rotateY = currentX * 10;
      const rotateX = -currentY * 8;

      image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      rafId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      targetX = clamp(x - 0.5, -0.5, 0.5);
      targetY = clamp(y - 0.5, -0.5, 0.5);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
        pointerEvents: "auto",
      }}
      aria-hidden="true"
    >
      <div
        ref={imageRef}
        style={{
          transformOrigin: "70% 75%",
          willChange: "transform",
          filter: "drop-shadow(0 22px 38px rgba(0,0,0,0.35))",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Image
          src="/img/dubai.png"
          alt=""
          width={2000}
          height={2561}
          priority
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 560px"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
