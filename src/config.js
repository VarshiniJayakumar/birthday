// ============================================================
//  🎂  BIRTHDAY WEBSITE — PERSONAL CONFIGURATION
//  Edit everything in this file to personalise the site.
//  No need to touch any other file!
// ============================================================

export const config = {

  // ── Names ──────────────────────────────────────────────────
  yourName: "kunjuu",
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
    musicTrack:      "/audio/song1.mp3",  // plays softly on the hero — toggle with the 🔊 button
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
  // All 8 photos from /public/photos/ — update captions to match your pics!
  gallery: [
    { src: "/photos/pic1.jpg", caption: "Us 💛",                          type: "image" },
    { src: "/photos/pic2.jpg", caption: "From the very beginning 🌸",     type: "image" },
    { src: "/photos/pic3.jpg", caption: "Love is us ❤️",                  type: "image" },
    { src: "/photos/pic4.jpg", caption: "Every moment with you 💍",       type: "image" },
    { src: "/photos/pic5.jpg", caption: "Golden hour with you ✨",        type: "image" },
    { src: "/photos/pic6.jpg", caption: "This memory lives rent-free 😄", type: "image" },
    { src: "/photos/pic7.jpg", caption: "Every adventure with you 🌍",    type: "image" },
    { src: "/photos/pic8.jpg", caption: "My favourite person ❤️",         type: "image" },
  ],
  // Before & Now slider — disabled
  beforeNow: null,

  // ── Reasons I Love You ─────────────────────────────────────
  reasons: [
    "👀 Those brown eyes — the very first thing I noticed about you, and I was gone instantly.",
    "🌟 Your character — the kind of person you are inside is what makes you truly beautiful.",
    "😄 You're so witty — your humour catches me off guard every time and I love it.",
    "🤗 You are emotionally nurturing in a way that makes me feel safe and seen like nowhere else.",
    "🎙️ Your voice — honestly my favourite sound in the entire world, I could listen to you forever.",
    "🧠 The way your mind works — you think so deeply about things and it genuinely amazes me.",
    "💪 You handle everything with such quiet strength, even when things are hard.",
    "🥰 The way you love — fully, genuinely, without holding back. It's rare and it's everything.",
    "😂 You make me laugh like no one else ever has — real, uncontrollable, happy laughter.",
    "💛 Simply because you are you — and being loved by you is the greatest gift of my life.",
  ],

  // ── Love Letter ────────────────────────────────────────────
  letter: {
    body: `My love,

I don't have the right words to explain what you mean to me — but I'll try.

You walked into my life and quietly rearranged everything. The way you laugh, the way you think, the way you make even the smallest moments feel like something worth remembering.

Every day with you is a gift I didn't know I needed. You are my calm in chaos, my home in every sense of the word.

On your birthday, I just want you to know: you are deeply, completely, endlessly loved.

Happy Birthday, kuchupuchuu.`,
    musicEnabled: false,  // set true if you added a musicTrack in hero
  },

  // ── Music Section ──────────────────────────────────────────
  songs: [
    {
      title:    "Him & I",
      occasion: "I can't hear this without thinking of you. I don't think I'd want to 💛",
      src:      "/audio/song1.mp3",
      albumArt: null,
      lyrics:   null,
    },
    {
      title:    "Ennode Nee Irunthaal",
      occasion: "The song I play when my heart is heavy — it quietly reminds me that we always find our way back 🌧️",
      src:      "/audio/song2.mp3",
      albumArt: null,
      lyrics:   null,
    },
    {
      title:    "Unnodu Vazhatha",
      occasion: "Whoever wrote this was writing about us without knowing it 🎶",
      src:      "/audio/song3.mp3",
      albumArt: null,
      lyrics:   null,
    },
    {
      title:    "Ennadhuyire",
      occasion: "Everything I imagine for us, this song says it better than I ever could 🌅",
      src:      "/audio/song4.mp3",
      albumArt: null,
      lyrics:   null,
    },
  ],
  spotifyPlaylist: null,  // e.g. "https://open.spotify.com/playlist/XXXX"

  // ── Hero background music (uses song1 by default) ──────────
  // already set via hero.musicTrack below if you want one song to autoplay

  // ── Surprise Reveal ────────────────────────────────────────
  surprise: {
    mechanic: "password",
    password: "0101",
    hint:     "Try our special date 💛",
    content: {
      title:   "Scroll Down 👇",
      message: "Our future is waiting for you just below, kuchupuchuu. Every dream, every plan — all of it is for us. 💛",
      video:   null,
    },
  },

  // ── Future Together ────────────────────────────────────────
  future: [
    { title: "Our Family 👨‍👩‍👧‍👦",      detail: "Appu, Ammu, you and me — the four of us, our little world, our everything.",                                         progress: 10, emoji: "👨‍👩‍👧‍👦" },
    { title: "Our Home, Bike & Car 🏡", detail: "A home that's ours, a bike to ride together, a car for our family adventures.",                                       progress: 25, emoji: "🏠" },
    { title: "Our Farm 🐄🐐",           detail: "Your goat farm, my cow farm — I promise we'll build both of them together, side by side.",                             progress: 15, emoji: "🐄" },
    { title: "Our Garden 🌿",           detail: "Plants everywhere, birds singing, dogs running, cats napping — the peaceful life you always dreamed of.",              progress: 20, emoji: "🌻" },
    { title: "World Trip ✈️",           detail: "Chicago first — your favourite city full of buildings and architecture. Then everywhere else the world has to offer.", progress: 5,  emoji: "🏙️" },
    { title: "Growing Old Together 💛", detail: "Sitting side by side, watching Appu and Ammu happy and thriving — that's the dream that matters most.",               progress: 50, emoji: "🧓👵" },
  ],

  // ── Ending Section ─────────────────────────────────────────
  ending: {
    message:   "Happy Birthday, kuchupuchuu ❤️",
    subMessage: "Here's to every year ahead — with you.",
  },
}
