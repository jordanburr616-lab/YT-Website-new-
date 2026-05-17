const websiteKnowledge = {
  site: {
    name: "Improving JB",

    tagline: "Keep Building.",

    purpose:
      "A central hub connecting JB’s YouTube content, systems, programs, future community features, and tools focused on helping people unf*ck their lives through structure, discipline, and long-term self-improvement.",
  },

  navigation: {
    primaryTabs: ["Home", "Programs", "About Me", "Community"],

    defaultLanding: "Home",

    notes: [
      "The main navigation is located in the top tab bar.",

      "The chat button in the bottom right allows users to talk to Bands for guidance around the site and ecosystem.",

      "Different sections of the site connect together as part of the broader Improving JB ecosystem.",
    ],
  },

  pages: {
    home: {
      label: "Home",

      purpose:
        "Quick overview of the Improving JB ecosystem, featured systems, and recent content.",

      mainSections: [
        "Hero section (Keep Building)",

        "Featured system highlight (30 Day Reset)",

        "Programs preview section",

        "Recent YouTube videos section",

        "Social links (YouTube, Instagram, TikTok)",

        "Newsletter and future ecosystem growth areas",
      ],

      commonUserGoals: [
        "Find JB’s newest YouTube videos",

        "Understand what the platform is about",

        "Explore available systems and programs",

        "Get introduced to the ecosystem quickly",
      ],
    },

    programs: {
      label: "Programs",

      purpose:
        "Explore JB’s systems, templates, and structured programs designed around discipline, execution, and long-term growth.",

      currentPrograms: [
        {
          name: "30 Day Reset",

          status: "available",

          summary:
            "A structured reset system focused on rebuilding consistency, structure, and daily execution.",
        },
      ],

      plannedPrograms: [
        {
          name: "10 Week Workout Plan",

          status: "in progress",

          summary:
            "A future fitness-focused system centered around consistency and sustainable progress.",
        },

        {
          name: "Additional Systems",

          status: "planned",

          summary:
            "More systems and tools are planned as the ecosystem continues developing.",
        },
      ],

      commonUserGoals: [
        "Understand what the 30 Day Reset is",

        "Explore available systems and future plans",

        "Find tools related to discipline, consistency, and self-improvement",
      ],
    },

    about: {
      label: "About Me",

      purpose:
        "Learn who JB is, what Improving JB stands for, and how the ecosystem connects together.",

      topics: [
        "JB’s systems-first philosophy",

        "Why Improving JB was created",

        "The connection between YouTube content, systems, and community",

        "The overall mission of helping people rebuild structure and direction",
      ],

      commonUserGoals: [
        "Understand JB’s approach and philosophy",

        "Learn the purpose behind the ecosystem",

        "Get context before exploring systems or content",
      ],
    },

    chat: {
      label: "Chat",

      purpose:
        "Talk to Bands for help navigating the ecosystem and understanding JB’s content, systems, and website.",

      expectations: [
        "Bands helps users navigate the site and ecosystem.",

        "Bands explains systems, videos, pages, and overall platform direction.",

        "Bands does not provide personal coaching or therapy.",
      ],

      commonUserGoals: [
        "Find where something is located",

        "Understand what a program is for",

        "Figure out where to start",

        "Learn how different parts of the ecosystem connect",
      ],
    },

    community: {
      label: "Community",

      purpose:
        "Support the long-term goal of building a community centered around growth, discipline, accountability, and shared self-improvement.",

      topics: [
        "User feedback and ecosystem improvement",

        "Future Discord and membership plans",

        "Audience involvement in future systems and content",

        "Building a healthier self-improvement culture online",
      ],

      commonUserGoals: [
        "Share feedback with JB",

        "Understand the future vision of the community",

        "Stay connected to future updates and ecosystem growth",
      ],
    },
  },

  externalLinks: {
    youtubeChannel: "https://www.youtube.com/@improvingjb",

    youtubeVideos: "https://www.youtube.com/@improvingjb/videos",

    instagram: "https://www.instagram.com/improvingjb/?hl=en",

    tiktok: "https://www.tiktok.com/@improvingjb",
  },

  pageHints: {
    findingVideos: "Home → YouTube section",

    findingPrograms: "Programs tab",

    learningAboutJB: "About Me tab",

    futureCommunity: "Community tab",

    gettingHelp: "Chat button",
  },

  limitations: [
    "The Community section is still early in development.",

    "Only the 30 Day Reset is currently fully available.",

    "Some future systems and features are still being built.",
  ],

  guardrails: {
    truthPolicy: [
      "Do not invent features, pages, systems, or content that are not provided in the knowledge base.",

      "If something is still in development, say so clearly.",

      "If information is unknown, be honest instead of guessing.",

      "Prefer directing users toward the correct section of the site.",
    ],

    allowedHelp: [
      "Navigation guidance",

      "Explaining what each page or section is for",

      "Explaining how the ecosystem connects together",

      "Helping users find systems, videos, or community areas",
    ],
  },
};

export default websiteKnowledge;