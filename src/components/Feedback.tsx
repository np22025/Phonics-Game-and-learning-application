import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  type: "correct" | "wrong";
  message?: string;
}

// Floating pill that flashes "Nice!" or "Almost!" near the top of the screen
// when the player answers. Pure visual reward — Duolingo style.
export function FloatingFeedback({ show, type, message }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={message + type}
          initial={{ y: -40, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className={`pointer-events-none fixed left-1/2 top-24 z-40 -translate-x-1/2 rounded-full px-6 py-3 text-2xl font-extrabold shadow-elev sm:text-3xl ${
            type === "correct"
              ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
              : "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
          }`}
        >
          {message ?? (type === "correct" ? "Nice!" : "Almost!")}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const NICE_WORDS = ["Nice!", "Great!", "Boom!", "Yes!", "Awesome!", "Wow!", "Perfect!", "Genius!"];
const TRY_AGAIN_WORDS = ["Almost!", "So close!", "Try again!", "Keep going!"];

export function pickNice(): string {
  return NICE_WORDS[Math.floor(Math.random() * NICE_WORDS.length)];
}
export function pickTry(): string {
  return TRY_AGAIN_WORDS[Math.floor(Math.random() * TRY_AGAIN_WORDS.length)];
}
