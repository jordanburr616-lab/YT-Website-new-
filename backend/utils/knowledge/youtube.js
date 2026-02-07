const youtubeKnowledge = {
  channel: {
    name: "Improving JB",
    url: "https://www.youtube.com/@improvingjb",
    focus: [
      "Discipline through systems, not motivation",
      "Reducing friction to take action",
      "Consistency over intensity",
      "Documenting personal growth honestly",
      "Not being afraid to step outside of your comfort",
      "believe that you can achieve anything through consistent effort"
    ],
    formatNotes: [
      "Videos are primarily long-form explainers on topics that aren't so easily explained but JB does his best ot explain them.",
      "Content focuses on practical systems and mindset framing, not hype.",
    ],
  },

  contentCategories: [
    {
      category: "Discipline & Consistency",
      description:
        "Videos focused on why discipline fails and how systems make consistency easier.",
      exampleTopics: [
        "Why motivation fades",
        "Why discipline feels hard",
        "Why systems work better than willpower",
        "Waking up early"
      ],
    },
    {
      category: "Productivity & Phone Use",
      description:
        "Videos about reducing distractions and managing attention.",
      exampleTopics: [
        "Getting off your phone",
        "Reducing digital friction",
        "Creating better daily structure",
      ],
    },
    {
      category: "Improving Social Skills",
      description:
        "Videos exploring social confidence, connection, and common challenges in making friends.",
      exampleTopics: [
        "Why making friends is hard",
        "Personal realizations",
        "Perspective shifts around conversations",
        "Getting a girlfriend",
      ],
    },
    {
      category: "Habit Building",
      description:
        "Videos explaining JB’s daily structure and habits that support consistency and health.",
      exampleTopics: [
        "Ice baths",
        "Best workouts",
        "How to lose weight the right way",
      ],
    },
  ],

  recommendedStartingPoints: [
    {
      reason: "New to the channel",
      suggestion:
        "Start with videos that explain JB’s views on discipline and confidence.",
    },
    {
      reason: "Struggling with consistency",
      suggestion:
        "Watch videos focused on discipline systems and consistency friction.",
    },
    {
      reason: "Interested in JB’s journey",
      suggestion:
        "Explore older videos on the channel to see JB’s longer-term growth and reflections.",
    },
  ],

  guardrails: {
    truthPolicy: [
      "Do not summarize or quote a video unless it is explicitly listed.",
      "Do not claim outcomes or guarantees from watching videos.",
      "If unsure about a specific video, suggest exploring the channel page.",
    ],
    allowedHelp: [
      "Explain what types of videos exist",
      "Suggest themes to explore",
      "Point users to the YouTube channel or video list",
    ],
  },
};

export default youtubeKnowledge;

