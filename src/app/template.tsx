"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

// The first page arrives already visible (so it paints before scripts load and the hero intro can play).
// Every later navigation fades and settles in.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animateIn] = useState(() => !firstLoad);
  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
