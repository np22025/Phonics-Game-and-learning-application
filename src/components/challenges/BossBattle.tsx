import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx, speak } from "../../lib/audio";
import { PLAYER_NAME } from "../../config";
import type { BossRapidChallenge } from "../../types";

interface Props {
  challenge: BossRapidChallenge;
  onComplete: (correctCount: number, totalAnswered: number) => void;
}

export function BossBattle({ challenge, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(challenge.durationSec);
  const [bossHp, setBossHp] = useState(100);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [feedback, setFeedback] = useState<"hit" | "miss" | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const order = useMemo(() => {
    const arr = Array.from(
      { length: challenge.questions.length * 4 },
      (_, i) => i % challenge.questions.length
    );
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [challenge]);

  const totalAnsweredRef = useRef(0);
  const scoreRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) {
      setDone(true);
      sfx.bossDefeated();
      const t = setTimeout(
        () => onCompleteRef.current(scoreRef.current, totalAnsweredRef.current),
        1500
      );
      return () => clearTimeout(t);
    }
    if (timeLeft <= 5) sfx.tick();
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  useEffect(() => {
    if (bossHp <= 0 && !done) {
      setDone(true);
      sfx.bossDefeated();
      const t = setTimeout(
        () => onCompleteRef.current(scoreRef.current, totalAnsweredRef.current),
        1500
      );
      return () => clearTimeout(t);
    }
  }, [bossHp, done]);

  const q = challenge.questions[order[questionIdx % order.length]];

  function pick(idx: number) {
    if (locked || done) return;
    setLocked(true);
    setPicked(idx);
    totalAnsweredRef.current += 1;
    const correct = q.options[idx].correct;
    if (correct) {
      sfx.correct();
      setBossHp((h) => Math.max(0, h - 8));
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setFeedback("hit");
    } else {
      sfx.wrong();
      setBossHp((h) => Math.min(100, h + 4));
      setStreak(0);
      setFeedback("miss");
    }
    setFeedbackKey((k) => k + 1);
    setTimeout(() => {
      setLocked(false);
      setPicked(null);
      setFeedback(null);
      setQuestionIdx((i) => i + 1);
    }, 600);
  }

  useEffect(() => {
    if (q.speak) {
      const t = setTimeout(() => speak(q.speak!), 200);
      return () => clearTimeout(t);
    }
  }, [questionIdx, q]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card relative w-full max-w-3xl p-6 sm:p-8"
    >
      {/* HUD */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">⏱️</span>
          <span
            className={`text-3xl font-black ${
              timeLeft <= 5 ? "animate-pulse text-rose-600" : "text-ink-900"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="flex flex-1 flex-col items-stretch gap-1 px-4">
          <div className="flex items-center justify-between text-sm font-bold text-rose-700">
            <span>Trollgar HP</span>
            <span>{bossHp}</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border border-rose-700 bg-rose-100">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-rose-700"
              animate={{ width: `${bossHp}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-ink-500">SCORE</span>
          <span className="text-3xl font-black text-accent-700">{score}</span>
        </div>
      </div>

      <AnimatePresence>
        {streak >= 3 && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-3 inline-block rounded-full bg-gradient-to-r from-amber-300 to-orange-500 px-4 py-1 text-sm font-black text-white shadow-elev"
          >
            🔥 {PLAYER_NAME}'s {streak}-streak combo!
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="mb-5 text-center text-xl font-extrabold text-ink-900 sm:text-2xl">
        {q.prompt}
      </h2>

      <AnimatePresence>
        {feedback && (
          <motion.span
            key={feedbackKey}
            initial={{ y: 0, opacity: 1, scale: 0.8 }}
            animate={{ y: -60, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute right-8 top-32 text-3xl font-black ${
              feedback === "hit" ? "text-emerald-600" : "text-rose-600"
            }`}
            aria-hidden
          >
            {feedback === "hit" ? "+8 HIT!" : "MISS"}
          </motion.span>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {q.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const className = `option-tile ${showResult ? (opt.correct ? "correct" : "wrong") : ""}`;
          return (
            <motion.button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              type="button"
              className={className}
              whileHover={locked ? {} : { y: -3, scale: 1.02 }}
              whileTap={locked ? {} : { scale: 0.96 }}
            >
              {opt.text}
            </motion.button>
          );
        })}
      </div>

      {done && (
        <p className="mt-5 text-center text-2xl font-black text-accent-700">
          {bossHp <= 0
            ? `${PLAYER_NAME} DEFEATED TROLLGAR! 🎉`
            : `Time! Great job, ${PLAYER_NAME}!`}
        </p>
      )}
    </motion.div>
  );
}
