import type { Quest } from "../types";

// =============================================================================
// PHONICS QUEST CURRICULUM
// =============================================================================
// To add a new quest tomorrow, copy any quest object below, update the id,
// title, theme, and challenges, then push to GitHub. Lovable picks up the
// change automatically.
//
// To control the unlock day:
//   unlockDay: 1   -> unlocks immediately
//   unlockDay: N   -> unlocks N days after the player's first session
// =============================================================================

export const QUESTS: Quest[] = [
  // ===========================================================================
  // QUEST 1 — CH sound (Cheese Cave Rescue, troll theme)
  // ===========================================================================
  {
    id: "ch-sound-cheese-cave",
    title: "The Cheese Cave Rescue",
    tagline: "Trollgar locked the cheese! Use the CH sound to set it free.",
    intro:
      "Trollgar the grumpy troll has trapped a giant wheel of cheddar in his Cheese Cave. The lock only opens for words with the CH sound. Manas, only YOU can save the cheese!",
    reward: "Golden Cheese Wheel",
    theme: "troll",
    hero: "troll",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word starts with the CH sound?",
        options: [
          { text: "chair", correct: true, speak: "chair" },
          { text: "ship", correct: false, speak: "ship" },
          { text: "tree", correct: false, speak: "tree" },
          { text: "fan", correct: false, speak: "fan" },
        ],
        hint: "Listen for the /ch/ sound at the very start.",
      },
      {
        type: "multiple-choice",
        prompt: "Click the word that has the CH sound.",
        options: [
          { text: "cheese", correct: true, speak: "cheese" },
          { text: "fish", correct: false, speak: "fish" },
          { text: "bath", correct: false, speak: "bath" },
          { text: "soap", correct: false, speak: "soap" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen carefully. Which spelling is correct?",
        spokenWord: "cherry",
        options: [
          { text: "cherry", correct: true },
          { text: "sherry", correct: false },
          { text: "ferry", correct: false },
          { text: "kerry", correct: false },
        ],
        hint: "It tastes sweet and grows on trees!",
      },
      {
        type: "multiple-choice",
        prompt: "Which word does NOT have the CH sound?",
        options: [
          { text: "lunch", correct: false, speak: "lunch" },
          { text: "watch", correct: false, speak: "watch" },
          { text: "moon", correct: true, speak: "moon" },
          { text: "branch", correct: false, speak: "branch" },
        ],
      },
      {
        type: "word-sort",
        prompt: "Drop each word into the right basket.",
        buckets: ["Has CH", "No CH"],
        items: [
          { word: "chip", bucket: 0 },
          { word: "soap", bucket: 1 },
          { word: "child", bucket: 0 },
          { word: "moon", bucket: 1 },
          { word: "beach", bucket: 0 },
          { word: "rain", bucket: 1 },
          { word: "much", bucket: 0 },
          { word: "tree", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I sat on a {} and ate my lunch.",
        options: [
          { text: "chair", correct: true },
          { text: "share", correct: false },
          { text: "stair", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Pick the word you hear.",
        spokenWord: "chase",
        options: [
          { text: "chase", correct: true },
          { text: "case", correct: false },
          { text: "vase", correct: false },
          { text: "race", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "Does the word 'beach' end with the CH sound?",
        speak: "beach",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "Does the word 'fish' end with the CH sound?",
        speak: "fish",
        answer: false,
        hint: "Listen carefully — 'fish' ends with SH, not CH.",
      },
      {
        type: "multiple-choice",
        prompt: "Which word ends with the CH sound?",
        options: [
          { text: "sandwich", correct: true, speak: "sandwich" },
          { text: "table", correct: false, speak: "table" },
          { text: "garden", correct: false, speak: "garden" },
          { text: "window", correct: false, speak: "window" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "We swam at the sandy {}.",
        options: [
          { text: "beach", correct: true },
          { text: "bash", correct: false },
          { text: "bath", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Spider-Man is at school. He has a great...",
        options: [
          { text: "teacher", correct: true, speak: "teacher" },
          { text: "tester", correct: false, speak: "tester" },
          { text: "tisher", correct: false, speak: "tisher" },
          { text: "tackler", correct: false, speak: "tackler" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 2 — SH sound (Web-Slinger SH-City)
  // ===========================================================================
  {
    id: "sh-sound-shcity",
    title: "Web-Slinger in SH-City",
    tagline: "Swing through SH-City and shush the noisy villains.",
    intro:
      "The web-slinger needs a sidekick! Manas, swing across SH-City rooftops with him. Hush the villains by clicking words with the SH sound. SHHHH!",
    reward: "Hero Web-Cartridge",
    theme: "spider",
    hero: "spider",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word starts with the SH sound?",
        options: [
          { text: "ship", correct: true, speak: "ship" },
          { text: "chip", correct: false, speak: "chip" },
          { text: "tip", correct: false, speak: "tip" },
          { text: "rip", correct: false, speak: "rip" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Pick the SH word.",
        options: [
          { text: "shoe", correct: true, speak: "shoe" },
          { text: "true", correct: false, speak: "true" },
          { text: "blue", correct: false, speak: "blue" },
          { text: "glue", correct: false, speak: "glue" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "fish",
        options: [
          { text: "fish", correct: true },
          { text: "fitch", correct: false },
          { text: "fizz", correct: false },
          { text: "fist", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word ends with the SH sound?",
        options: [
          { text: "brush", correct: true, speak: "brush" },
          { text: "bring", correct: false, speak: "bring" },
          { text: "broom", correct: false, speak: "broom" },
          { text: "build", correct: false, speak: "build" },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort these words by the SH sound.",
        buckets: ["Has SH", "No SH"],
        items: [
          { word: "shop", bucket: 0 },
          { word: "tree", bucket: 1 },
          { word: "wash", bucket: 0 },
          { word: "moon", bucket: 1 },
          { word: "fish", bucket: 0 },
          { word: "frog", bucket: 1 },
          { word: "shut", bucket: 0 },
          { word: "park", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I took a big {} on my hair.",
        options: [
          { text: "brush", correct: true },
          { text: "brunch", correct: false },
          { text: "branch", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Pick the word you hear.",
        spokenWord: "shout",
        options: [
          { text: "shout", correct: true },
          { text: "scout", correct: false },
          { text: "spout", correct: false },
          { text: "south", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "Does 'sheep' start with the SH sound?",
        speak: "sheep",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "Does 'cheek' start with the SH sound?",
        speak: "cheek",
        answer: false,
        hint: "Cheek starts with CH, not SH.",
      },
      {
        type: "multiple-choice",
        prompt: "Which word has SH in the middle?",
        options: [
          { text: "splashing", correct: true, speak: "splashing" },
          { text: "running", correct: false, speak: "running" },
          { text: "jumping", correct: false, speak: "jumping" },
          { text: "kicking", correct: false, speak: "kicking" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "The {} swam quickly through the water.",
        options: [
          { text: "fish", correct: true },
          { text: "fist", correct: false },
          { text: "fizz", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "After dinner, time to {} the dishes.",
        options: [
          { text: "wash", correct: true, speak: "wash" },
          { text: "watch", correct: false, speak: "watch" },
          { text: "wash up", correct: false, speak: "wash up" },
          { text: "wand", correct: false, speak: "wand" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 3 — CH vs SH showdown (mix)
  // ===========================================================================
  {
    id: "ch-vs-sh-bridge",
    title: "Showdown at Echo Bridge",
    tagline: "CH or SH? Listen carefully — the bridge will only hold the right answer.",
    intro:
      "Echo Bridge is split in two halves: one for CH and one for SH. If you pick wrong, the bridge wobbles. Listen carefully and pick the correct spelling!",
    reward: "Bridge Master Badge",
    theme: "magic",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "listen-and-pick",
        prompt: "Listen and choose the correct spelling.",
        spokenWord: "ship",
        options: [
          { text: "ship", correct: true },
          { text: "chip", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "chip",
        options: [
          { text: "chip", correct: true },
          { text: "ship", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "cheap",
        options: [
          { text: "cheap", correct: true },
          { text: "sheep", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "sheep",
        options: [
          { text: "sheep", correct: true },
          { text: "cheap", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "chop",
        options: [
          { text: "chop", correct: true },
          { text: "shop", correct: false },
          { text: "chip", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "wash",
        options: [
          { text: "wash", correct: true },
          { text: "watch", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and choose.",
        spokenWord: "watch",
        options: [
          { text: "watch", correct: true },
          { text: "wash", correct: false },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort each word into the right bucket: CH or SH.",
        buckets: ["CH", "SH"],
        items: [
          { word: "chair", bucket: 0 },
          { word: "shop", bucket: 1 },
          { word: "fish", bucket: 1 },
          { word: "much", bucket: 0 },
          { word: "shoe", bucket: 1 },
          { word: "chin", bucket: 0 },
          { word: "wash", bucket: 1 },
          { word: "rich", bucket: 0 },
          { word: "ship", bucket: 1 },
          { word: "lunch", bucket: 0 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I would like to {} my old toys with my friend.",
        options: [
          { text: "share", correct: true },
          { text: "chair", correct: false },
          { text: "stair", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Sit on the {} please.",
        options: [
          { text: "chair", correct: true },
          { text: "share", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "True or false: 'much' and 'mush' end with the same sound.",
        answer: false,
        hint: "Much ends with CH, mush ends with SH. They are different!",
      },
      {
        type: "multiple-choice",
        prompt: "Which two words rhyme but use different sounds (CH vs SH)?",
        options: [
          { text: "chip & ship", correct: true },
          { text: "fish & frog", correct: false },
          { text: "tree & moon", correct: false },
          { text: "tall & ball", correct: false },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 4 — TH sound (Three Trolls and the TH Forest)
  // ===========================================================================
  {
    id: "th-forest",
    title: "Three Trolls and the TH Forest",
    tagline: "Three sneaky trolls block the path. Use TH words to pass.",
    intro:
      "Three trolls under three bridges only let travelers pass if they say words with TH. Stick out your tongue, blow air, and say it: TH!",
    reward: "Bridge Pass + 3 thunder stones",
    theme: "troll",
    hero: "troll",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word starts with TH?",
        options: [
          { text: "three", correct: true, speak: "three" },
          { text: "tree", correct: false, speak: "tree" },
          { text: "free", correct: false, speak: "free" },
          { text: "see", correct: false, speak: "see" },
        ],
        hint: "Stick your tongue out a tiny bit and blow!",
      },
      {
        type: "multiple-choice",
        prompt: "Pick the TH word.",
        options: [
          { text: "thumb", correct: true, speak: "thumb" },
          { text: "sum", correct: false, speak: "sum" },
          { text: "tum", correct: false, speak: "tum" },
          { text: "fun", correct: false, speak: "fun" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "thirty",
        options: [
          { text: "thirty", correct: true },
          { text: "dirty", correct: false },
          { text: "sturdy", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word ends with TH?",
        options: [
          { text: "math", correct: true, speak: "math" },
          { text: "make", correct: false, speak: "make" },
          { text: "moon", correct: false, speak: "moon" },
          { text: "milk", correct: false, speak: "milk" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has TH in the middle?",
        options: [
          { text: "mother", correct: true, speak: "mother" },
          { text: "summer", correct: false, speak: "summer" },
          { text: "winter", correct: false, speak: "winter" },
          { text: "hero", correct: false, speak: "hero" },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort by sound: starts with TH or ends with TH?",
        buckets: ["Starts with TH", "Ends with TH"],
        items: [
          { word: "thin", bucket: 0 },
          { word: "math", bucket: 1 },
          { word: "thick", bucket: 0 },
          { word: "with", bucket: 1 },
          { word: "thumb", bucket: 0 },
          { word: "bath", bucket: 1 },
          { word: "throw", bucket: 0 },
          { word: "north", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "There are {} little pigs in the story.",
        options: [
          { text: "three", correct: true },
          { text: "tree", correct: false },
          { text: "free", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Brush your teeth in the {}room.",
        options: [
          { text: "bath", correct: true },
          { text: "back", correct: false },
          { text: "ball", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "weather",
        options: [
          { text: "weather", correct: true },
          { text: "leather", correct: false },
          { text: "feather", correct: false },
          { text: "wetter", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "Does 'tree' have a TH sound?",
        speak: "tree",
        answer: false,
      },
      {
        type: "true-false",
        prompt: "Does 'three' have a TH sound?",
        speak: "three",
        answer: true,
      },
      {
        type: "multiple-choice",
        prompt: "Which word does NOT use TH?",
        options: [
          { text: "tent", correct: true, speak: "tent" },
          { text: "thank", correct: false, speak: "thank" },
          { text: "think", correct: false, speak: "think" },
          { text: "thud", correct: false, speak: "thud" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 5 — WH sound
  // ===========================================================================
  {
    id: "wh-questions",
    title: "Where, When and Why?",
    tagline: "Solve the WH-Sphinx's riddles using WH words.",
    intro:
      "The WH-Sphinx will only let you through her gate if you can answer her questions. Most begin with W-H. Listen and choose carefully!",
    reward: "Sphinx's Whisker",
    theme: "magic",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which question word means 'at what place'?",
        options: [
          { text: "where", correct: true, speak: "where" },
          { text: "when", correct: false, speak: "when" },
          { text: "why", correct: false, speak: "why" },
          { text: "who", correct: false, speak: "who" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which question word asks about time?",
        options: [
          { text: "when", correct: true, speak: "when" },
          { text: "what", correct: false, speak: "what" },
          { text: "which", correct: false, speak: "which" },
          { text: "where", correct: false, speak: "where" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which question word asks for a reason?",
        options: [
          { text: "why", correct: true, speak: "why" },
          { text: "where", correct: false, speak: "where" },
          { text: "what", correct: false, speak: "what" },
          { text: "who", correct: false, speak: "who" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Pick the WH word.",
        options: [
          { text: "whale", correct: true, speak: "whale" },
          { text: "tail", correct: false, speak: "tail" },
          { text: "fail", correct: false, speak: "fail" },
          { text: "mail", correct: false, speak: "mail" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "{} is your favorite color?",
        options: [
          { text: "What", correct: true },
          { text: "Where", correct: false },
          { text: "Why", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "{} are you going so fast?",
        options: [
          { text: "Why", correct: true },
          { text: "When", correct: false },
          { text: "Who", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "wheel",
        options: [
          { text: "wheel", correct: true },
          { text: "weal", correct: false },
          { text: "veal", correct: false },
          { text: "feel", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "white",
        options: [
          { text: "white", correct: true },
          { text: "wide", correct: false },
          { text: "wipe", correct: false },
          { text: "write", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "Is the H silent in 'whale'?",
        speak: "whale",
        answer: true,
        hint: "Most W-H words sound just like a regular W.",
      },
      {
        type: "multiple-choice",
        prompt: "Which is a WH-question word?",
        options: [
          { text: "who", correct: true, speak: "who" },
          { text: "could", correct: false, speak: "could" },
          { text: "should", correct: false, speak: "should" },
          { text: "would", correct: false, speak: "would" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "{} won the running race?",
        options: [
          { text: "Who", correct: true },
          { text: "Why", correct: false },
          { text: "Where", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "A big sea animal that spouts water:",
        options: [
          { text: "whale", correct: true, speak: "whale" },
          { text: "wail", correct: false, speak: "wail" },
          { text: "wall", correct: false, speak: "wall" },
          { text: "well", correct: false, speak: "well" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 6 — PH = F sound
  // ===========================================================================
  {
    id: "ph-photo-town",
    title: "Phantom Photos in PH-Town",
    tagline: "Phantoms snap photos! Find every PH word that says /f/.",
    intro:
      "Strange phantoms in PH-Town spell their /f/ sound with PH. Help the explorer find every PH word!",
    reward: "Phantom Photo Lens",
    theme: "explorer",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word uses PH for the /f/ sound?",
        options: [
          { text: "phone", correct: true, speak: "phone" },
          { text: "fan", correct: false, speak: "fan" },
          { text: "tone", correct: false, speak: "tone" },
          { text: "pony", correct: false, speak: "pony" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Pick the PH word.",
        options: [
          { text: "photo", correct: true, speak: "photo" },
          { text: "potato", correct: false, speak: "potato" },
          { text: "puppy", correct: false, speak: "puppy" },
          { text: "porch", correct: false, speak: "porch" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen — pick the PH spelling.",
        spokenWord: "elephant",
        options: [
          { text: "elephant", correct: true },
          { text: "elefant", correct: false },
          { text: "elefent", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen — pick the PH spelling.",
        spokenWord: "dolphin",
        options: [
          { text: "dolphin", correct: true },
          { text: "dolfin", correct: false },
          { text: "dofflin", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "PH usually sounds like /f/.",
        answer: true,
      },
      {
        type: "multiple-choice",
        prompt: "Which word does NOT use PH?",
        options: [
          { text: "fish", correct: true, speak: "fish" },
          { text: "phantom", correct: false, speak: "phantom" },
          { text: "graph", correct: false, speak: "graph" },
          { text: "trophy", correct: false, speak: "trophy" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "The big gray {} sprayed water with its trunk.",
        options: [
          { text: "elephant", correct: true },
          { text: "elephent", correct: false },
          { text: "elefant", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I called Grandma on the {}.",
        options: [
          { text: "phone", correct: true },
          { text: "fone", correct: false },
          { text: "phon", correct: false },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort each word: spelled with F or PH?",
        buckets: ["F", "PH"],
        items: [
          { word: "fan", bucket: 0 },
          { word: "phone", bucket: 1 },
          { word: "fish", bucket: 0 },
          { word: "graph", bucket: 1 },
          { word: "fork", bucket: 0 },
          { word: "photo", bucket: 1 },
          { word: "five", bucket: 0 },
          { word: "trophy", bucket: 1 },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is the word for letters of the alphabet system?",
        options: [
          { text: "alphabet", correct: true, speak: "alphabet" },
          { text: "alfabet", correct: false, speak: "alfabet" },
          { text: "alfubet", correct: false, speak: "alfubet" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "A chart that shows numbers is a...",
        options: [
          { text: "graph", correct: true, speak: "graph" },
          { text: "graff", correct: false, speak: "graff" },
          { text: "graf", correct: false, speak: "graf" },
        ],
      },
      {
        type: "true-false",
        prompt: "The word 'photo' makes a /p/ sound at the start.",
        speak: "photo",
        answer: false,
        hint: "PH = /f/, so 'photo' starts with the /f/ sound.",
      },
    ],
  },

  // ===========================================================================
  // QUEST 7 — Silent letters
  // ===========================================================================
  {
    id: "silent-letters",
    title: "Silent but Sneaky",
    tagline: "Some letters hide! Find the silent ones.",
    intro:
      "In a quiet library, some letters whisper... and some say nothing at all. Spot the silent letter sneaks in every word!",
    reward: "Silent Letter Magnifying Glass",
    theme: "magic",
    hero: "blippo",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which letter is silent in 'knee'?",
        speak: "knee",
        options: [
          { text: "k", correct: true },
          { text: "n", correct: false },
          { text: "e", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which letter is silent in 'write'?",
        speak: "write",
        options: [
          { text: "w", correct: true },
          { text: "r", correct: false },
          { text: "i", correct: false },
          { text: "t", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which letter is silent in 'lamb'?",
        speak: "lamb",
        options: [
          { text: "b", correct: true },
          { text: "l", correct: false },
          { text: "m", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which letter is silent in 'sign'?",
        speak: "sign",
        options: [
          { text: "g", correct: true },
          { text: "s", correct: false },
          { text: "n", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick the correct spelling.",
        spokenWord: "knight",
        options: [
          { text: "knight", correct: true },
          { text: "night", correct: false },
          { text: "knite", correct: false },
        ],
        hint: "A knight rides a horse and wears armor!",
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "wrong",
        options: [
          { text: "wrong", correct: true },
          { text: "rong", correct: false },
          { text: "wrang", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "The 'k' in 'know' is silent.",
        speak: "know",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "The 'g' in 'gnome' is silent.",
        speak: "gnome",
        answer: true,
      },
      {
        type: "word-sort",
        prompt: "Sort by which letter is silent.",
        buckets: ["Silent K", "Silent W"],
        items: [
          { word: "knee", bucket: 0 },
          { word: "write", bucket: 1 },
          { word: "knock", bucket: 0 },
          { word: "wrap", bucket: 1 },
          { word: "knife", bucket: 0 },
          { word: "wreck", bucket: 1 },
          { word: "knight", bucket: 0 },
          { word: "wrist", bucket: 1 },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has a silent B?",
        options: [
          { text: "comb", correct: true, speak: "comb" },
          { text: "book", correct: false, speak: "book" },
          { text: "bed", correct: false, speak: "bed" },
          { text: "boy", correct: false, speak: "boy" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Don't cut yourself with that sharp {}!",
        options: [
          { text: "knife", correct: true },
          { text: "nife", correct: false },
          { text: "nyfe", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Please {} on the door before coming in.",
        options: [
          { text: "knock", correct: true },
          { text: "nock", correct: false },
          { text: "nok", correct: false },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 8 — Magic E (Silent E)
  // ===========================================================================
  {
    id: "magic-e",
    title: "Magic E Mountain",
    tagline: "Add a silent E and the vowel says its NAME!",
    intro:
      "On Magic E Mountain, the wizard's silent E makes vowels say their names. CAP becomes CAPE! HOP becomes HOPE! Solve the spells!",
    reward: "Wand of Vowel-Naming",
    theme: "magic",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Add a magic E to CAP. What word do you get?",
        options: [
          { text: "cape", correct: true, speak: "cape" },
          { text: "capp", correct: false, speak: "capp" },
          { text: "cup", correct: false, speak: "cup" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add a magic E to HOP.",
        options: [
          { text: "hope", correct: true, speak: "hope" },
          { text: "hopp", correct: false, speak: "hopp" },
          { text: "hoop", correct: false, speak: "hoop" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add a magic E to KIT.",
        options: [
          { text: "kite", correct: true, speak: "kite" },
          { text: "kit", correct: false, speak: "kit" },
          { text: "kitt", correct: false, speak: "kitt" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add a magic E to TUB.",
        options: [
          { text: "tube", correct: true, speak: "tube" },
          { text: "tub", correct: false, speak: "tub" },
          { text: "tab", correct: false, speak: "tab" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick the magic E word.",
        spokenWord: "bake",
        options: [
          { text: "bake", correct: true },
          { text: "back", correct: false },
          { text: "bag", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "ride",
        options: [
          { text: "ride", correct: true },
          { text: "rid", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "True or false: Magic E is loud and noisy.",
        answer: false,
        hint: "Magic E is SILENT — but it makes the vowel say its name!",
      },
      {
        type: "true-false",
        prompt: "Adding magic E to 'tap' makes 'tape'.",
        answer: true,
      },
      {
        type: "word-sort",
        prompt: "Sort: short vowel (no magic E) vs. magic E (long vowel).",
        buckets: ["Short vowel", "Magic E"],
        items: [
          { word: "hop", bucket: 0 },
          { word: "hope", bucket: 1 },
          { word: "cut", bucket: 0 },
          { word: "cute", bucket: 1 },
          { word: "fin", bucket: 0 },
          { word: "fine", bucket: 1 },
          { word: "tap", bucket: 0 },
          { word: "tape", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Mom will {} a chocolate cake today.",
        options: [
          { text: "bake", correct: true },
          { text: "back", correct: false },
          { text: "bag", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I fly my {} on a windy day.",
        options: [
          { text: "kite", correct: true },
          { text: "kit", correct: false },
          { text: "kid", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which one is a magic E word?",
        options: [
          { text: "smile", correct: true, speak: "smile" },
          { text: "small", correct: false, speak: "small" },
          { text: "smell", correct: false, speak: "smell" },
          { text: "smug", correct: false, speak: "smug" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 9 — Vowel teams
  // ===========================================================================
  {
    id: "vowel-teams",
    title: "Vowel Team Voyage",
    tagline: "Two vowels, one sound. The first one does the talking!",
    intro:
      "When two vowels go walking, the first one usually does the talking! Sail with the explorer through islands of vowel teams: ai, ee, oa, ie, ay, ow, ea.",
    reward: "Vowel Team Sail",
    theme: "explorer",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word has the AI vowel team?",
        options: [
          { text: "rain", correct: true, speak: "rain" },
          { text: "ran", correct: false, speak: "ran" },
          { text: "run", correct: false, speak: "run" },
          { text: "ron", correct: false, speak: "ron" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the EE team?",
        options: [
          { text: "tree", correct: true, speak: "tree" },
          { text: "trip", correct: false, speak: "trip" },
          { text: "true", correct: false, speak: "true" },
          { text: "track", correct: false, speak: "track" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OA team?",
        options: [
          { text: "boat", correct: true, speak: "boat" },
          { text: "bot", correct: false, speak: "bot" },
          { text: "but", correct: false, speak: "but" },
          { text: "bit", correct: false, speak: "bit" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the IE team?",
        options: [
          { text: "pie", correct: true, speak: "pie" },
          { text: "pi", correct: false, speak: "pi" },
          { text: "pat", correct: false, speak: "pat" },
          { text: "pet", correct: false, speak: "pet" },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "play",
        options: [
          { text: "play", correct: true },
          { text: "plee", correct: false },
          { text: "plie", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "snow",
        options: [
          { text: "snow", correct: true },
          { text: "snou", correct: false },
          { text: "snoe", correct: false },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort by their vowel team.",
        buckets: ["AI / AY", "EE / EA"],
        items: [
          { word: "rain", bucket: 0 },
          { word: "tree", bucket: 1 },
          { word: "play", bucket: 0 },
          { word: "beach", bucket: 1 },
          { word: "train", bucket: 0 },
          { word: "feet", bucket: 1 },
          { word: "day", bucket: 0 },
          { word: "read", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Storm clouds bring lots of {}.",
        options: [
          { text: "rain", correct: true },
          { text: "ran", correct: false },
          { text: "ron", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Bees live in a tall green {}.",
        options: [
          { text: "tree", correct: true },
          { text: "tre", correct: false },
          { text: "tray", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the EA team?",
        options: [
          { text: "read", correct: true, speak: "read" },
          { text: "red", correct: false, speak: "red" },
          { text: "rod", correct: false, speak: "rod" },
          { text: "rid", correct: false, speak: "rid" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OW team (long O)?",
        options: [
          { text: "snow", correct: true, speak: "snow" },
          { text: "saw", correct: false, speak: "saw" },
          { text: "sun", correct: false, speak: "sun" },
          { text: "sip", correct: false, speak: "sip" },
        ],
      },
      {
        type: "true-false",
        prompt: "When two vowels are together, the first vowel often says its name.",
        answer: true,
        hint: "It's a famous phonics rule: when two vowels go walking, the first one does the talking.",
      },
    ],
  },

  // ===========================================================================
  // QUEST 10 — R-controlled vowels
  // ===========================================================================
  {
    id: "r-controlled",
    title: "R-Controlled Rainforest",
    tagline: "Bossy R changes vowels — listen carefully!",
    intro:
      "Deep in the rainforest, the BOSSY R takes over vowels. AR, ER, IR, OR, UR. They sound special. Help the explorer find each!",
    reward: "Bossy R Compass",
    theme: "explorer",
    hero: "explorer",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word has the AR sound?",
        options: [
          { text: "car", correct: true, speak: "car" },
          { text: "can", correct: false, speak: "can" },
          { text: "cup", correct: false, speak: "cup" },
          { text: "cat", correct: false, speak: "cat" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OR sound?",
        options: [
          { text: "fork", correct: true, speak: "fork" },
          { text: "frog", correct: false, speak: "frog" },
          { text: "free", correct: false, speak: "free" },
          { text: "fire", correct: false, speak: "fire" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the ER sound?",
        options: [
          { text: "her", correct: true, speak: "her" },
          { text: "hat", correct: false, speak: "hat" },
          { text: "hop", correct: false, speak: "hop" },
          { text: "him", correct: false, speak: "him" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the IR sound?",
        options: [
          { text: "bird", correct: true, speak: "bird" },
          { text: "bad", correct: false, speak: "bad" },
          { text: "bed", correct: false, speak: "bed" },
          { text: "bug", correct: false, speak: "bug" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the UR sound?",
        options: [
          { text: "fur", correct: true, speak: "fur" },
          { text: "far", correct: false, speak: "far" },
          { text: "for", correct: false, speak: "for" },
          { text: "fan", correct: false, speak: "fan" },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort by which bossy R is used.",
        buckets: ["AR", "OR"],
        items: [
          { word: "car", bucket: 0 },
          { word: "fork", bucket: 1 },
          { word: "barn", bucket: 0 },
          { word: "horn", bucket: 1 },
          { word: "park", bucket: 0 },
          { word: "corn", bucket: 1 },
          { word: "star", bucket: 0 },
          { word: "born", bucket: 1 },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "turn",
        options: [
          { text: "turn", correct: true },
          { text: "tarn", correct: false },
          { text: "torn", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "shirt",
        options: [
          { text: "shirt", correct: true },
          { text: "short", correct: false },
          { text: "shart", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "We drive a fast red {}.",
        options: [
          { text: "car", correct: true },
          { text: "ker", correct: false },
          { text: "core", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "The fluffy yellow {} flew high.",
        options: [
          { text: "bird", correct: true },
          { text: "burd", correct: false },
          { text: "berd", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "ER, IR, and UR can all sound the same.",
        answer: true,
        hint: "Yes! her, bird, and fur all share the same sound. Tricky!",
      },
      {
        type: "multiple-choice",
        prompt: "Which word has a bossy R?",
        options: [
          { text: "star", correct: true, speak: "star" },
          { text: "stay", correct: false, speak: "stay" },
          { text: "stop", correct: false, speak: "stop" },
          { text: "step", correct: false, speak: "step" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 11 — Diphthongs
  // ===========================================================================
  {
    id: "diphthongs",
    title: "Diphthong Dunes",
    tagline: "Sliding sounds: oi, oy, ou, ow.",
    intro:
      "On the singing dunes, two vowels glide together to make one sliding sound. OI, OY, OU, OW. Catch every diphthong!",
    reward: "Glide Pendant",
    theme: "explorer",
    hero: "blippo",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word has the OI sound?",
        options: [
          { text: "coin", correct: true, speak: "coin" },
          { text: "con", correct: false, speak: "con" },
          { text: "can", correct: false, speak: "can" },
          { text: "cup", correct: false, speak: "cup" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OY sound?",
        options: [
          { text: "boy", correct: true, speak: "boy" },
          { text: "bay", correct: false, speak: "bay" },
          { text: "bug", correct: false, speak: "bug" },
          { text: "bee", correct: false, speak: "bee" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OU sound?",
        options: [
          { text: "cloud", correct: true, speak: "cloud" },
          { text: "clap", correct: false, speak: "clap" },
          { text: "clip", correct: false, speak: "clip" },
          { text: "clock", correct: false, speak: "clock" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has the OW sound (like cow)?",
        options: [
          { text: "cow", correct: true, speak: "cow" },
          { text: "low", correct: false, speak: "low" },
          { text: "snow", correct: false, speak: "snow" },
          { text: "row", correct: false, speak: "row" },
        ],
        hint: "Tricky! OW can say two different sounds. We want the one in COW.",
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "point",
        options: [
          { text: "point", correct: true },
          { text: "paint", correct: false },
          { text: "pint", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "town",
        options: [
          { text: "town", correct: true },
          { text: "tone", correct: false },
          { text: "tan", correct: false },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort by sound: OI/OY or OU/OW.",
        buckets: ["OI / OY", "OU / OW"],
        items: [
          { word: "coin", bucket: 0 },
          { word: "cloud", bucket: 1 },
          { word: "boy", bucket: 0 },
          { word: "house", bucket: 1 },
          { word: "joy", bucket: 0 },
          { word: "owl", bucket: 1 },
          { word: "boil", bucket: 0 },
          { word: "down", bucket: 1 },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Look up at that big fluffy {}.",
        options: [
          { text: "cloud", correct: true },
          { text: "clued", correct: false },
          { text: "claud", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I found a shiny silver {}.",
        options: [
          { text: "coin", correct: true },
          { text: "con", correct: false },
          { text: "cone", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "OI and OY usually make the same sound.",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "OU and OW can make the same sound (like in cloud and cow).",
        answer: true,
      },
      {
        type: "multiple-choice",
        prompt: "Pick the diphthong word.",
        options: [
          { text: "mouse", correct: true, speak: "mouse" },
          { text: "moose", correct: false, speak: "moose" },
          { text: "miss", correct: false, speak: "miss" },
          { text: "muss", correct: false, speak: "muss" },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 12 — Sight words
  // ===========================================================================
  {
    id: "sight-words",
    title: "Sight Word Sanctuary",
    tagline: "Tricky words you just have to remember!",
    intro:
      "Some words don't follow phonics rules — you just have to know them. The Sanctuary gives you safe passage if you can spell each tricky sight word!",
    reward: "Sight Word Crystal",
    theme: "magic",
    hero: "blippo",
    unlockDay: 1,
    challenges: [
      {
        type: "listen-and-pick",
        prompt: "Listen and pick the correct sight word.",
        spokenWord: "because",
        options: [
          { text: "because", correct: true },
          { text: "becaus", correct: false },
          { text: "bicause", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "friend",
        options: [
          { text: "friend", correct: true },
          { text: "frend", correct: false },
          { text: "freind", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "people",
        options: [
          { text: "people", correct: true },
          { text: "peeple", correct: false },
          { text: "pepol", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "said",
        options: [
          { text: "said", correct: true },
          { text: "sed", correct: false },
          { text: "sayed", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "again",
        options: [
          { text: "again", correct: true },
          { text: "agen", correct: false },
          { text: "agin", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "their",
        options: [
          { text: "their", correct: true },
          { text: "thier", correct: false },
          { text: "thare", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I called my best {} on the phone.",
        options: [
          { text: "friend", correct: true },
          { text: "freind", correct: false },
          { text: "frend", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I stayed in {} I was sick.",
        options: [
          { text: "because", correct: true },
          { text: "becuase", correct: false },
          { text: "becos", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Many {} came to the party.",
        options: [
          { text: "people", correct: true },
          { text: "peple", correct: false },
          { text: "peeple", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which is the correct spelling?",
        options: [
          { text: "thought", correct: true, speak: "thought" },
          { text: "thot", correct: false, speak: "thot" },
          { text: "thaught", correct: false, speak: "thaught" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which is the correct spelling?",
        options: [
          { text: "through", correct: true, speak: "through" },
          { text: "thru", correct: false, speak: "thru" },
          { text: "throu", correct: false, speak: "throu" },
        ],
      },
      {
        type: "true-false",
        prompt: "Sight words can be tricky because they don't always follow phonics rules.",
        answer: true,
      },
    ],
  },

  // ===========================================================================
  // QUEST 13 — Suffix Stadium (-ing, -ed, -er, -est)
  // ===========================================================================
  {
    id: "suffix-stadium",
    title: "Suffix Stadium",
    tagline: "Run, jump, climb! Add the suffix to win the race.",
    intro:
      "Welcome to Suffix Stadium! Add -ing, -ed, -er, or -est to win each event. Sometimes you double the last letter, sometimes you drop an E.",
    reward: "Champion's Stopwatch",
    theme: "spider",
    hero: "spider",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Add -ing to RUN.",
        options: [
          { text: "running", correct: true, speak: "running" },
          { text: "runing", correct: false, speak: "runing" },
          { text: "runned", correct: false, speak: "runned" },
        ],
        hint: "Short vowel + one consonant — double the consonant!",
      },
      {
        type: "multiple-choice",
        prompt: "Add -ing to JUMP.",
        options: [
          { text: "jumping", correct: true, speak: "jumping" },
          { text: "jumpping", correct: false, speak: "jumpping" },
          { text: "jumppig", correct: false, speak: "jumppig" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add -ed to HOP.",
        options: [
          { text: "hopped", correct: true, speak: "hopped" },
          { text: "hoped", correct: false, speak: "hoped" },
          { text: "hopt", correct: false, speak: "hopt" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add -er to BIG.",
        options: [
          { text: "bigger", correct: true, speak: "bigger" },
          { text: "biger", correct: false, speak: "biger" },
          { text: "biggest", correct: false, speak: "biggest" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add -est to FAST.",
        options: [
          { text: "fastest", correct: true, speak: "fastest" },
          { text: "fastes", correct: false, speak: "fastes" },
          { text: "fastier", correct: false, speak: "fastier" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Add -ing to SMILE. (Drop the E!)",
        options: [
          { text: "smiling", correct: true, speak: "smiling" },
          { text: "smileing", correct: false, speak: "smileing" },
          { text: "smilling", correct: false, speak: "smilling" },
        ],
        hint: "When a word ends in a silent E, drop it before -ing.",
      },
      {
        type: "multiple-choice",
        prompt: "Add -ed to BAKE.",
        options: [
          { text: "baked", correct: true, speak: "baked" },
          { text: "bakeed", correct: false, speak: "bakeed" },
          { text: "bakd", correct: false, speak: "bakd" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "Yesterday I {} all the way home.",
        options: [
          { text: "ran", correct: true },
          { text: "runned", correct: false },
          { text: "runed", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "She is the {} runner on her team.",
        options: [
          { text: "fastest", correct: true },
          { text: "fastier", correct: false },
          { text: "fasterer", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "When you add -ing to 'run', you double the n: 'running'.",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "When you add -ed to 'bake', you keep the silent e: 'bakeed'.",
        answer: false,
        hint: "Drop the silent e first: bake -> baked.",
      },
      {
        type: "word-sort",
        prompt: "Sort by which rule applies.",
        buckets: ["Double the letter", "Drop the silent E"],
        items: [
          { word: "running", bucket: 0 },
          { word: "smiling", bucket: 1 },
          { word: "hopping", bucket: 0 },
          { word: "baked", bucket: 1 },
          { word: "bigger", bucket: 0 },
          { word: "riding", bucket: 1 },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 14 — Compound words
  // ===========================================================================
  {
    id: "compound-carnival",
    title: "Compound Word Carnival",
    tagline: "Smash two words together to make a bigger one!",
    intro:
      "At the Carnival, two small words crash together and become one big word! Sun + shine = sunshine! Find them all.",
    reward: "Carnival Cotton Candy",
    theme: "troll",
    hero: "blippo",
    unlockDay: 1,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "What is sun + shine?",
        options: [
          { text: "sunshine", correct: true, speak: "sunshine" },
          { text: "sunsign", correct: false, speak: "sunsign" },
          { text: "shinsun", correct: false, speak: "shinsun" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is butter + fly?",
        options: [
          { text: "butterfly", correct: true, speak: "butterfly" },
          { text: "flutterby", correct: false, speak: "flutterby" },
          { text: "butterflies", correct: false, speak: "butterflies" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is rain + bow?",
        options: [
          { text: "rainbow", correct: true, speak: "rainbow" },
          { text: "rainboe", correct: false, speak: "rainboe" },
          { text: "raynbow", correct: false, speak: "raynbow" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is basket + ball?",
        options: [
          { text: "basketball", correct: true, speak: "basketball" },
          { text: "ballbasket", correct: false, speak: "ballbasket" },
          { text: "basketbal", correct: false, speak: "basketbal" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is cup + cake?",
        options: [
          { text: "cupcake", correct: true, speak: "cupcake" },
          { text: "cakecup", correct: false, speak: "cakecup" },
          { text: "cupkake", correct: false, speak: "cupkake" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is snow + man?",
        options: [
          { text: "snowman", correct: true, speak: "snowman" },
          { text: "mansnow", correct: false, speak: "mansnow" },
          { text: "snomen", correct: false, speak: "snomen" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What is sea + shell?",
        options: [
          { text: "seashell", correct: true, speak: "seashell" },
          { text: "shellsea", correct: false, speak: "shellsea" },
          { text: "seeshel", correct: false, speak: "seeshel" },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "The little girl made a {} in the snow yesterday.",
        options: [
          { text: "snowman", correct: true },
          { text: "snowmen", correct: false },
          { text: "snowmun", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "After the rain, a beautiful {} appeared.",
        options: [
          { text: "rainbow", correct: true },
          { text: "rainboe", correct: false },
          { text: "raymbow", correct: false },
        ],
      },
      {
        type: "true-false",
        prompt: "A compound word is made by joining TWO whole words together.",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "'Apple' is a compound word.",
        answer: false,
        hint: "'Apple' is just one word — not made from two whole words.",
      },
      {
        type: "word-sort",
        prompt: "Sort: compound word or just one word?",
        buckets: ["Compound", "Not Compound"],
        items: [
          { word: "sunshine", bucket: 0 },
          { word: "happy", bucket: 1 },
          { word: "popcorn", bucket: 0 },
          { word: "table", bucket: 1 },
          { word: "treehouse", bucket: 0 },
          { word: "monkey", bucket: 1 },
        ],
      },
    ],
  },

  // ===========================================================================
  // QUEST 15 — FINAL BOSS: Trollgar's Castle (Rapid fire mix)
  // ===========================================================================
  {
    id: "final-boss-trollgar",
    title: "Final Boss: Trollgar's Castle",
    tagline: "Rapid-fire showdown! How many can you beat in 60 seconds?",
    intro:
      "Trollgar is BACK, Manas — and angrier than ever. He has 60 seconds of phonics riddles. Beat as many as you can! Each correct answer hurts him, each wrong answer heals him. Don't stop, Manas!",
    reward: "Hero of Phonics — Trophy",
    theme: "troll",
    hero: "spider",
    unlockDay: 1,
    challenges: [
      {
        type: "boss-rapid",
        prompt: "Beat Trollgar in 60 seconds!",
        durationSec: 60,
        questions: [
          {
            prompt: "Pick the CH word",
            options: [
              { text: "chair", correct: true },
              { text: "ship", correct: false },
              { text: "wash", correct: false },
            ],
          },
          {
            prompt: "Pick the SH word",
            options: [
              { text: "ship", correct: true },
              { text: "chip", correct: false },
              { text: "tip", correct: false },
            ],
          },
          {
            prompt: "Pick the TH word",
            options: [
              { text: "three", correct: true },
              { text: "tree", correct: false },
              { text: "free", correct: false },
            ],
          },
          {
            prompt: "Pick the WH word",
            options: [
              { text: "whale", correct: true },
              { text: "tail", correct: false },
              { text: "mail", correct: false },
            ],
          },
          {
            prompt: "PH = ?",
            options: [
              { text: "/f/", correct: true },
              { text: "/p/", correct: false },
              { text: "/h/", correct: false },
            ],
          },
          {
            prompt: "Silent letter in 'knee'",
            options: [
              { text: "k", correct: true },
              { text: "n", correct: false },
              { text: "e", correct: false },
            ],
          },
          {
            prompt: "Magic E word",
            options: [
              { text: "cake", correct: true },
              { text: "cap", correct: false },
              { text: "cab", correct: false },
            ],
          },
          {
            prompt: "Vowel team",
            options: [
              { text: "rain", correct: true },
              { text: "ran", correct: false },
              { text: "run", correct: false },
            ],
          },
          {
            prompt: "Bossy R word",
            options: [
              { text: "car", correct: true },
              { text: "can", correct: false },
              { text: "cat", correct: false },
            ],
          },
          {
            prompt: "Diphthong word",
            options: [
              { text: "coin", correct: true },
              { text: "con", correct: false },
              { text: "can", correct: false },
            ],
          },
          {
            prompt: "Compound word",
            options: [
              { text: "sunshine", correct: true },
              { text: "happy", correct: false },
              { text: "table", correct: false },
            ],
          },
          {
            prompt: "Sight word spelling",
            options: [
              { text: "friend", correct: true },
              { text: "frend", correct: false },
              { text: "freind", correct: false },
            ],
          },
          {
            prompt: "Add -ing to RUN",
            options: [
              { text: "running", correct: true },
              { text: "runing", correct: false },
              { text: "runned", correct: false },
            ],
          },
          {
            prompt: "Pick the SH word",
            options: [
              { text: "fish", correct: true },
              { text: "fit", correct: false },
              { text: "fix", correct: false },
            ],
          },
          {
            prompt: "Pick the CH word",
            options: [
              { text: "lunch", correct: true },
              { text: "lunge", correct: false },
              { text: "lump", correct: false },
            ],
          },
          {
            prompt: "Vowel team OA",
            options: [
              { text: "boat", correct: true },
              { text: "bot", correct: false },
              { text: "but", correct: false },
            ],
          },
          {
            prompt: "Add -ed to BAKE",
            options: [
              { text: "baked", correct: true },
              { text: "bakeed", correct: false },
              { text: "bakedd", correct: false },
            ],
          },
          {
            prompt: "Magic E word",
            options: [
              { text: "kite", correct: true },
              { text: "kit", correct: false },
              { text: "kitt", correct: false },
            ],
          },
          {
            prompt: "Sight word",
            options: [
              { text: "because", correct: true },
              { text: "becuse", correct: false },
              { text: "bcause", correct: false },
            ],
          },
          {
            prompt: "Pick the TH word",
            options: [
              { text: "math", correct: true },
              { text: "mat", correct: false },
              { text: "man", correct: false },
            ],
          },
          {
            prompt: "Pick the OW (cow) sound",
            options: [
              { text: "town", correct: true },
              { text: "tone", correct: false },
              { text: "toe", correct: false },
            ],
          },
          {
            prompt: "Bossy R: OR",
            options: [
              { text: "horn", correct: true },
              { text: "hen", correct: false },
              { text: "hat", correct: false },
            ],
          },
          {
            prompt: "Compound word",
            options: [
              { text: "rainbow", correct: true },
              { text: "rainy", correct: false },
              { text: "raining", correct: false },
            ],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // DAY 2+ EXAMPLE QUESTS (locked until later days)
  // Add more to extend the daily content. These show how to unlock later.
  // ===========================================================================
  {
    id: "day2-soft-c-g",
    title: "Soft C and Soft G Caves",
    tagline: "When C says /s/ and G says /j/.",
    intro:
      "Day 2! Today the explorer ventures into the Soft Caves. Sometimes C sounds like S (cent, city). Sometimes G sounds like J (giant, gym). Find them all.",
    reward: "Cave Lantern",
    theme: "explorer",
    hero: "explorer",
    unlockDay: 2,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "Which word has a soft C (sounds like S)?",
        options: [
          { text: "city", correct: true, speak: "city" },
          { text: "cat", correct: false, speak: "cat" },
          { text: "cup", correct: false, speak: "cup" },
          { text: "cot", correct: false, speak: "cot" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has a hard C (sounds like K)?",
        options: [
          { text: "cake", correct: true, speak: "cake" },
          { text: "cent", correct: false, speak: "cent" },
          { text: "ice", correct: false, speak: "ice" },
          { text: "cell", correct: false, speak: "cell" },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which word has a soft G (sounds like J)?",
        options: [
          { text: "giant", correct: true, speak: "giant" },
          { text: "go", correct: false, speak: "go" },
          { text: "gum", correct: false, speak: "gum" },
          { text: "got", correct: false, speak: "got" },
        ],
      },
      {
        type: "true-false",
        prompt: "When C is followed by E, I, or Y, it's usually soft.",
        answer: true,
      },
      {
        type: "true-false",
        prompt: "When G is followed by E, I, or Y, it's usually soft.",
        answer: true,
      },
      {
        type: "word-sort",
        prompt: "Sort: hard C or soft C?",
        buckets: ["Hard C (K)", "Soft C (S)"],
        items: [
          { word: "cat", bucket: 0 },
          { word: "city", bucket: 1 },
          { word: "cup", bucket: 0 },
          { word: "cell", bucket: 1 },
          { word: "cone", bucket: 0 },
          { word: "ice", bucket: 1 },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "page",
        options: [
          { text: "page", correct: true },
          { text: "padge", correct: false },
          { text: "paj", correct: false },
        ],
      },
      {
        type: "listen-and-pick",
        prompt: "Listen and pick.",
        spokenWord: "cent",
        options: [
          { text: "cent", correct: true },
          { text: "sent", correct: false },
          { text: "scent", correct: false },
        ],
        hint: "Three words sound exactly the same — pick the one with the soft C!",
      },
      {
        type: "sentence-fill",
        sentence: "I rode my bike through the busy {}.",
        options: [
          { text: "city", correct: true },
          { text: "kity", correct: false },
          { text: "siti", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "Which has a soft G?",
        options: [
          { text: "gym", correct: true, speak: "gym" },
          { text: "got", correct: false, speak: "got" },
          { text: "go", correct: false, speak: "go" },
          { text: "good", correct: false, speak: "good" },
        ],
      },
    ],
  },

  {
    id: "day3-prefixes",
    title: "Prefix Power Plant",
    tagline: "Add un-, re-, pre-, dis- to change a word's meaning!",
    intro:
      "Day 3! Power up your words with prefixes. UN- means 'not', RE- means 'again', PRE- means 'before', DIS- means 'opposite'.",
    reward: "Power Cell",
    theme: "spider",
    hero: "spider",
    unlockDay: 3,
    challenges: [
      {
        type: "multiple-choice",
        prompt: "What does UN- mean in 'unhappy'?",
        options: [
          { text: "not", correct: true },
          { text: "again", correct: false },
          { text: "before", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What does RE- mean in 'redo'?",
        options: [
          { text: "again", correct: true },
          { text: "not", correct: false },
          { text: "before", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What does PRE- mean in 'preview'?",
        options: [
          { text: "before", correct: true },
          { text: "after", correct: false },
          { text: "not", correct: false },
        ],
      },
      {
        type: "multiple-choice",
        prompt: "What does DIS- mean in 'dislike'?",
        options: [
          { text: "opposite of", correct: true },
          { text: "again", correct: false },
          { text: "more", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "The opposite of 'kind' is {} kind.",
        options: [
          { text: "un", correct: true },
          { text: "re", correct: false },
          { text: "pre", correct: false },
        ],
      },
      {
        type: "sentence-fill",
        sentence: "I will {} read the chapter to remember it.",
        options: [
          { text: "re", correct: true },
          { text: "un", correct: false },
          { text: "dis", correct: false },
        ],
      },
      {
        type: "word-sort",
        prompt: "Sort by their prefix.",
        buckets: ["UN- (not)", "RE- (again)"],
        items: [
          { word: "unhappy", bucket: 0 },
          { word: "rewrite", bucket: 1 },
          { word: "unlock", bucket: 0 },
          { word: "redo", bucket: 1 },
          { word: "unsafe", bucket: 0 },
          { word: "replay", bucket: 1 },
        ],
      },
      {
        type: "true-false",
        prompt: "A prefix is added to the BEGINNING of a word.",
        answer: true,
      },
    ],
  },
];

// Returns the quests that are unlocked for the player on a given day number.
// Day 1 = first session.
export function unlockedQuests(currentDay: number): Quest[] {
  return QUESTS.filter((q) => q.unlockDay <= currentDay);
}

export function questById(id: string): Quest | undefined {
  return QUESTS.find((q) => q.id === id);
}
