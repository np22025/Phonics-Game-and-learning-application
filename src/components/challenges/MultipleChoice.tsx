import { useEffect, useState } from "react";
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

  // Speak the prompt's word once, when the challenge appears.
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
    if (correct) {
      sfx.correct();
    } else {
      sfx.wrong();
    }
    // If the option has its own audio, speak it for reinforcement.
    const word = challenge.options[idx].speak;
    if (word) speak(word, { rate: 0.95 });
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
            aria-label="Hear the word again"
            type="button"
          >
            Hear it again
          </button>
        )}
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">{challenge.prompt}</h2>
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {challenge.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const cls = showResult
            ? opt.correct
              ? "bg-green-400 text-white animate-pop"
              : "bg-red-400 text-white animate-shake"
            : "bg-gradient-to-br from-amber-300 to-orange-400 hover:from-amber-200 hover:to-orange-300 text-gray-900";
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              type="button"
              className={`tile-shadow rounded-2xl px-4 py-5 text-xl font-bold transition-transform sm:text-2xl ${cls}`}
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
