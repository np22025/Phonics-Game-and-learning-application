import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import type { TrueFalseChallenge } from "../../types";

interface Props {
  challenge: TrueFalseChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function TrueFalse({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const [picked, setPicked] = useState<boolean | null>(null);
  const [locked, setLocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setPicked(null);
    setLocked(false);
    setShowHint(false);
    if (challenge.speak) {
      const t = setTimeout(() => speak(challenge.speak!), 350);
      return () => clearTimeout(t);
    }
  }, [challenge]);

  function pick(answer: boolean) {
    if (locked) return;
    setLocked(true);
    setPicked(answer);
    const correct = answer === challenge.answer;
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
        {challenge.speak && (
          <button
            onClick={() => {
              sfx.click();
              speak(challenge.speak!);
            }}
            className="rounded-full bg-accent-100 px-4 py-1.5 text-accent-700 hover:bg-accent-200"
            type="button"
          >
            🔊 Hear it again
          </button>
        )}
      </div>
      <h2 className="mb-6 text-center text-2xl font-extrabold text-ink-900 sm:text-3xl">
        {challenge.prompt}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          onClick={() => pick(true)}
          disabled={locked}
          whileHover={locked ? {} : { y: -4, scale: 1.03 }}
          whileTap={locked ? {} : { scale: 0.96 }}
          className={`rounded-3xl px-4 py-7 text-3xl font-black text-white shadow-elev transition ${
            locked && picked === true
              ? challenge.answer === true
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                : "bg-gradient-to-br from-rose-400 to-rose-600"
              : "bg-gradient-to-br from-emerald-400 to-emerald-600 hover:brightness-110"
          }`}
          type="button"
        >
          ✓ TRUE
        </motion.button>
        <motion.button
          onClick={() => pick(false)}
          disabled={locked}
          whileHover={locked ? {} : { y: -4, scale: 1.03 }}
          whileTap={locked ? {} : { scale: 0.96 }}
          className={`rounded-3xl px-4 py-7 text-3xl font-black text-white shadow-elev transition ${
            locked && picked === false
              ? challenge.answer === false
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                : "bg-gradient-to-br from-rose-400 to-rose-600"
              : "bg-gradient-to-br from-rose-400 to-rose-600 hover:brightness-110"
          }`}
          type="button"
        >
          ✗ FALSE
        </motion.button>
      </div>
      {challenge.hint && (
        <div className="mt-5 text-center">
          <button
            onClick={() => {
              sfx.click();
              setShowHint((s) => !s);
            }}
            className="text-sm font-bold text-accent-700 hover:underline"
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
