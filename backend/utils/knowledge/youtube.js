const youtubeKnowledge = {
  channel: {
    name: "Improving JB",

    url: "https://www.youtube.com/@improvingjb",

    videosUrl: "https://www.youtube.com/@improvingjb/videos",

    focus: [
      "Rebuilding discipline through systems and structure",

      "Reducing chaos, distractions, and self-destructive habits",

      "Improving fitness, confidence, focus, and personal direction",

      "Consistency over short bursts of motivation",

      "Documenting personal growth honestly while still improving",

      "Stepping outside comfort zones and confronting difficult habits",

      "Helping people unf*ck their lives through awareness, execution, and long-term growth",
    ],

    formatNotes: [
      "Videos are primarily long-form explainers focused on difficult self-improvement topics that are often oversimplified online.",

      "Content combines JB’s personal experiences, systems thinking, observations, practical frameworks, humor, and visual storytelling.",

      "Videos often use Bands and other stick-figure characters to make serious topics easier to understand and more entertaining.",

      "JB may also appear in talking segments to explain ideas directly.",

      "The tone is intended to feel honest and grounded rather than hype-driven or fake motivational.",

      "Many videos connect directly to systems, tools, articles, routines, discipline struggles, fitness, addictions, distractions, and rebuilding structure.",

      "Some videos have companion articles that present the same core topic in a written format.",
    ],
  },

  contentCategories: [
    {
      category: "Discipline & Consistency",

      description:
        "Videos exploring why consistency is difficult and how identity, structure, systems, environment, and repeated action affect long-term discipline.",

      exampleTopics: [
        "Why motivation fades",

        "Why discipline feels difficult",

        "Why systems outperform willpower",

        "The reality of rebuilding consistency",

        "Daily structure and routines",

        "Getting out of a rut",

        "Making difficult habits easier to repeat",
      ],
    },

    {
      category: "Phone Addiction & Distractions",

      description:
        "Videos focused on attention, overstimulation, phone addiction, scrolling habits, dopamine, and reducing digital chaos.",

      exampleTopics: [
        "Why scrolling is hard to stop",

        "Getting off your phone",

        "Reducing digital distractions",

        "How overstimulation affects consistency",

        "Creating a healthier environment for focus",

        "Breaking addictive patterns",
      ],
    },

    {
      category: "Self-Improvement & Mindset",

      description:
        "Videos about identity, self-awareness, discomfort, confidence, personal growth, and rebuilding direction over time.",

      exampleTopics: [
        "Changing habits and identity",

        "Getting out of comfort zones",

        "The reality of self-improvement",

        "Learning through failure and setbacks",

        "Rebuilding confidence through action",

        "Caring less about other people’s opinions",

        "Escaping periods of feeling stuck",
      ],
    },

    {
      category: "Fitness & Physical Growth",

      description:
        "Videos focused on strength training, weight loss, gym consistency, recovery, physical challenges, and sustainable fitness progress.",

      exampleTopics: [
        "Building gym consistency",

        "Making training more enjoyable",

        "Weight loss stages and expectations",

        "Strength and workout structure",

        "Recovery and burnout",

        "Long-term fitness progress",

        "Using fitness to build discipline and identity",
      ],
    },

    {
      category: "Relationships & Social Growth",

      description:
        "Videos exploring confidence, loneliness, relationships, social discomfort, self-worth, and connection.",

      exampleTopics: [
        "Why making friends feels harder",

        "Social confidence",

        "Overthinking conversations",

        "Relationships and self-worth",

        "Fear of judgment",

        "Personal reflections and realizations",
      ],
    },

    {
      category: "Systems & Execution",

      description:
        "Videos explaining practical systems, environments, routines, and frameworks that make meaningful action easier to repeat.",

      exampleTopics: [
        "Building routines",

        "Reducing friction",

        "Designing a better environment",

        "Creating rewards and feedback loops",

        "Using structured resets",

        "Turning ideas into consistent execution",
      ],
    },
  ],

  recommendationGuidance: {
    rules: [
      "Recommend a specific confirmed video when one clearly matches the user’s question.",

      "Briefly explain why the video matches instead of only giving its title.",

      "Recommend the strongest match first instead of listing many loosely related videos.",

      "If no individual video is confirmed in the knowledge base, recommend a relevant category or the channel instead of inventing a title.",

      "If both a video and companion article exist, mention that the same topic can be watched or read.",

      "Only provide a direct video URL when the exact URL is included in the knowledge base.",

      "Do not assume the newest video is automatically the best recommendation.",

      "Use the user’s actual struggle or interest to choose a recommendation.",
    ],

    generalStartingPoints: [
      {
        reason: "New to the channel",

        suggestion:
          "Start with a confirmed video that clearly introduces one of Improving JB’s main themes, such as discipline, consistency, fitness, or rebuilding structure.",
      },

      {
        reason: "Struggling with distractions or phone use",

        suggestion:
          "Explore confirmed videos about scrolling, attention, digital overstimulation, dopamine, and environment design.",
      },

      {
        reason: "Feeling stuck or inconsistent",

        suggestion:
          "Explore confirmed videos about getting out of a rut, rebuilding momentum, discipline, or daily execution.",
      },

      {
        reason: "Interested in fitness",

        suggestion:
          "Explore confirmed videos about weight loss, building muscle, gym consistency, physical growth, and sustainable training.",
      },

      {
        reason: "Interested in JB’s personal growth journey",

        suggestion:
          "Explore both older and newer videos to see how JB’s thinking, visual style, systems, and personal direction have evolved.",
      },

      {
        reason: "Interested in systems and practical execution",

        suggestion:
          "Explore confirmed videos connected to discipline, routines, environment design, the 30 Day Reset, The Routine, and other systems-focused ideas.",
      },
    ],
  },

  articleConnection: {
    relationship:
      "Many Improving JB articles are written companions to YouTube videos and may cover the same central topic, framework, or lessons.",

    guidance: [
      "Offer the video when the user would rather watch the topic explained visually.",

      "Offer the article when the user would rather read or revisit the ideas in written form.",

      "Do not claim an article exists for a video unless it is confirmed in the article knowledge.",

      "Do not assume the article and video titles are always identical.",

      "When both exist, Bands may mention both without treating them as separate unrelated recommendations.",
    ],
  },

  ecosystemConnection: {
    role:
      "The YouTube channel acts as the main storytelling, education, and discovery layer of the Improving JB ecosystem.",

    connections: [
      "Videos introduce struggles, lessons, systems, frameworks, and mindset shifts.",

      "Articles provide a written way to explore many of the same topics.",

      "Programs, templates, and interactive tools help turn ideas into structured action.",

      "The newsletter helps users stay connected to new videos, articles, systems, and updates.",

      "The website connects videos, articles, systems, tools, updates, and community feedback together.",
    ],
  },

  guardrails: {
    truthPolicy: [
      "Do not invent video titles, summaries, lessons, categories, publication status, or URLs that are not provided in the knowledge base.",

      "Do not claim a video covers a specific idea unless that idea exists in its summary, topics, or key ideas.",

      "Do not guarantee outcomes from watching content.",

      "If unsure whether a video exists, direct users toward a confirmed category, recent uploads page, or the YouTube channel instead of guessing.",

      "Do not present JB as a perfect expert with all the answers.",

      "Do not describe a scheduled or planned video as published.",

      "Do not claim every video has a companion article.",

      "Do not turn a video framework into a detailed personalized plan for the user.",
    ],

    allowedHelp: [
      "Explain the types of videos on the channel",

      "Recommend confirmed videos based on the user’s interests or struggles",

      "Suggest content categories or themes to explore",

      "Summarize confirmed videos using the provided knowledge",

      "Explain how videos connect to articles, systems, tools, and the website",

      "Help users choose whether to watch a video or read a related article",

      "Direct users toward the YouTube channel, videos page, or exact confirmed video link",
    ],
  },
};

export default youtubeKnowledge;