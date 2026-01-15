import OpenAI from "openai";

import { baseSystemPrompt } from "./basePrompts.js";
import { contextPrompts } from "./contextPrompts.js";

import websiteKnowledge from "./knowledge/website.js";
import systemsKnowledge from "./knowledge/systems.js";
import youtubeKnowledge from "./knowledge/youtube.js";
import aboutKnowledge from "./knowledge/about.js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    default:
      return null;
  }
}

export async function getChatResponse({
  message,
  context,
  page,
  history = [],
}) {
  const messages = [
    { role: "system", content: baseSystemPrompt },
    { role: "system", content: contextPrompts[context] },
  ];

  const knowledge = getKnowledgeByContext(context);
  if (knowledge) {
    messages.push({
      role: "system",
      content: `Knowledge:\n${JSON.stringify(knowledge, null, 2)}`,
    });
  }

  messages.push(...history);
  messages.push({ role: "user", content: message });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.6,
  });

  return response.choices[0].message.content;
}
