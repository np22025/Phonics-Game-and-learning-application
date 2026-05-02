import { useEffect, useMemo, useState } from "react";
import { sfx, speak } from "../../lib/audio";
import type { WordSortChallenge } from "../../types";

interface Props {
  challenge: WordSortChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

// Word sort uses click-to-place rather than drag and drop because drag and drop
// is finicky on touch devices. Players click a word, then click a bucket.
export function WordSort({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const items = useMemo(() => challenge.items.map((it, idx) => ({ ...it, id: idx })), [challenge]);
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, "right" | "wrong">>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPlaced({});
    setSelectedItem(null);
    setFeedback({});
    setDone(false);
  }, [challenge]);

  const allPlaced = Object.keys(placed).length === items.length;
  const allCorrect = items.every((it) => placed[it.id] === it.bucket);

  useEffect(() => {
    if (allPlaced && !done) {
      setDone(true);
      if (allCorrect) {
        sfx.win();
      } else {
        sfx.wrong();
      }
      const t = setTimeout(() => onAnswer(allCorrect), 1100);
      return () => clearTimeout(t);
    }
  }, [allPlaced, allCorrect, done, onAnswer]);

  function placeIn(bucket: number) {
    if (selectedItem == null || done) return;
    const item = items[selectedItem];
    if (!item) return;
    sfx.click();
    setPlaced((p) => ({ ...p, [item.id]: bucket }));
    setFeedback((f) => ({ ...f, [item.id]: bucket === item.bucket ? "right" : "wrong" }));
    setSelectedItem(null);
  }

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-5 rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
      <div className="flex w-full items-center justify-between text-sm font-bold text-gray-500">
        <span>
          Question {questionNumber} / {totalQuestions}
        </span>
        <span>Tap a word, then tap a basket.</span>
      </div>
      <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">{challenge.prompt}</h2>

      {/* Buckets */}
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-5">
        {challenge.buckets.map((label, bIdx) => {
          const inside = items.filter((it) => placed[it.id] === bIdx);
          return (
            <button
              key={bIdx}
              onClick={() => placeIn(bIdx)}
              type="button"
              className="tile-shadow flex min-h-[140px] flex-col items-center gap-2 rounded-3xl border-4 border-dashed border-purple-400 bg-purple-50 p-4 text-center text-xl font-extrabold text-purple-900 transition hover:bg-purple-100"
            >
              <span className="rounded-full bg-purple-500 px-4 py-1 text-white">{label}</span>
              <div className="flex flex-wrap justify-center gap-2">
                {inside.map((it) => (
                  <span
                    key={it.id}
                    className={`rounded-xl px-3 py-1 text-base font-bold ${
                      feedback[it.id] === "right"
                        ? "bg-green-300 text-green-900"
                        : feedback[it.id] === "wrong"
                          ? "bg-red-300 text-red-900"
                          : "bg-white text-gray-800"
                    }`}
                  >
                    {it.word}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tray */}
      <div className="flex w-full flex-wrap justify-center gap-2 rounded-3xl bg-amber-50 p-4">
        {items.map((it, idx) => {
          const isPlaced = placed[it.id] !== undefined;
          const isSelected = selectedItem === idx;
          if (isPlaced) return null;
          return (
            <button
              key={it.id}
              onClick={() => {
                sfx.click();
                speak(it.word);
                setSelectedItem(isSelected ? null : idx);
              }}
              type="button"
              className={`rounded-xl border-2 px-4 py-2 text-xl font-bold transition ${
                isSelected
                  ? "scale-110 border-orange-500 bg-orange-300 text-white"
                  : "border-orange-300 bg-white text-gray-800 hover:bg-orange-100"
              }`}
            >
              {it.word}
            </button>
          );
        })}
        {Object.keys(placed).length === items.length && (
          <p className="text-base font-bold text-gray-500">All placed!</p>
        )}
      </div>
    </div>
  );
}
