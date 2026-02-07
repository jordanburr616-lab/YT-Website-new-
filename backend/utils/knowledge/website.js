const websiteKnowledge = {
  site: {
    name: "Improving JB",
    tagline: "Keep Building.",
    purpose:
      "A hub for JB’s YouTube content, community tab (coming soon), productivity systems.",
  },

  // How users move around the site
  navigation: {
    primaryTabs: ["Home", "Programs", "About Me", "Community"],
    defaultLanding: "Home",
    notes: [
      "The main navigation is the top tab bar.",
      "The chat button on the bottom right is where users talk to Bands (me) for guidance.",
    ],
  },

  // What each page is for + what users can expect to see there
  pages: {
    home: {
      label: "Home",
      purpose: "Quick overview of the ecosystem and featured content.",
      mainSections: [
        "Hero section (Keep Building)",
        "Featured program highlight (30 Day Reset)",
        "Programs preview",
        "YouTube section with 6 of the most recent videos",
        "Social links (YouTube, Instagram, TikTok)",
      ],
      commonUserGoals: [
        "Find the newest YouTube videos",
        "See what programs exist",
        "Get a quick sense of what the site and this youtuber is",
      ],
    },

    programs: {
      label: "Programs",
      purpose: "Browse JB’s systems and programs (current and future).",
      currentPrograms: [
        {
          name: "30 Day Reset",
          status: "available",
          summary:
            "A structured planner/template intended to make consistent execution easier through daily structure.",
        },
      ],
      plannedPrograms: [
        {
          name: "More Systems Coming",
          status: "planned",
          summary: "Additional systems will be added over time.",
        },
      ],
      commonUserGoals: [
        "Understand what the 30 Day Reset is",
        "10 week workout program in the works",
        "See what systems exist or are coming soon",
      ],
    },

    about: {
      label: "About Me",
      purpose: "Learn who JB is and what the ecosystem is built around.",
      topics: [
        "JB’s philosophy (systems win over motivation any day)",
        "Why does this ecosystem exists",
        "How the YouTube content and systems connect",
      ],
      commonUserGoals: [
        "Understand JB’s approach and intent",
        "Get context before using programs",
      ],
    },

    chat: {
      label: "Chat",
      purpose: "Talk to Bands for guidance around the site and JB’s ecosystem.",
      expectations: [
        "Bands helps users navigate and understand content.",
        "Bands stays within the supported categories (website, systems, YouTube, about, community).",
      ],
      commonUserGoals: [
        "Ask where to find something",
        "Ask what a program is for",
        "Ask what video to start with",
      ],
    },

    community: {
      label: "Community",
      purpose: "Create a community of like minded people who all want to keep improving",
      topics: [
        "Provide feedback to JB for future changes to YT, Systems, and website",
        "Future discord / youtube membership pages in the works",
      ],
      commonUserGoals: [
        "Understand the JB is trying to build a positive impact on youtube",
        "Provide feedback to JB so that it's not just his channel but also his viewers",
      ],
    },

  },

  // Useful fixed links or external destinations
  externalLinks: {
    youtubeChannel: "https://www.youtube.com/@improvingjb",
    youtubeVideos: "https://www.youtube.com/@improvingjb/videos",
    instagram: "https://www.instagram.com/improvingjb/?hl=en",
    tiktok: "https://www.tiktok.com/@animedriven", //going to need a change in the future
  },

  // Guardrails to prevent the bot from confidently lying
  guardrails: {
    truthPolicy: [
      "If information is not in the provided knowledge, do not guess just be honest and If information is not in the provided knowledge, say you don’t have enough information and suggest what you *can* help with.",
      "If a feature is in development, say so clearly.",
      "Prefer directing the user to the correct tab or section.",
    ],
    allowedHelp: [
      "Navigation help (what tab/section to use)",
      "Explaining what a page or section is for",
      "Explaining what content exists on the site",
    ],
  },

  pageHints: {
    findingVideos: "Home → YouTube section",
    findingPrograms: "Programs tab",
    learningAboutJB: "About Me tab",
    futureWebsite: "Community tab",
    gettingHelp: "Chat tab",
    },

    limitations: [
    "Community tab is very minimal.",
    "Only the 30 Day Reset is currently available.",
    ]

};

export default websiteKnowledge;
