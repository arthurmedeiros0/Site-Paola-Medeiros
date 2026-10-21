"use client";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? undefined
          : { y: [14, 0], ...(fade ? { opacity: [0.65, 1] } : {}) }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
