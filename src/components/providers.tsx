"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    // reducedMotion="user": Motion turns transform animations off when the OS asks for less motion
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {!reduce && <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -72, duration: 1.4 } }} />}
      {children}
    </MotionConfig>
  );
}
