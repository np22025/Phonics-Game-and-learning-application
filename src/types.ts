// Domain types for Phonics Quest.
// Quests are the top-level adventures. Each quest contains an ordered list
// of "challenges" of varying types so the gameplay never feels repetitive.

export type Theme = "troll" | "spider" | "explorer" | "magic";

export type ChallengeType =
  | "multiple-choice"
  | "listen-and-pick"
  | "word-sort"
  | "sentence-fill"
  | "true-false"
  | "boss-rapid";

export interface MCOption {
  text: string;
  correct: boolean;
  // Optional: when present, the option is read out loud rather than displayed
  // (used for "listen and pick" challenges).
  speak?: string;
}

export interface MultipleChoiceChallenge {
  type: "multiple-choice";
  prompt: string;
  // Optional word that should be spoken aloud when the challenge appears.
  speak?: string;
  options: MCOption[];
  hint?: string;
}

export interface ListenAndPickChallenge {
  type: "listen-and-pick";
  prompt: string;
  // The word that will be read out loud. Players must pick the correct spelling.
  spokenWord: string;
  options: { text: string; correct: boolean }[];
  hint?: string;
}

export interface WordSortChallenge {
  type: "word-sort";
  prompt: string;
  buckets: string[]; // labels e.g. ["CH", "SH"]
  // Each item belongs to exactly one bucket index.
  items: { word: string; bucket: number }[];
  hint?: string;
}

export interface SentenceFillChallenge {
  type: "sentence-fill";
  // Use {} as the placeholder for the missing word.
  sentence: string;
  options: { text: string; correct: boolean }[];
  hint?: string;
}

export interface TrueFalseChallenge {
  type: "true-false";
  prompt: string;
  speak?: string;
  answer: boolean;
  hint?: string;
}

export interface BossRapidChallenge {
  type: "boss-rapid";
  prompt: string;
  // 30 seconds of rapid-fire questions.
  durationSec: number;
  // Each round picks a random question from this list. Player must answer
  // as many as possible before the timer runs out.
  questions: {
    prompt: string;
    speak?: string;
    options: { text: string; correct: boolean }[];
  }[];
  hint?: string;
}

export type Challenge =
  | MultipleChoiceChallenge
  | ListenAndPickChallenge
  | WordSortChallenge
  | SentenceFillChallenge
  | TrueFalseChallenge
  | BossRapidChallenge;

export interface Quest {
  id: string;
  title: string;
  // Tagline shown on the map / quest card.
  tagline: string;
  // Backstory paragraph shown when the quest opens.
  intro: string;
  // What the player rescues/earns when they finish.
  reward: string;
  theme: Theme;
  // Mascot character key (rendered as SVG fallback).
  hero: "troll" | "spider" | "explorer" | "blippo";
  // The character being rescued in this quest. Optional — quests without
  // a rescueCharacter just show the hero mascot, no rescue mechanic.
  rescueCharacter?:
    | "pixel"
    | "nova"
    | "roar"
    | "whiskers"
    | "glimmer"
    | "tinker"
    | "sage"
    | "shadow";
  // Day this quest unlocks. Day 1 quests are available immediately.
  // Day N quests unlock on the Nth calendar day after the player's first session.
  unlockDay: number;
  challenges: Challenge[];
}

export interface PlayerProgress {
  // ISO date string of the very first session.
  firstPlayedDate: string;
  // ISO date string of the most recent session.
  lastPlayedDate: string;
  // Day number of the user's longest active streak.
  longestStreak: number;
  // Days played in a row, as of last session.
  currentStreak: number;
  // Total stars earned across all quests.
  totalStars: number;
  // Map from quest id -> { stars: 0..3, completed: boolean }
  questResults: Record<string, { stars: number; completed: boolean }>;
}
