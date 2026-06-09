import OpenAI from "openai";

import { baseSystemPrompt } from "./basePrompts.js";
import { contextPrompts } from "./contextPrompts.js";

import websiteKnowledge from "./knowledge/website.js";
import systemsKnowledge from "./knowledge/systems.js";
import youtubeKnowledge from "./knowledge/youtube.js";
import aboutKnowledge from "./knowledge/about.js";
import communityKnowledge from "./knowledge/community.js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const globalKnowledge = {
  website: websiteKnowledge?.summary || websiteKnowledge,
  systems: systemsKnowledge?.summary || systemsKnowledge,
  youtube: youtubeKnowledge?.summary || youtubeKnowledge,
  about: aboutKnowledge?.summary || aboutKnowledge,
  community: communityKnowledge?.summary || communityKnowledge,
};

function getKnowledgeByContext(context) {
  switch (context) {
    case "website":
      return websiteKnowledge;
    case "systems":
      return systemsKnowledge;
    case "youtube":
      return youtubeKnowledge;
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
  return history
    .filter(
      (msg) =>
        msg &&
        ["user", "assistant"].includes(msg.role) &&
        typeof msg.content === "string"
    )
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
Page: ${page || "unknown"}`,
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
  messages.push({ role: "user", content: message });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.4,
  });

  return response.choices[0].message.content;
}
