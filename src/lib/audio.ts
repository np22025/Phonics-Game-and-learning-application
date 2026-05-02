// Audio system: speech synthesis for phonics + procedural sound effects.
// We avoid bundling audio files so the app stays light and works offline.

let audioCtx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Play a quick procedural tone. Used for click/correct/wrong feedback.
function tone(opts: {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  attack?: number;
  release?: number;
  detune?: number;
}) {
  const ctx = getCtx();
  if (!ctx) return;
  const {
    freq,
    duration,
    type = "sine",
    volume = 0.18,
    attack = 0.005,
    release = 0.06,
    detune = 0,
  } = opts;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.linearRampToValueAtTime(0, now + duration + release);
  osc.start(now);
  osc.stop(now + duration + release + 0.05);
}

export const sfx = {
  click() {
    tone({ freq: 660, duration: 0.05, type: "triangle", volume: 0.12 });
  },
  correct() {
    tone({ freq: 660, duration: 0.08, type: "sine", volume: 0.16 });
    setTimeout(() => tone({ freq: 990, duration: 0.12, type: "sine", volume: 0.18 }), 80);
  },
  wrong() {
    tone({ freq: 220, duration: 0.18, type: "sawtooth", volume: 0.12 });
    setTimeout(() => tone({ freq: 165, duration: 0.18, type: "sawtooth", volume: 0.12 }), 100);
  },
  star() {
    tone({ freq: 880, duration: 0.06, type: "triangle", volume: 0.14 });
    setTimeout(() => tone({ freq: 1320, duration: 0.06, type: "triangle", volume: 0.14 }), 70);
    setTimeout(() => tone({ freq: 1760, duration: 0.1, type: "triangle", volume: 0.14 }), 140);
  },
  win() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((f, i) => {
      setTimeout(() => tone({ freq: f, duration: 0.18, type: "triangle", volume: 0.18 }), i * 110);
    });
  },
  levelUp() {
    const notes = [392, 523, 659, 784];
    notes.forEach((f, i) => {
      setTimeout(() => tone({ freq: f, duration: 0.14, type: "sine", volume: 0.18 }), i * 90);
    });
  },
  whoosh() {
    tone({ freq: 1200, duration: 0.18, type: "sine", volume: 0.12, detune: -1200 });
  },
  tick() {
    tone({ freq: 1100, duration: 0.04, type: "square", volume: 0.06 });
  },
  bossDefeated() {
    const notes = [392, 523, 659, 784, 988, 1319];
    notes.forEach((f, i) => {
      setTimeout(() => tone({ freq: f, duration: 0.2, type: "triangle", volume: 0.2 }), i * 130);
    });
  },
};

// Speech synthesis. We try to pick a friendly voice when available, but
// fall back to the default voice rather than failing.
let preferredVoice: SpeechSynthesisVoice | null = null;
function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (preferredVoice) return preferredVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefer = [
    /Samantha/i,
    /Karen/i,
    /Google US English/i,
    /Microsoft Aria/i,
    /Microsoft Jenny/i,
    /Daniel/i,
    /English/i,
  ];
  for (const re of prefer) {
    const v = voices.find((vc) => re.test(vc.name));
    if (v) {
      preferredVoice = v;
      return v;
    }
  }
  preferredVoice = voices[0];
  return preferredVoice;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    preferredVoice = null;
    pickVoice();
  };
}

export function speak(text: string, opts: { rate?: number; pitch?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.rate = opts.rate ?? 0.92;
    u.pitch = opts.pitch ?? 1.05;
    u.lang = u.voice?.lang ?? "en-US";
    window.speechSynthesis.speak(u);
  } catch {
    // Speech is a nice-to-have; fail silently if the browser blocks it.
  }
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // ignore
  }
}

// Some browsers require a user gesture before audio plays. Call this on the
// first click anywhere in the app to "warm up" the audio context and the
// speech queue.
export function primeAudio() {
  getCtx();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      // Empty utterance - unlocks speech on iOS Safari.
      const u = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  }
}
