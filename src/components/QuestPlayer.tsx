import { useEffect, useMemo, useState } from "react";
import { sfx } from "../lib/audio";
import type { Quest } from "../types";
import { MultipleChoice } from "./challenges/MultipleChoice";
import { ListenAndPick } from "./challenges/ListenAndPick";
import { WordSort } from "./challenges/WordSort";
import { SentenceFill } from "./challenges/SentenceFill";
import { TrueFalse } from "./challenges/TrueFalse";
import { BossBattle } from "./challenges/BossBattle";
import { HeroByName, ThemeBackdrop } from "./Characters";
import { Confetti } from "./Confetti";

interface Props {
  quest: Quest;
  onExit: (result: { stars: number; completed: boolean }) => void;
}

type Phase = "intro" | "playing" | "summary";

export function QuestPlayer({ quest, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const total = quest.challenges.length;
  const challenge = quest.challenges[idx];

  const stars = useMemo(() => {
    if (total === 0) return 0;
    const ratio = correctCount / total;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.45) return 1;
    return 0;
  }, [correctCount, total]);

  function handleAnswer(correct: boolean) {
    if (correct) setCorrectCount((c) => c + 1);
    else setMissCount((m) => m + 1);
    if (idx + 1 >= total) {
      setPhase("summary");
    } else {
      setIdx((i) => i + 1);
    }
  }

  function handleBossComplete(score: number, totalAnswered: number) {
    // Boss counts as a single challenge worth up to 1.0 of stars
    setCorrectCount((c) => c + Math.min(1, score / Math.max(1, totalAnswered)));
    setPhase("summary");
  }

  useEffect(() => {
    if (phase === "summary") {
      if (stars >= 2) {
        sfx.win();
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(t);
      } else if (stars === 1) {
        sfx.levelUp();
      } else {
        sfx.levelUp();
      }
    }
  }, [phase, stars]);

  const themeClass =
    quest.theme === "troll"
      ? "theme-troll"
      : quest.theme === "spider"
        ? "theme-spider"
        : quest.theme === "explorer"
          ? "theme-explorer"
          : "theme-magic";

  return (
    <div className={`relative min-h-screen w-full ${themeClass}`}>
      <ThemeBackdrop theme={quest.theme} />
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 px-4 py-6">
        {/* top bar */}
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => {
              sfx.click();
              onExit({ stars, completed: phase === "summary" });
            }}
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-gray-800 shadow hover:bg-white"
            type="button"
          >
            ← Map
          </button>
          {phase === "playing" && (
            <div className="flex flex-1 items-center px-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${((idx) / total) * 100}%` }}
                />
              </div>
            </div>
          )}
          {phase === "playing" && (
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-gray-800 shadow">
              ✓ {correctCount} · ✗ {missCount}
            </span>
          )}
        </div>

        {phase === "intro" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <HeroByName name={quest.hero} size={160} className="animate-bouncey" />
            <h1 className="max-w-3xl text-4xl font-extrabold text-gray-900 glow sm:text-5xl">
              {quest.title}
            </h1>
            <p className="max-w-2xl text-xl font-semibold text-gray-700">{quest.tagline}</p>
            <div className="max-w-xl rounded-3xl bg-white/85 p-5 text-lg leading-relaxed text-gray-800 shadow-xl">
              {quest.intro}
            </div>
            <p className="text-sm font-bold text-gray-700">
              {total} challenge{total === 1 ? "" : "s"} · Reward: {quest.reward}
            </p>
            <button
              onClick={() => {
                sfx.whoosh();
                setPhase("playing");
              }}
              className="tile-shadow rounded-full bg-gradient-to-br from-pink-500 to-purple-600 px-10 py-5 text-2xl font-extrabold text-white transition hover:from-pink-400 hover:to-purple-500"
              type="button"
            >
              Start Quest →
            </button>
          </div>
        )}

        {phase === "playing" && (
          <div className="flex w-full flex-1 items-center justify-center">
            {challenge.type === "multiple-choice" && (
              <MultipleChoice
                challenge={challenge}
                onAnswer={handleAnswer}
                questionNumber={idx + 1}
                totalQuestions={total}
              />
            )}
            {challenge.type === "listen-and-pick" && (
              <ListenAndPick
                challenge={challenge}
                onAnswer={handleAnswer}
                questionNumber={idx + 1}
                totalQuestions={total}
              />
            )}
            {challenge.type === "word-sort" && (
              <WordSort
                challenge={challenge}
                onAnswer={handleAnswer}
                questionNumber={idx + 1}
                totalQuestions={total}
              />
            )}
            {challenge.type === "sentence-fill" && (
              <SentenceFill
                challenge={challenge}
                onAnswer={handleAnswer}
                questionNumber={idx + 1}
                totalQuestions={total}
              />
            )}
            {challenge.type === "true-false" && (
              <TrueFalse
                challenge={challenge}
                onAnswer={handleAnswer}
                questionNumber={idx + 1}
                totalQuestions={total}
              />
            )}
            {challenge.type === "boss-rapid" && (
              <BossBattle challenge={challenge} onComplete={handleBossComplete} />
            )}
          </div>
        )}

        {phase === "summary" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            {showConfetti && <Confetti />}
            <HeroByName name={quest.hero} size={160} className="animate-bouncey" />
            <h2 className="text-5xl font-extrabold text-gray-900 glow">
              {stars >= 2 ? "QUEST COMPLETE!" : "Good try!"}
            </h2>
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`text-6xl ${i < stars ? "animate-pop text-yellow-400" : "text-gray-300"}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-800">
              You earned <span className="text-purple-700">{quest.reward}</span>!
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Score: {correctCount.toFixed(0)} / {total} · Misses: {missCount}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  sfx.click();
                  onExit({ stars, completed: true });
                }}
                className="tile-shadow rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 px-8 py-4 text-xl font-extrabold text-white"
                type="button"
              >
                Back to Map
              </button>
              <button
                onClick={() => {
                  sfx.click();
                  setIdx(0);
                  setCorrectCount(0);
                  setMissCount(0);
                  setPhase("playing");
                }}
                className="tile-shadow rounded-full bg-white px-8 py-4 text-xl font-extrabold text-gray-800"
                type="button"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
