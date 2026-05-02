import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "../lib/audio";
import { PLAYER_NAME } from "../config";
import { CHARACTERS } from "../data/characters";
import type { Quest } from "../types";
import { MultipleChoice } from "./challenges/MultipleChoice";
import { ListenAndPick } from "./challenges/ListenAndPick";
import { WordSort } from "./challenges/WordSort";
import { SentenceFill } from "./challenges/SentenceFill";
import { TrueFalse } from "./challenges/TrueFalse";
import { BossBattle } from "./challenges/BossBattle";
import { CharacterImage } from "./CharacterImage";
import { Confetti } from "./Confetti";
import { Particles } from "./Particles";
import { RescueProgress } from "./RescueProgress";
import { FloatingFeedback, pickNice, pickTry } from "./Feedback";

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
  const [floatFeedback, setFloatFeedback] = useState<{
    show: boolean;
    type: "correct" | "wrong";
    message: string;
  }>({ show: false, type: "correct", message: "" });

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

  // Rescue progress: scales with correctly-answered challenges.
  const rescueProgress = total === 0 ? 0 : correctCount / total;
  const rescued = phase === "summary" && stars >= 1;

  function handleAnswer(correct: boolean) {
    if (correct) {
      setCorrectCount((c) => c + 1);
      setFloatFeedback({ show: true, type: "correct", message: pickNice() });
    } else {
      setMissCount((m) => m + 1);
      setFloatFeedback({ show: true, type: "wrong", message: pickTry() });
    }
    // Auto-hide feedback pill after a moment
    setTimeout(() => setFloatFeedback((f) => ({ ...f, show: false })), 1100);

    if (idx + 1 >= total) {
      setPhase("summary");
    } else {
      setIdx((i) => i + 1);
    }
  }

  function handleBossComplete(score: number, totalAnswered: number) {
    setCorrectCount((c) => c + Math.min(1, score / Math.max(1, totalAnswered)));
    setPhase("summary");
  }

  useEffect(() => {
    if (phase === "summary") {
      if (stars >= 1) sfx.rescue();
      if (stars >= 2) {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 3500);
        return () => clearTimeout(t);
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

  const charDef = quest.rescueCharacter ? CHARACTERS[quest.rescueCharacter] : null;

  return (
    <div className={`relative min-h-screen w-full ${themeClass}`}>
      <Particles count={14} />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 px-4 py-6">
        {/* Top bar */}
        <div className="flex w-full items-center justify-between gap-3">
          <button
            onClick={() => {
              sfx.click();
              onExit({ stars, completed: phase === "summary" });
            }}
            className="btn-ghost"
            type="button"
          >
            ← Map
          </button>
          {phase === "playing" && (
            <div className="flex flex-1 items-center px-2">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                  animate={{ width: `${(idx / total) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
              </div>
            </div>
          )}
          {phase === "playing" && (
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-extrabold text-white backdrop-blur-md">
              ✓ {correctCount} · ✗ {missCount}
            </span>
          )}
        </div>

        {/* Rescue progress (always visible during play if quest has a character) */}
        {phase === "playing" && quest.rescueCharacter && (
          <RescueProgress
            characterId={quest.rescueCharacter}
            progress={rescueProgress}
            rescued={false}
          />
        )}

        {/* Floating feedback pill */}
        <FloatingFeedback show={floatFeedback.show} type={floatFeedback.type} message={floatFeedback.message} />

        {/* Phase content */}
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
            >
              {quest.rescueCharacter ? (
                <CharacterImage
                  characterId={quest.rescueCharacter}
                  size={180}
                  className="drop-shadow-2xl"
                />
              ) : null}
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {quest.title}
              </h1>
              <p className="max-w-2xl text-xl font-semibold text-white/85">{quest.tagline}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card max-w-xl p-6 text-lg leading-relaxed text-ink-800"
              >
                <p className="mb-2 font-extrabold text-accent-700">{PLAYER_NAME}, listen up!</p>
                {quest.intro}
              </motion.div>
              <p className="text-sm font-bold text-white/70">
                {total} challenge{total === 1 ? "" : "s"} · Reward: {quest.reward}
              </p>
              <motion.button
                onClick={() => {
                  sfx.whoosh();
                  setPhase("playing");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                type="button"
              >
                Let's go, {PLAYER_NAME}! →
              </motion.button>
            </motion.div>
          )}

          {phase === "playing" && (
            <motion.div
              key={`play-${idx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-1 items-center justify-center"
            >
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
            </motion.div>
          )}

          {phase === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
            >
              {showConfetti && <Confetti />}
              {quest.rescueCharacter && (
                <RescueProgress
                  characterId={quest.rescueCharacter}
                  progress={1}
                  rescued={rescued}
                />
              )}
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-black text-white sm:text-5xl lg:text-6xl"
              >
                {stars >= 3
                  ? `LEGENDARY, ${PLAYER_NAME}!`
                  : stars >= 2
                    ? `AMAZING, ${PLAYER_NAME}!`
                    : stars >= 1
                      ? `Nice work, ${PLAYER_NAME}!`
                      : `Keep going, ${PLAYER_NAME}!`}
              </motion.h2>

              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{
                      scale: i < stars ? 1 : 0.6,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.3 + i * 0.18,
                      type: "spring",
                      stiffness: 250,
                      damping: 14,
                    }}
                    className={`text-7xl ${i < stars ? "star-3d" : "text-white/20"}`}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p className="text-2xl font-bold text-white">
                {PLAYER_NAME}, you earned <span className="text-amber-300">{quest.reward}</span>!
              </p>
              {charDef && rescued && (
                <p className="text-lg font-semibold text-white/85">"{charDef.rescueCheer}"</p>
              )}
              <p className="text-base font-semibold text-white/75">
                {Math.round(correctCount)} / {total} correct · {missCount} miss{missCount === 1 ? "" : "es"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  onClick={() => {
                    sfx.click();
                    onExit({ stars, completed: true });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  type="button"
                >
                  Back to Map
                </motion.button>
                <motion.button
                  onClick={() => {
                    sfx.click();
                    setIdx(0);
                    setCorrectCount(0);
                    setMissCount(0);
                    setPhase("playing");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                  type="button"
                >
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
