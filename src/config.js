// ============================================================
//  🎂  BIRTHDAY WEBSITE — PERSONAL CONFIGURATION
//  Edit everything in this file to personalise the site.
//  No need to touch any other file!
// ============================================================

export const config = {

  // ── Names ──────────────────────────────────────────────────
  yourName: "Your Name",          // your name (shown in letter signature)
  hisName:  "His Name",           // his name (shown in hero greeting)

  // ── Hero Section ───────────────────────────────────────────
  hero: {
    greeting:    "To the person who changed my world ❤️",
    subGreeting: "Today is all about you, my love.",
    // Set ONE of the two below. Leave the other as null.
    countdownTo:   null,          // e.g. "2026-07-15" — future birthday date
    countdownFrom: "2021-01-01",  // the day we committed
    backgroundImage: null,        // e.g. "/photos/hero-bg.jpg"  (put file in /public/photos/)
    backgroundVideo: null,        // e.g. "/videos/hero.mp4"
    musicTrack:      null,        // e.g. "/audio/our-song.mp3"
  },

  // ── Our Story Timeline ─────────────────────────────────────
  timeline: [
    {
      date:        "September 2020 💬",
      title:       "The Month We Spoke as Friends",
      description: "It started with simple conversations — little did we know those words were the beginning of everything. 🌙",
      photo:       null,
      audio:       null,
    },
    {
      date:        "January 1, 2021 🎊",
      title:       "The Day We Committed 💑",
      description: "We made it official. The best decision we ever made. ❤️",
      photo:       null,
      audio:       null,
    },
    {
      date:        "March 4, 2021 🌹",
      title:       "Our First Meet 🤝",
      description: "Seeing you for the first time in person — my heart knew before my mind did. 🥺💛",
      photo:       null,
      audio:       null,
    },
    {
      date:        "April 16, 2021 💋",
      title:       "Our First Kiss 🌸",
      description: "A moment I replay in my heart every single day. 💋✨",
      photo:       null,
      audio:       null,
    },
    {
      date:        "Forever ✨",
      title:       "Our Future 🌟",
      description: "So many beautiful chapters still to write — and I want every single one of them to be with you. 💛🌈",
      photo:       null,
      audio:       null,
    },
  ],

  // ── Memory Gallery ─────────────────────────────────────────
  gallery: [
    { src: null, caption: "That one perfect day 🌸",   type: "image" },
    { src: null, caption: "Always laughing with you",  type: "image" },
    { src: null, caption: "My favourite smile",        type: "image" },
    { src: null, caption: "Us, always",                type: "image" },
    { src: null, caption: "Golden hour with you",      type: "image" },
    { src: null, caption: "This memory lives rent-free", type: "image" },
  ],
  // Before & Now slider (optional — set both or leave null)
  beforeNow: {
    before: null,   // e.g. "/photos/before.jpg"
    now:    null,   // e.g. "/photos/now.jpg"
    label:  "Then & Now 💛",
  },

  // ── Reasons I Love You ─────────────────────────────────────
  reasons: [
    "You make me laugh even on my worst days.",
    "Your voice is my favourite sound.",
    "You always know exactly what to say.",
    "The way you care about everyone around you.",
    "You make ordinary moments feel magical.",
    "Your laugh is completely contagious.",
    "You push me to be a better person.",
    "The way your eyes light up when you're excited.",
    "You make me feel safe and loved every single day.",
    "Simply because you are you — and that's everything.",
  ],

  // ── Love Letter ────────────────────────────────────────────
  letter: {
    body: `My love,

I don't have the right words to explain what you mean to me — but I'll try.

You walked into my life and quietly rearranged everything. The way you laugh, the way you think, the way you make even the smallest moments feel like something worth remembering.

Every day with you is a gift I didn't know I needed. You are my calm in chaos, my home in every sense of the word.

On your birthday, I just want you to know: you are deeply, completely, endlessly loved.

Happy Birthday, my favourite person.`,
    musicEnabled: false,  // set true if you added a musicTrack in hero
  },

  // ── Music Section ──────────────────────────────────────────
  songs: [
    {
      title:    "Our Song",
      occasion: "The one that always reminds me of you",
      albumArt: null,   // e.g. "/photos/album1.jpg"
      lyrics:   "Add your favourite lyrics here...",
    },
    {
      title:    "Late Night Calls",
      occasion: "Every long phone call",
      albumArt: null,
      lyrics:   null,
    },
    {
      title:    "Road Trip Anthem",
      occasion: "Windows down, singing loud",
      albumArt: null,
      lyrics:   null,
    },
  ],
  spotifyPlaylist: null,  // e.g. "https://open.spotify.com/playlist/XXXX"

  // ── Surprise Reveal ────────────────────────────────────────
  surprise: {
    mechanic: "password",   // "password" | "scratch" | "hold"
    password: "0101",       // the answer the visitor must type
    hint:     "Try our special date 💛",
    content: {
      title:   "Your Surprise 🎁",
      message: "I planned something just for us. Check your messages for the details — this one's from the heart.",
      video:   null,        // e.g. "/videos/surprise.mp4"
    },
  },

  // ── Future Together ────────────────────────────────────────
  future: [
    { title: "Paris Together",        detail: "Croissants, the Eiffel Tower, and you.",  progress: 10, emoji: "🗼" },
    { title: "Our Own Place",         detail: "A home that's ours.",                      progress: 30, emoji: "🏡" },
    { title: "Road Trip Across Country", detail: "No plan, just us and the open road.",  progress: 5,  emoji: "🚗" },
    { title: "Adopt a Pet",           detail: "A fluffy addition to our family.",         progress: 20, emoji: "🐾" },
    { title: "Grow Old Together",     detail: "The most important one.",                  progress: 50, emoji: "💛" },
  ],

  // ── Ending Section ─────────────────────────────────────────
  ending: {
    message:   "Happy Birthday, my favourite person ❤️",
    subMessage: "Here's to every year ahead — with you.",
  },
}
