import { useEffect, useState } from "react";
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
    setTimeout(() => onAnswer(correct), 900);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex w-full items-center justify-between text-sm font-bold text-gray-500">
        <span>
          Question {questionNumber} / {totalQuestions}
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">{challenge.prompt}</h2>
      <button
        onClick={() => {
          sfx.click();
          speak(challenge.spokenWord);
        }}
        className="tile-shadow flex items-center gap-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 px-8 py-5 text-2xl font-bold text-white"
        aria-label="Play the spoken word"
        type="button"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
          <path d="M19 5a8 8 0 0 1 0 14" />
          <path d="M16 8a5 5 0 0 1 0 8" />
        </svg>
        Play sound
      </button>
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {challenge.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const cls = showResult
            ? opt.correct
              ? "bg-green-400 text-white animate-pop"
              : "bg-red-400 text-white animate-shake"
            : "bg-gradient-to-br from-blue-300 to-indigo-400 hover:from-blue-200 hover:to-indigo-300 text-gray-900";
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              type="button"
              className={`tile-shadow rounded-2xl px-4 py-5 text-2xl font-bold transition-transform ${cls}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {challenge.hint && (
        <button
          onClick={() => {
            sfx.click();
            setShowHint((s) => !s);
          }}
          className="mt-2 text-sm font-bold text-purple-700 underline-offset-4 hover:underline"
          type="button"
        >
          {showHint ? "Hide hint" : "Need a hint?"}
        </button>
      )}
      {showHint && challenge.hint && (
        <p className="rounded-2xl bg-yellow-100 p-3 text-center text-base text-yellow-900">{challenge.hint}</p>
      )}
    </div>
  );
}
