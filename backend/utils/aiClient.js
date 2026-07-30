import OpenAI from "openai";

import { baseSystemPrompt } from "./basePrompts.js";
import { contextPrompts } from "./contextPrompts.js";

import websiteKnowledge from "./knowledge/website.js";
import systemsKnowledge from "./knowledge/systems.js";
import youtubeKnowledge from "./knowledge/youtube.js";
import aboutKnowledge from "./knowledge/about.js";
import communityKnowledge from "./knowledge/community.js";
import videosKnowledge from "./knowledge/videosKnowledge.js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const globalKnowledge = {
  website: {
    purpose:
      "Improving JB connects systems, interactive tools, videos, articles, newsletter updates, information about JB, and community feedback.",
  },

  systems: {
    available: [
      "The Routine",
      "30 Day Reset",
      "The 10 Week Build",
    ],
  },

  content: {
    channelName: "Improving JB",
    includes:
      "Published YouTube videos and companion articles covering discipline, fitness, habits, confidence, addictions, and personal growth.",
  },

  about: {
    summary:
      aboutKnowledge?.summary ||
      "Information about JB and the purpose behind Improving JB.",
  },

  community: {
    summary:
      communityKnowledge?.summary ||
      "The Community area currently focuses on user feedback.",
  },
};

function getKnowledgeByContext(context) {
  switch (context) {
    case "website":
      return websiteKnowledge;

    case "systems":
      return systemsKnowledge;

    case "content":
      return {
        channel: youtubeKnowledge,
        videos: videosKnowledge.filter(
          (video) => video.status === "published"
        ),
      };

    case "about":
      return aboutKnowledge;

    case "community":
      return communityKnowledge;

    default:
      return null;
  }
}

function getContextPrompt(context) {
  return (
    contextPrompts[context] ||
    `
The user has not selected a specific context.

Answer as the general site guide for Improving JB.
Use the available knowledge to help them find the right website section, system, video, about page, or community area.
Do not give personal coaching.
`
  );
}

function cleanHistory(history = []) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (msg) =>
        msg &&
        ["user", "assistant"].includes(msg.role) &&
        typeof msg.content === "string"
    )
    .map((msg) => ({
      role: msg.role,
      content: msg.content.trim().slice(0, 2000),
    }))
    .filter((msg) => msg.content.length > 0)
    .slice(-8);
}

export async function getChatResponse({
  message,
  context,
  page,
  history = [],
}) {
  const activeContextKnowledge = getKnowledgeByContext(context);

  const messages = [
    { role: "system", content: baseSystemPrompt },
    { role: "system", content: getContextPrompt(context) },
    {
      role: "system",
      content: `Current page/context info:
        Context: ${context || "none"}
        Page: ${page || "unknown"}

        Use this only as navigation context.
        Do not assume the user has read, completed, purchased, or used anything on this page.`,
    },
    {
      role: "system",
      content: `Global knowledge:
${JSON.stringify(globalKnowledge, null, 2)}`,
    },
  ];

  if (activeContextKnowledge) {
    messages.push({
      role: "system",
      content: `Detailed knowledge for current context:
${JSON.stringify(activeContextKnowledge, null, 2)}`,
    });
  }

  messages.push(...cleanHistory(history));

  const cleanedMessage =
    typeof message === "string"
      ? message.trim().slice(0, 1500)
      : "";

  if (!cleanedMessage) {
    throw new Error("A valid message is required");
  }

  messages.push({
    role: "user",
    content: cleanedMessage,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.4,
  });

  return (
    response.choices?.[0]?.message?.content?.trim() ||
    "I couldn't generate a response."
  );
}
