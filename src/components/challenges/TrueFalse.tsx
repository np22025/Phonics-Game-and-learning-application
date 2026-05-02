import { useEffect, useState } from "react";
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
    setTimeout(() => onAnswer(correct), 900);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex w-full items-center justify-between text-sm font-bold text-gray-500">
        <span>
          Question {questionNumber} / {totalQuestions}
        </span>
        {challenge.speak && (
          <button
            onClick={() => {
              sfx.click();
              speak(challenge.speak!);
            }}
            className="rounded-full bg-purple-100 px-3 py-1 text-purple-700 transition hover:bg-purple-200"
            type="button"
          >
            Hear it again
          </button>
        )}
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">{challenge.prompt}</h2>
      <div className="grid w-full grid-cols-2 gap-4">
        <button
          onClick={() => pick(true)}
          disabled={locked}
          type="button"
          className={`tile-shadow rounded-2xl px-4 py-6 text-3xl font-extrabold transition-transform ${
            locked && picked === true
              ? challenge.answer === true
                ? "bg-green-400 text-white animate-pop"
                : "bg-red-400 text-white animate-shake"
              : "bg-gradient-to-br from-green-300 to-emerald-500 text-white hover:scale-105"
          }`}
        >
          ✓ TRUE
        </button>
        <button
          onClick={() => pick(false)}
          disabled={locked}
          type="button"
          className={`tile-shadow rounded-2xl px-4 py-6 text-3xl font-extrabold transition-transform ${
            locked && picked === false
              ? challenge.answer === false
                ? "bg-green-400 text-white animate-pop"
                : "bg-red-400 text-white animate-shake"
              : "bg-gradient-to-br from-red-300 to-rose-500 text-white hover:scale-105"
          }`}
        >
          ✗ FALSE
        </button>
      </div>
      {challenge.hint && (
        <button
          onClick={() => {
            sfx.click();
            setShowHint((s) => !s);
          }}
          className="text-sm font-bold text-purple-700 underline-offset-4 hover:underline"
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
