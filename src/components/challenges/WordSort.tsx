import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import type { WordSortChallenge } from "../../types";

interface Props {
  challenge: WordSortChallenge;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function WordSort({ challenge, onAnswer, questionNumber, totalQuestions }: Props) {
  const items = useMemo(
    () => challenge.items.map((it, idx) => ({ ...it, id: idx })),
    [challenge]
  );
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, "right" | "wrong">>({});

  // Use refs (not state) for the "done" flag and onAnswer so the completion
  // effect runs exactly once and isn't disturbed by re-renders. (Bug fix:
  // previously used state + cleanup that cleared the pending onAnswer call.)
  const doneRef = useRef(false);
  const onAnswerRef = useRef(onAnswer);
  useEffect(() => {
    onAnswerRef.current = onAnswer;
  }, [onAnswer]);

  useEffect(() => {
    setPlaced({});
    setSelectedItem(null);
    setFeedback({});
    doneRef.current = false;
  }, [challenge]);

  const allPlaced = Object.keys(placed).length === items.length;
  const allCorrect = items.every((it) => placed[it.id] === it.bucket);

  useEffect(() => {
    if (allPlaced && !doneRef.current) {
      doneRef.current = true;
      if (allCorrect) sfx.win();
      else sfx.wrong();
      // Note: we intentionally do NOT return a clearTimeout cleanup here.
      // The doneRef guard already ensures we only schedule once, and clearing
      // the timeout on subsequent re-renders would prevent onAnswer from
      // ever firing (the bug we're fixing).
      setTimeout(() => onAnswerRef.current(allCorrect), 1100);
    }
  }, [allPlaced, allCorrect]);

  function placeIn(bucket: number) {
    if (selectedItem == null || doneRef.current) return;
    const item = items[selectedItem];
    if (!item) return;
    sfx.click();
    setPlaced((p) => ({ ...p, [item.id]: bucket }));
    setFeedback((f) => ({ ...f, [item.id]: bucket === item.bucket ? "right" : "wrong" }));
    setSelectedItem(null);
  }

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card w-full max-w-3xl p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-ink-500">
        <span>{questionNumber} / {totalQuestions}</span>
        <span>📦 Tap a word, then a basket</span>
      </div>
      <h2 className="mb-5 text-center text-2xl font-extrabold text-ink-900 sm:text-3xl">
        {challenge.prompt}
      </h2>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4">
        {challenge.buckets.map((label, bIdx) => {
          const inside = items.filter((it) => placed[it.id] === bIdx);
          return (
            <motion.button
              key={bIdx}
              onClick={() => placeIn(bIdx)}
              type="button"
              whileHover={selectedItem != null ? { scale: 1.02 } : {}}
              className="flex min-h-[150px] flex-col items-center gap-2 rounded-3xl border-4 border-dashed border-accent-400 bg-accent-50 p-4 text-center transition hover:bg-accent-100"
            >
              <span className="rounded-full bg-accent-600 px-4 py-1 text-base font-extrabold text-white sm:text-lg">
                {label}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {inside.map((it) => (
                  <motion.span
                    key={it.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`rounded-xl px-3 py-1 text-base font-bold ${
                      feedback[it.id] === "right"
                        ? "bg-emerald-200 text-emerald-900"
                        : feedback[it.id] === "wrong"
                          ? "bg-rose-200 text-rose-900"
                          : "bg-white text-ink-800"
                    }`}
                  >
                    {it.word}
                  </motion.span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 rounded-3xl bg-amber-50 p-4">
        {items.map((it, idx) => {
          const isPlaced = placed[it.id] !== undefined;
          const isSelected = selectedItem === idx;
          if (isPlaced) return null;
          return (
            <motion.button
              key={it.id}
              onClick={() => {
                sfx.click();
                speak(it.word);
                setSelectedItem(isSelected ? null : idx);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`rounded-xl border-2 px-4 py-2 text-xl font-bold transition ${
                isSelected
                  ? "scale-110 border-accent-600 bg-accent-500 text-white shadow-elev"
                  : "border-amber-300 bg-white text-ink-800 hover:bg-amber-100"
              }`}
            >
              {it.word}
            </motion.button>
          );
        })}
        {Object.keys(placed).length === items.length && (
          <p className="text-base font-bold text-ink-500">All placed!</p>
        )}
      </div>
    </motion.div>
  );
}
