import { getChatResponse } from "../utils/aiClient.js";

const VALID_CONTEXTS = new Set([
  "website",
  "systems",
  "content",
  "about",
  "community",
]);

export async function handleChat(req, res) {
  try {
    const { message, context, page, history } = req.body;

    if (
      typeof message !== "string" ||
      message.trim().length < 1
    ) {
      return res.status(400).json({
        error: "Invalid message",
      });
    }

    const safeContext = VALID_CONTEXTS.has(context)
      ? context
      : null;

    const reply = await getChatResponse({
      message: message.trim(),
      context: safeContext,
      page:
        typeof page === "string"
          ? page.slice(0, 200)
          : "unknown",
      history: Array.isArray(history) ? history : [],
    });

    return res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);

    return res.status(500).json({
      error: "Chat failed",
    });
  }
}