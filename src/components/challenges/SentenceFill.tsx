import { useEffect, useState } from "react";
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
    setTimeout(() => onAnswer(correct), 1300);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex w-full items-center justify-between text-sm font-bold text-gray-500">
        <span>
          Question {questionNumber} / {totalQuestions}
        </span>
        <span>Fill in the blank</span>
      </div>
      <p className="text-center text-2xl font-bold leading-relaxed text-gray-800 sm:text-3xl">
        {before}
        <span className="mx-2 inline-block min-w-[80px] rounded-md border-b-4 border-purple-500 bg-purple-100 px-3 align-middle">
          {picked !== null ? challenge.options[picked].text : "____"}
        </span>
        {after}
      </p>
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {challenge.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const cls = showResult
            ? opt.correct
              ? "bg-green-400 text-white animate-pop"
              : "bg-red-400 text-white animate-shake"
            : "bg-gradient-to-br from-emerald-300 to-teal-400 hover:from-emerald-200 hover:to-teal-300 text-gray-900";
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              type="button"
              className={`tile-shadow rounded-2xl px-4 py-4 text-xl font-bold transition-transform sm:text-2xl ${cls}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {challenge.hint && (
        <p className="text-sm italic text-gray-500">Tip: {challenge.hint}</p>
      )}
    </div>
  );
}
