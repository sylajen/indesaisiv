// Shared content for all pages (with your videos & dynamic categories)

window.SITE = {
  heroPhrases: [
    "cinematic videos.",
    "stunning photography.",
    "epic VFX."
  ],
  about: {
    paragraphs: [
      "Indesaisiv is a creator-focused studio marrying a CPA-level operations brain with filmmaker instincts. We plan with strategy, shoot with intention, and finish with editorial taste and tasteful VFX.",
      "Core capabilities:\n• Video production (corporate, events, weddings, ads)\n• Photography (events, brand, product)\n• Editing & finishing (dialog, music, sound design)\n• VFX & motion polish (cleanups, titles, light compositing)"
    ],
    pillars: [
      { title: "Video",   text: "Interviews, product, events & weddings on Sony cinema bodies." },
      { title: "Photo",   text: "Brand, event, and product photography with consistent lighting and color." },
      { title: "Editing", text: "Narrative-first cuts, clean audio, music licensing, and deliverables for web/social." },
      { title: "VFX",     text: "Subtle enhancements—titles, tracking, paint/cleanup, motion accents when it serves story." }
    ],
    contactEmail: "hello@indesaisiv.ca"
  },

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

    // Short films (also acting)
    { title: "Short Film", category: "Short Films", youtubeId: "BOdh7r6gAhc", tags: ["Acting"] },
    { title: "Short Film", category: "Short Films", youtubeId: "mQUzppo8XHQ", tags: ["Acting"] },
    { title: "Short Film", category: "Short Films", youtubeId: "SM0SijQwN7w", tags: ["Acting"] },

    // Fashion
    { title: "Fashion Film", category: "Fashion", youtubeId: "RIXiRd-un4U" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "6KJ9lA0pCk4" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "Sl9xACBZDnI" },
    { title: "Fashion Film", category: "Fashion", youtubeId: "arOcr8UWXZ4" },

    // Animation (also voice over)
    { title: "Animation Reel", category: "Animation", youtubeId: "WuqA0Ly9dj8", tags: ["Voice Over"] }
  ],

  // (Keep or replace these with your own assets)
  designs: [
    { title: "Campaign Social Tiles",   img: "/assets/photos/gallery-01.jpg" },
    { title: "Product Landing Layout",  img: "/assets/photos/gallery-02.jpg" },
    { title: "Brand System Explorations", img: "/assets/photos/gallery-03.jpg" }
  ],
  photos: [
    { title: "Event — Placeholder",    img: "/assets/photos/gallery-04.jpg" },
    { title: "Portrait — Placeholder", img: "/assets/photos/gallery-05.jpg" },
    { title: "Product — Placeholder",  img: "/assets/photos/gallery-06.jpg" },
    { title: "Wedding — Placeholder",  img: "/assets/photos/gallery-07.jpg" },
    { title: "Aviation — Placeholder", img: "/assets/photos/gallery-08.jpg" }
  ],

  // Brands
  brands: [
    {
      title: "1Take Studio",
      tag: "Software",
      desc: "Backup & ingest made easy, designed for professionals by professionals.",
      img: "/assets/1takelogo.png",
      url: "https://1takestudio.ca"
    },
    {
      title: "Stories Blossomed",
      tag: "Weddings",
      desc: "Our luxury wedding film brand that blends cinematic visuals with heartfelt storytelling.",
      img: "/assets/storiesblossomedlogo.png",
      url: "https://storiesblossomed.ca"
    }
  ]
};
