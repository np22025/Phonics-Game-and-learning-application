import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import type { MultipleChoiceChallenge } from "../../types";

interface Props {
  challenge: MultipleChoiceChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function MultipleChoice({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setPicked(null);
    setShowHint(false);
    setLocked(false);
    if (challenge.speak) {
      const t = setTimeout(() => speak(challenge.speak!), 350);
      return () => clearTimeout(t);
    }
  }, [challenge]);

  function pick(idx: number) {
    if (locked) return;
    setLocked(true);
    setPicked(idx);
    const correct = challenge.options[idx].correct;
    if (correct) sfx.correct();
    else sfx.wrong();
    const word = challenge.options[idx].speak;
    if (word) speak(word, { rate: 0.95 });
    setTimeout(() => onAnswer(correct), 1100);
  }

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card relative w-full max-w-2xl p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-ink-500">
        <span>
          {questionNumber} / {totalQuestions}
        </span>
        {challenge.speak && (
          <button
            onClick={() => {
              sfx.click();
              speak(challenge.speak!);
            }}
            className="rounded-full bg-accent-100 px-4 py-1.5 text-accent-700 transition hover:bg-accent-200"
            type="button"
          >
            🔊 Hear it again
          </button>
        )}
      </div>
      <h2 className="mb-6 text-center text-2xl font-extrabold text-ink-900 sm:text-3xl">
        {challenge.prompt}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {challenge.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const className = `option-tile ${
            showResult ? (opt.correct ? "correct" : "wrong") : ""
          }`;
          return (
            <motion.button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              type="button"
              className={className}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, type: "spring", stiffness: 250, damping: 22 }}
              whileHover={locked ? {} : { y: -4, scale: 1.02 }}
              whileTap={locked ? {} : { scale: 0.96 }}
            >
              {opt.text}
            </motion.button>
          );
        })}
      </div>
      {challenge.hint && (
        <div className="mt-5 text-center">
          <button
            onClick={() => {
              sfx.click();
              setShowHint((s) => !s);
            }}
            className="text-sm font-bold text-accent-700 underline-offset-4 hover:underline"
            type="button"
          >
            {showHint ? "Hide hint" : "💡 Need a hint?"}
          </button>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 rounded-2xl bg-amber-100 p-3 text-base text-amber-900"
            >
              {challenge.hint}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  );
}
