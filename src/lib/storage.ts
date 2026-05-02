import type { PlayerProgress } from "../types";

const KEY = "phonics-quest:progress:v1";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00Z").getTime();
  const db = new Date(b + "T00:00:00Z").getTime();
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

export function defaultProgress(): PlayerProgress {
  const today = todayISO();
  return {
    firstPlayedDate: today,
    lastPlayedDate: today,
    longestStreak: 1,
    currentStreak: 1,
    totalStars: 0,
    questResults: {},
  };
}

export function loadProgress(): PlayerProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const fresh = defaultProgress();
      window.localStorage.setItem(KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw) as PlayerProgress;
    return updateStreakOnLoad(parsed);
  } catch {
    return defaultProgress();
  }
}

function updateStreakOnLoad(p: PlayerProgress): PlayerProgress {
  const today = todayISO();
  if (p.lastPlayedDate === today) return p;
  const gap = daysBetween(p.lastPlayedDate, today);
  let nextStreak = p.currentStreak;
  if (gap === 1) {
    nextStreak += 1;
  } else if (gap > 1) {
    nextStreak = 1;
  }
  const updated: PlayerProgress = {
    ...p,
    currentStreak: nextStreak,
    longestStreak: Math.max(p.longestStreak, nextStreak),
    lastPlayedDate: today,
  };
  saveProgress(updated);
  return updated;
}

export function saveProgress(p: PlayerProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Storage quota or private mode - we silently degrade to in-session only.
  }
}

export function recordQuestResult(p: PlayerProgress, questId: string, stars: number): PlayerProgress {
  const prev = p.questResults[questId];
  const bestStars = Math.max(prev?.stars ?? 0, stars);
  const wasComplete = prev?.completed ?? false;
  const totalDelta = bestStars - (prev?.stars ?? 0);
  const next: PlayerProgress = {
    ...p,
    totalStars: p.totalStars + Math.max(0, totalDelta),
    questResults: {
      ...p.questResults,
      [questId]: { stars: bestStars, completed: wasComplete || stars > 0 },
    },
  };
  saveProgress(next);
  return next;
}

export function resetProgress(): PlayerProgress {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  }
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
}

// How many calendar days the player has been playing, with day 1 = first session.
export function dayNumber(p: PlayerProgress): number {
  return daysBetween(p.firstPlayedDate, todayISO()) + 1;
}
