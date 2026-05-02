// Animation wrapper that brings characters to life with movement and emotion.
// Use this anywhere you want a character to bob, jump, dance, or react.

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type MascotMood = "idle" | "celebrate" | "sad" | "march" | "wiggle" | "float";

interface Props {
  mood: MascotMood;
  children: ReactNode;
  // For "march" / "float", how far in pixels the character travels horizontally.
  travelX?: number;
  // Delay before the animation starts (seconds).
  delay?: number;
  // Animation playback speed multiplier (0.5 = slow, 2 = fast).
  speed?: number;
}

const variants = {
  // Gentle breathing/bob — the default at-rest state.
  idle: {
    y: [0, -6, 0],
    transition: { y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
  },
  // Big celebratory jump with rotation and squash.
  celebrate: {
    y: [0, -40, 0, -20, 0],
    rotate: [0, -8, 8, -4, 0],
    scale: [1, 1.1, 1, 1.05, 1],
    transition: {
      duration: 1.2,
      times: [0, 0.3, 0.55, 0.78, 1],
      ease: "easeOut",
    },
  },
  // Sad slump — shrink slightly, droop down.
  sad: {
    y: [0, 6, 4],
    rotate: [0, -3, -2],
    scale: [1, 0.94, 0.96],
    transition: { duration: 0.6 },
  },
  // March in place — feet-stomping bob with subtle horizontal sway.
  march: {
    y: [0, -8, 0, -8, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
  // Quick wiggle — happens once.
  wiggle: {
    rotate: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.7 },
  },
  // Slow drifting float — used for background ambience.
  float: {
    y: [0, -20, 0, 20, 0],
    rotate: [0, 4, 0, -4, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export function AnimatedMascot({ mood, children, delay = 0, speed = 1 }: Props) {
  const variant = variants[mood];
  // Apply speed multiplier
  const transition = applySpeed(variant.transition, speed, delay);

  return (
    <motion.div
      animate={variant}
      transition={transition}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

// Drift mascot — moves across the screen horizontally + bobs.
// Used for background ambience on the home screen.
export function DriftingMascot({
  startX = 0,
  endX = 1000,
  startY,
  duration = 14,
  delay = 0,
  children,
}: {
  startX?: number;
  endX?: number;
  startY: number;
  duration?: number;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ x: startX, y: startY }}
      animate={{
        x: [startX, endX, startX],
        y: [startY, startY - 30, startY + 30, startY - 20, startY],
        rotate: [0, 4, -4, 2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

// Bounce mascot — periodic jump like a tiny pep ball.
export function BouncingMascot({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -30, 0, -15, 0],
        scaleY: [1, 1, 0.9, 1, 1],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: "easeOut",
      }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

// Helper to scale duration by speed multiplier.
function applySpeed(transition: unknown, speed: number, delay: number): Record<string, unknown> {
  if (!transition || typeof transition !== "object") return { delay };
  const t = transition as Record<string, unknown>;
  const result: Record<string, unknown> = { ...t, delay };
  if (typeof result.duration === "number") {
    result.duration = (result.duration as number) / speed;
  }
  // Recurse for child timing objects (e.g. y: { duration: ... })
  for (const key of Object.keys(result)) {
    if (typeof result[key] === "object" && result[key] !== null && "duration" in (result[key] as object)) {
      const child = result[key] as Record<string, unknown>;
      result[key] = { ...child, duration: (child.duration as number) / speed };
    }
  }
  return result;
}
