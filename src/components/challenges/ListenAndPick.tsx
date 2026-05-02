import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import type { ListenAndPickChallenge } from "../../types";

interface Props {
  challenge: ListenAndPickChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function ListenAndPick({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setPicked(null);
    setLocked(false);
    setShowHint(false);
    const t = setTimeout(() => speak(challenge.spokenWord), 400);
    return () => clearTimeout(t);
  }, [challenge]);

  function pick(idx: number) {
    if (locked) return;
    setLocked(true);
    setPicked(idx);
    const correct = challenge.options[idx].correct;
    if (correct) sfx.correct();
    else sfx.wrong();
    setTimeout(() => onAnswer(correct), 1100);
  }

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card w-full max-w-2xl p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-ink-500">
        <span>{questionNumber} / {totalQuestions}</span>
        <span>👂 Listen carefully</span>
      </div>
      <h2 className="mb-6 text-center text-2xl font-extrabold text-ink-900 sm:text-3xl">
        {challenge.prompt}
      </h2>
      <div className="mb-6 flex justify-center">
        <motion.button
          onClick={() => {
            sfx.click();
            speak(challenge.spokenWord);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-3"
          type="button"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
            <path d="M19 5a8 8 0 0 1 0 14" />
            <path d="M16 8a5 5 0 0 1 0 8" />
          </svg>
          Play sound
        </motion.button>
      </div>
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
              transition={{ delay: 0.05 * idx }}
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
            <p className="mt-3 rounded-2xl bg-amber-100 p-3 text-base text-amber-900">
              {challenge.hint}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
