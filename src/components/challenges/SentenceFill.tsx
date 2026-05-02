import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import type { SentenceFillChallenge } from "../../types";

interface Props {
  challenge: SentenceFillChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function SentenceFill({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setPicked(null);
    setLocked(false);
  }, [challenge]);

  const [before, after] = challenge.sentence.split("{}");

  function pick(idx: number) {
    if (locked) return;
    setLocked(true);
    setPicked(idx);
    const correct = challenge.options[idx].correct;
    if (correct) sfx.correct();
    else sfx.wrong();
    speak(`${before} ${challenge.options[idx].text} ${after}`);
    setTimeout(() => onAnswer(correct), 1500);
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
        <span>📝 Fill in the blank</span>
      </div>
      <p className="mb-6 text-center text-2xl font-extrabold leading-relaxed text-ink-900 sm:text-3xl">
        {before}
        <span className="mx-2 inline-block min-w-[100px] rounded-md border-b-4 border-accent-500 bg-accent-100 px-3 align-middle text-accent-800">
          {picked !== null ? challenge.options[picked].text : "_____"}
        </span>
        {after}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
        <p className="mt-5 text-center text-sm italic text-ink-500">💡 {challenge.hint}</p>
      )}
    </motion.div>
  );
}
