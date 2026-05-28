"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type AnimatedInViewProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function AnimatedInView({ children, className, delay = 0 }: AnimatedInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
