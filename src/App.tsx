import { useEffect, useMemo, useState } from "react";
import { primeAudio, stopSpeaking } from "./lib/audio";
import { dayNumber, loadProgress, recordQuestResult, resetProgress } from "./lib/storage";
import { QUESTS } from "./data/quests";
import type { PlayerProgress, Quest } from "./types";
import { HomeScreen } from "./components/HomeScreen";
import { QuestPlayer } from "./components/QuestPlayer";

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [audioPrimed, setAudioPrimed] = useState(false);

  // Prime audio on first user gesture so iOS Safari and Chrome will let us play.
  useEffect(() => {
    if (audioPrimed) return;
    function handler() {
      primeAudio();
      setAudioPrimed(true);
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    }
    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [audioPrimed]);

  // Stop any speech when navigating between quests.
  useEffect(() => {
    return () => stopSpeaking();
  }, [activeQuest]);

  const day = dayNumber(progress);

  const { unlockedQuestList, lockedQuestList } = useMemo(() => {
    const unlocked: Quest[] = [];
    const locked: Quest[] = [];
    for (const q of QUESTS) {
      if (q.unlockDay <= day) unlocked.push(q);
      else locked.push(q);
    }
    return { unlockedQuestList: unlocked, lockedQuestList: locked };
  }, [day]);

  function selectQuest(q: Quest) {
    stopSpeaking();
    setActiveQuest(q);
  }

  function exitQuest(result: { stars: number; completed: boolean }) {
    stopSpeaking();
    if (activeQuest && result.completed && result.stars > 0) {
      const next = recordQuestResult(progress, activeQuest.id, result.stars);
      setProgress(next);
    }
    setActiveQuest(null);
  }

  function handleReset() {
    const fresh = resetProgress();
    setProgress(fresh);
    setActiveQuest(null);
  }

  if (activeQuest) {
    return <QuestPlayer quest={activeQuest} onExit={exitQuest} />;
  }
  return (
    <HomeScreen
      quests={unlockedQuestList}
      lockedQuests={lockedQuestList}
      progress={progress}
      dayNumber={day}
      onSelect={selectQuest}
      onReset={handleReset}
    />
  );
}
