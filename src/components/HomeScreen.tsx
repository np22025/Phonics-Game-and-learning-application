import { sfx, speak } from "../lib/audio";
import type { PlayerProgress, Quest } from "../types";
import { HeroByName, ThemeBackdrop } from "./Characters";

interface Props {
  quests: Quest[];
  lockedQuests: Quest[];
  progress: PlayerProgress;
  dayNumber: number;
  onSelect: (quest: Quest) => void;
  onReset: () => void;
}

export function HomeScreen({ quests, lockedQuests, progress, dayNumber, onSelect, onReset }: Props) {
  return (
    <div className="relative min-h-screen w-full theme-magic">
      <ThemeBackdrop theme="magic" />
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 glow sm:text-5xl">
              Phonics Quest
            </h1>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              Day {dayNumber} of your adventure!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-300 px-4 py-2 text-lg font-extrabold text-yellow-900 shadow">
              ⭐ {progress.totalStars}
            </div>
            <div className="rounded-full bg-orange-300 px-4 py-2 text-lg font-extrabold text-orange-900 shadow">
              🔥 {progress.currentStreak}-day streak
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-white/85 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {quests.length} quest{quests.length === 1 ? "" : "s"} unlocked today!
            </p>
            <p className="text-base text-gray-600">
              Tap a quest to begin. Earn ★ stars by answering correctly.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quests.map((q) => {
            const result = progress.questResults[q.id];
            const stars = result?.stars ?? 0;
            const themeAccent =
              q.theme === "troll"
                ? "from-orange-300 to-red-400"
                : q.theme === "spider"
                  ? "from-red-400 to-blue-700"
                  : q.theme === "explorer"
                    ? "from-emerald-300 to-sky-400"
                    : "from-pink-300 to-purple-500";
            return (
              <button
                key={q.id}
                onClick={() => {
                  sfx.whoosh();
                  speak(q.title, { rate: 1 });
                  onSelect(q);
                }}
                type="button"
                className={`tile-shadow group relative flex min-h-[210px] flex-col items-stretch overflow-hidden rounded-3xl bg-gradient-to-br ${themeAccent} p-5 text-left text-white transition-transform hover:scale-105`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      Quest · Day {q.unlockDay}
                    </span>
                    <h3 className="mt-1 text-xl font-extrabold leading-tight">{q.title}</h3>
                  </div>
                  <HeroByName name={q.hero} size={68} className="drop-shadow-md transition group-hover:animate-wiggle" />
                </div>
                <p className="mt-2 text-sm font-semibold opacity-95">{q.tagline}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-bold">
                    {q.challenges.length} challenge{q.challenges.length === 1 ? "" : "s"}
                  </span>
                  <div className="flex">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`text-2xl ${i < stars ? "text-yellow-300" : "text-white/30"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {lockedQuests.length > 0 && (
          <section>
            <h2 className="mb-3 text-2xl font-extrabold text-gray-800">Coming soon...</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lockedQuests.map((q) => (
                <div
                  key={q.id}
                  className="relative flex min-h-[140px] cursor-not-allowed flex-col rounded-3xl bg-gray-100 p-5 opacity-70"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Unlocks on Day {q.unlockDay}
                      </span>
                      <h3 className="mt-1 text-xl font-extrabold text-gray-700">🔒 {q.title}</h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-gray-600">{q.tagline}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="flex items-center justify-center pt-4 text-sm text-gray-600">
          <button
            onClick={() => {
              if (confirm("Reset all progress? Stars and streaks will be lost.")) {
                sfx.click();
                onReset();
              }
            }}
            className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-gray-700 hover:bg-white"
            type="button"
          >
            Reset progress
          </button>
        </footer>
      </div>
    </div>
  );
}
