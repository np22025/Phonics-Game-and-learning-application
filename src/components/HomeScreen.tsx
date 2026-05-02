import { motion } from "framer-motion";
import { sfx, speak } from "../lib/audio";
import { PLAYER_NAME } from "../config";
import { CHARACTERS } from "../data/characters";
import type { PlayerProgress, Quest } from "../types";
import { CharacterImage } from "./CharacterImage";
import { Particles } from "./Particles";

interface Props {
  quests: Quest[];
  lockedQuests: Quest[];
  progress: PlayerProgress;
  dayNumber: number;
  onSelect: (quest: Quest) => void;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export function HomeScreen({ quests, lockedQuests, progress, dayNumber, onSelect, onReset }: Props) {
  return (
    <div className="relative min-h-screen w-full theme-magic">
      <Particles />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        {/* Header */}
        <motion.header
          className="flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-400">
              Phonics Quest · Day {dayNumber}
            </p>
            <h1 className="mt-2 text-5xl font-black leading-tight text-white sm:text-6xl">
              Hey {PLAYER_NAME},
              <br />
              <span className="bg-gradient-to-r from-accent-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                ready to play?
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="stars-pill flex items-center gap-2 text-lg">
              <span className="text-2xl">★</span>
              {progress.totalStars}
            </div>
            <div className="streak-pill flex items-center gap-2 text-lg">
              <span className="text-2xl">🔥</span>
              {progress.currentStreak}-day
            </div>
          </div>
        </motion.header>

        {/* Hero card */}
        <motion.section
          className="card relative overflow-hidden p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-accent-400 to-pink-400 opacity-20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-3">
            <p className="text-2xl font-bold text-ink-900 sm:text-3xl">
              {quests.length} mission{quests.length === 1 ? "" : "s"} await you, {PLAYER_NAME} 🎯
            </p>
            <p className="text-base text-ink-500">
              Pick a quest to rescue your squad. Earn ★ stars by getting answers right. Build your streak by playing every day.
            </p>
          </div>
        </motion.section>

        {/* Quest grid */}
        <motion.section
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {quests.map((q) => {
            const result = progress.questResults[q.id];
            const stars = result?.stars ?? 0;
            const charDef = q.rescueCharacter ? CHARACTERS[q.rescueCharacter] : null;
            const accent = charDef?.accentColor ?? "#8b5cf6";
            const accentDark = charDef?.accentColorDark ?? "#5b21b6";
            return (
              <motion.button
                key={q.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sfx.whoosh();
                  speak(`${PLAYER_NAME}, let's go! ${q.title}`, { rate: 1 });
                  onSelect(q);
                }}
                type="button"
                className="group relative flex min-h-[260px] flex-col items-stretch overflow-hidden rounded-3xl p-6 text-left text-white shadow-elev"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accentDark} 100%)`,
                }}
              >
                {/* Decorative orb */}
                <div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl"
                  style={{ background: "white" }}
                />
                {/* Top row */}
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      Day {q.unlockDay}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">{q.title}</h3>
                  </div>
                  {q.rescueCharacter && (
                    <CharacterImage
                      characterId={q.rescueCharacter}
                      size={88}
                      className="drop-shadow-2xl transition group-hover:rotate-3"
                      animate={false}
                    />
                  )}
                </div>
                {/* Tagline */}
                <p className="relative mt-3 text-sm font-medium text-white/90">{q.tagline}</p>
                {/* Bottom row */}
                <div className="relative mt-auto flex items-center justify-between pt-5">
                  <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                    {q.challenges.length} challenge{q.challenges.length === 1 ? "" : "s"}
                  </span>
                  <div className="flex">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`text-2xl ${i < stars ? "text-yellow-300" : "text-white/30"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover gleam */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20" />
              </motion.button>
            );
          })}
        </motion.section>

        {/* Locked quests */}
        {lockedQuests.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="mb-4 text-2xl font-extrabold text-white/80">Coming soon</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lockedQuests.map((q) => (
                <div
                  key={q.id}
                  className="glass relative flex min-h-[120px] flex-col rounded-3xl p-5 opacity-60"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Unlocks Day {q.unlockDay}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-white">🔒 {q.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{q.tagline}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <footer className="flex items-center justify-center pt-4 text-xs text-white/40">
          <button
            onClick={() => {
              if (confirm("Reset all progress? Stars and streaks will be lost.")) {
                sfx.click();
                onReset();
              }
            }}
            className="rounded-full px-3 py-1 text-white/40 hover:bg-white/10"
            type="button"
          >
            Reset progress
          </button>
        </footer>
      </div>
    </div>
  );
}
