// Shared content for all pages (with your videos & dynamic categories)

window.SITE = {
  heroPhrases: [
    "cinematic videos.",
    "stunning photography.",
    "epic VFX.",
    "immersive storytelling."
  ],

  /* ───────── WORK: Videos (YouTube) ─────────
     - category drives the auto-generated sub-tabs
     - tags are optional (for future filtering or badges)
  */
  videos: [
    // Music videos
    { title: "Music Video", category: "Music Videos", youtubeId: "gBGtoQuhYlg" },

    // Music cover videos
    { title: "Music Cover", category: "Music Covers", youtubeId: "KpfO3oaktHw" },
    { title: "Music Cover", category: "Music Covers", youtubeId: "R2_fcfz2flM" },
    { title: "Music Cover", category: "Music Covers", youtubeId: "Xh-dlQFeKPY" },
    { title: "Music Cover", category: "Music Covers", youtubeId: "ugJjDEr9LgA" },

    // Corporate
    { title: "Corporate Highlights", category: "Corporate Highlights", youtubeId: "l2-2aV_kewM" },
    { title: "Corporate Highlights", category: "Corporate Highlights", youtubeId: "KWOB9Ri3VZo" },

    // Fashion
    { title: "Fashion Film", category: "Fashion", youtubeId: "RIXiRd-un4U" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "6KJ9lA0pCk4" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "Sl9xACBZDnI" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "arOcr8UWXZ4" },

    // Animation (also voice over)
    { title: "Animation Reel", category: "Animation", youtubeId: "WuqA0Ly9dj8", tags: ["Voice Over"] }
  ],

  photos: [
    // Managed via assets/photos/photos.json (category + img). Leave empty or add quick manual entries:
    // { title: "First Dance", category: "Weddings", img: "/assets/photos/dance.jpg" }
  ],

  // Brands
  brands: [
    {
      title: "1Take Studio",
      tag: "Software",
      desc: "Crafting authentic cinematic videos that help brands tell their story and grow their business.",
      img: "/assets/1takelogo.png",
      url: "https://1takestudio.ca",
      color: "#4a7cff"  /* Blue from 1Take logo */
    },
    {
      title: "Stories Blossomed",
      tag: "Weddings",
      desc: "Our luxury wedding film brand that blends cinematic visuals with heartfelt storytelling.",
      img: "/assets/storiesblossomedlogo.png",
      url: "https://storiesblossomed.ca",
      color: "#e8a5c9"  /* Pink from Stories Blossomed logo */
    }
  ]
};
