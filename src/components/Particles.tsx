import { useMemo } from "react";

// Ambient floating particles in the background. Pure CSS, no perf cost.
export function Particles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * -20,
        opacity: 0.3 + Math.random() * 0.5,
        key: i,
      })),
    [count]
  );
  return (
    <div className="particles" aria-hidden>
      {items.map((p) => (
        <span
          key={p.key}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
