// Modern Web Audio system with procedural reverb + layered chimes.
// Replaces the bare-oscillator beeps with Duolingo-style satisfying SFX.
// All sounds are generated at runtime — no audio files needed.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let reverbNode: ConvolverNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
      // Build the reverb / mix bus once.
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.85;
      masterGain.connect(audioCtx.destination);

      dryGain = audioCtx.createGain();
      dryGain.gain.value = 0.85;
      dryGain.connect(masterGain);

      wetGain = audioCtx.createGain();
      wetGain.gain.value = 0.35;
      wetGain.connect(masterGain);

      reverbNode = audioCtx.createConvolver();
      reverbNode.buffer = generateReverbImpulse(audioCtx, 1.6, 2.5);
      reverbNode.connect(wetGain);
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Procedurally generate a soft hall reverb impulse (no audio files needed).
function generateReverbImpulse(ctx: AudioContext, durationSec: number, decay: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const length = Math.floor(sr * durationSec);
  const buffer = ctx.createBuffer(2, length, sr);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

// Connect a node to both dry and reverb sends.
function routeWithReverb(node: AudioNode, wetAmount = 0.35) {
  if (!dryGain || !wetGain || !reverbNode) return;
  node.connect(dryGain);
  // Dynamic wet send — re-create per voice to allow varying wet amounts.
  const send = audioCtx!.createGain();
  send.gain.value = wetAmount;
  node.connect(send);
  send.connect(reverbNode);
}

// One-shot tone with envelope.
interface ToneOpts {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  attack?: number;
  release?: number;
  detune?: number;
  delay?: number; // seconds before this tone fires
  wet?: number; // 0-1 reverb amount
}
function tone(opts: ToneOpts) {
  const ctx = getCtx();
  if (!ctx) return;
  const {
    freq,
    duration,
    type = "sine",
    volume = 0.18,
    attack = 0.005,
    release = 0.12,
    detune = 0,
    delay = 0,
    wet = 0.3,
  } = opts;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  osc.connect(gain);
  routeWithReverb(gain, wet);
  const start = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + attack);
  gain.gain.linearRampToValueAtTime(volume * 0.7, start + duration * 0.5);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration + release);
  osc.start(start);
  osc.stop(start + duration + release + 0.05);
}

// Quick noise burst (used for soft "wrong" thuds and shimmer layers).
function noise(opts: { duration: number; volume?: number; type?: "white" | "pink"; delay?: number; lowpass?: number }) {
  const ctx = getCtx();
  if (!ctx) return;
  const { duration, volume = 0.1, type = "pink", delay = 0, lowpass = 4000 } = opts;
  const sr = ctx.sampleRate;
  const length = Math.floor(sr * duration);
  const buf = ctx.createBuffer(1, length, sr);
  const data = buf.getChannelData(0);
  if (type === "pink") {
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.96300 * b1 + w * 0.2965164;
      b2 = 0.57000 * b2 + w * 1.0526913;
      data[i] = (b0 + b1 + b2 + w * 0.1848) * 0.11;
    }
  } else {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = lowpass;
  const g = ctx.createGain();
  src.connect(filter);
  filter.connect(g);
  routeWithReverb(g, 0.2);
  const start = ctx.currentTime + delay;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(volume, start + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  src.start(start);
  src.stop(start + duration + 0.1);
}

// Major-scale frequencies (C major)
const C_MAJOR = {
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
  D6: 1174.66,
  E6: 1318.51,
  G6: 1567.98,
};

export const sfx = {
  // Soft tap — used for navigation clicks.
  click() {
    tone({ freq: 1100, duration: 0.04, type: "triangle", volume: 0.08, wet: 0.15 });
  },
  // Duolingo-style correct: 3-note rising arpeggio with sparkle layer.
  correct() {
    tone({ freq: C_MAJOR.E5, duration: 0.12, type: "triangle", volume: 0.18, wet: 0.4 });
    tone({ freq: C_MAJOR.G5, duration: 0.12, type: "triangle", volume: 0.18, wet: 0.4, delay: 0.08 });
    tone({ freq: C_MAJOR.C6, duration: 0.18, type: "triangle", volume: 0.2, wet: 0.5, delay: 0.16 });
    // Sparkle shimmer
    tone({ freq: C_MAJOR.E6, duration: 0.18, type: "sine", volume: 0.06, wet: 0.6, delay: 0.18 });
  },
  // Soft wrong — never harsh. A muted thud + brief downward sigh.
  wrong() {
    noise({ duration: 0.18, volume: 0.06, lowpass: 600 });
    tone({ freq: 220, duration: 0.18, type: "sine", volume: 0.1, wet: 0.2, delay: 0.04 });
    tone({ freq: 175, duration: 0.22, type: "sine", volume: 0.08, wet: 0.2, delay: 0.12 });
  },
  // Star earned — single bright chime.
  star() {
    tone({ freq: C_MAJOR.G5, duration: 0.08, type: "triangle", volume: 0.16, wet: 0.5 });
    tone({ freq: C_MAJOR.C6, duration: 0.08, type: "triangle", volume: 0.16, wet: 0.5, delay: 0.06 });
    tone({ freq: C_MAJOR.E6, duration: 0.18, type: "triangle", volume: 0.18, wet: 0.6, delay: 0.12 });
  },
  // Quest cleared — full triumphant arpeggio.
  win() {
    const seq = [C_MAJOR.C5, C_MAJOR.E5, C_MAJOR.G5, C_MAJOR.C6, C_MAJOR.E6];
    seq.forEach((f, i) => tone({ freq: f, duration: 0.18, type: "triangle", volume: 0.2, wet: 0.5, delay: i * 0.08 }));
    // Bell layer
    tone({ freq: C_MAJOR.G6, duration: 0.5, type: "sine", volume: 0.08, wet: 0.7, delay: 0.4 });
  },
  // Level up / streak bonus.
  levelUp() {
    const seq = [C_MAJOR.G5, C_MAJOR.C6, C_MAJOR.E6, C_MAJOR.G6];
    seq.forEach((f, i) => tone({ freq: f, duration: 0.14, type: "triangle", volume: 0.18, wet: 0.5, delay: i * 0.06 }));
  },
  // Whoosh transition — quest selection / scene change.
  whoosh() {
    noise({ duration: 0.4, volume: 0.06, lowpass: 2200 });
  },
  // Boss tick (last 5 seconds).
  tick() {
    tone({ freq: 1500, duration: 0.04, type: "square", volume: 0.05, wet: 0.1 });
  },
  // Boss defeated — big triumphant cascade.
  bossDefeated() {
    const seq = [C_MAJOR.C5, C_MAJOR.E5, C_MAJOR.G5, C_MAJOR.C6, C_MAJOR.E6, C_MAJOR.G6];
    seq.forEach((f, i) => tone({ freq: f, duration: 0.22, type: "triangle", volume: 0.22, wet: 0.5, delay: i * 0.1 }));
    tone({ freq: C_MAJOR.C6, duration: 0.8, type: "sine", volume: 0.1, wet: 0.7, delay: 0.7 });
  },
  // Rescue success — character freed!
  rescue() {
    // Sparkle
    [0, 0.05, 0.12, 0.2].forEach((d, i) => {
      tone({ freq: C_MAJOR.E6 + i * 50, duration: 0.18, type: "sine", volume: 0.1, wet: 0.6, delay: d });
    });
    // Triumphant chord
    [C_MAJOR.C5, C_MAJOR.E5, C_MAJOR.G5, C_MAJOR.C6].forEach((f) => {
      tone({ freq: f, duration: 0.6, type: "triangle", volume: 0.14, wet: 0.6, delay: 0.25 });
    });
  },
  // Streak combo — increasingly punchy as streak grows.
  streak(level: number) {
    const base = C_MAJOR.C5 * Math.pow(1.122462, Math.min(level, 12)); // semitone steps
    tone({ freq: base, duration: 0.1, type: "triangle", volume: 0.16, wet: 0.4 });
    tone({ freq: base * 1.5, duration: 0.16, type: "triangle", volume: 0.16, wet: 0.5, delay: 0.06 });
  },
};

// Speech synthesis with smarter voice selection.
let preferredVoice: SpeechSynthesisVoice | null = null;
function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (preferredVoice) return preferredVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer enhanced/premium voices first.
  const prefer = [
    /Samantha.*Premium/i,
    /Samantha/i,
    /Karen/i,
    /Allison/i,
    /Ava/i,
    /Microsoft Aria/i,
    /Microsoft Jenny/i,
    /Google US English/i,
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

// Chrome's speechSynthesis has a known bug where it auto-pauses after ~15s
// of silence. We work around it by pinging pause/resume periodically.
let keepaliveStarted = false;
function startSpeechKeepalive() {
  if (keepaliveStarted) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  keepaliveStarted = true;
  setInterval(() => {
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    } catch {
      // ignore
    }
  }, 5000);
}

export function speak(text: string, opts: { rate?: number; pitch?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  if (!text) return;
  try {
    // Cancel anything already queued. On some browsers this leaves the
    // synth in a paused state, so we always call resume() before speaking.
    window.speechSynthesis.cancel();
    // Tiny delay lets cancel() fully take effect on Chrome — without this
    // the next utterance can be silently dropped.
    setTimeout(() => {
      try {
        const u = new SpeechSynthesisUtterance(text);
        const voice = pickVoice();
        if (voice) u.voice = voice;
        u.rate = opts.rate ?? 0.95;
        u.pitch = opts.pitch ?? 1.05;
        u.lang = u.voice?.lang ?? "en-US";
        // Resume in case the synth is paused (Chrome bug).
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(u);
        startSpeechKeepalive();
      } catch {
        // ignore
      }
    }, 30);
  } catch {
    // ignore
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

export function primeAudio() {
  getCtx();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      // Empty utterance unlocks speech on iOS Safari.
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      window.speechSynthesis.speak(u);
      window.speechSynthesis.resume();
      // Force voice list to populate.
      window.speechSynthesis.getVoices();
      startSpeechKeepalive();
    } catch {
      // ignore
    }
  }
}
