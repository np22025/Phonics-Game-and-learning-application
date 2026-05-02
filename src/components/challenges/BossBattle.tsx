import { useEffect, useMemo, useRef, useState } from "react";
import { sfx, speak } from "../../lib/audio";
import { PLAYER_NAME } from "../../config";
import type { BossRapidChallenge } from "../../types";

interface Props {
  challenge: BossRapidChallenge;
  onComplete: (correctCount: number, totalAnswered: number) => void;
}

// Boss battle: rapid-fire questions for `durationSec` seconds. Each correct
// answer damages the boss (HP bar decreases); each wrong answer heals him.
// At the end, score is forwarded as success based on correctCount > 0.
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
    // Pre-shuffle a long sequence of question indices so boss battle feels random
    // but reproducible per mount.
    const arr = Array.from({ length: challenge.questions.length * 4 }, (_, i) => i % challenge.questions.length);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [challenge]);

  const totalAnsweredRef = useRef(0);
  const scoreRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  // Keep refs in sync so the timer effect can read latest values without
  // re-running and resetting its own setTimeout.
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Tick down the timer every second. Effect deps are intentionally minimal —
  // we read score/onComplete via refs so a click doesn't reset the countdown.
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

  // Boss is defeated early?
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

  // Auto-speak prompts that include audio cues.
  useEffect(() => {
    if (q.speak) {
      const t = setTimeout(() => speak(q.speak!), 200);
      return () => clearTimeout(t);
    }
  }, [questionIdx, q]);

  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center gap-5 rounded-3xl bg-white/90 p-6 shadow-2xl backdrop-blur sm:p-8">
      {/* HUD */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⏱️</span>
          <span
            className={`text-3xl font-extrabold ${
              timeLeft <= 5 ? "animate-pulse text-red-600" : "text-gray-800"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="flex flex-1 flex-col items-stretch gap-1">
          <div className="flex items-center justify-between text-sm font-bold text-red-700">
            <span>Trollgar HP</span>
            <span>{bossHp}</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border border-red-700 bg-red-100">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-rose-700 transition-all duration-300"
              style={{ width: `${bossHp}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-gray-500">SCORE</span>
          <span className="text-3xl font-extrabold text-purple-700">{score}</span>
        </div>
      </div>
      {streak >= 3 && (
        <div className="rounded-full bg-yellow-300 px-4 py-1 text-sm font-extrabold text-yellow-900 animate-bouncey">
          🔥 {PLAYER_NAME}'s {streak}-streak combo! +bonus damage!
        </div>
      )}

      {/* Question */}
      <h2 className="text-center text-xl font-bold text-gray-800 sm:text-2xl">{q.prompt}</h2>

      {/* Floating hit/miss feedback */}
      {feedback && (
        <span
          key={feedbackKey}
          className={`absolute right-8 top-24 text-3xl font-extrabold animate-float-up ${
            feedback === "hit" ? "text-green-600" : "text-red-600"
          }`}
          aria-hidden
        >
          {feedback === "hit" ? "+8 HIT!" : "MISS"}
        </span>
      )}

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {q.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const showResult = locked && isPicked;
          const cls = showResult
            ? opt.correct
              ? "bg-green-400 text-white animate-pop"
              : "bg-red-400 text-white animate-shake"
            : "bg-gradient-to-br from-orange-300 to-red-400 hover:from-orange-200 hover:to-red-300 text-gray-900";
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
      {done && (
        <p className="text-center text-2xl font-extrabold text-purple-700">
          {bossHp <= 0
            ? `${PLAYER_NAME} DEFEATED TROLLGAR! 🎉`
            : `Time! Great job, ${PLAYER_NAME}!`}
        </p>
      )}
    </div>
  );
}
