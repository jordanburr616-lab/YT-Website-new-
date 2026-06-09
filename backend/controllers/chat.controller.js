import { getChatResponse } from "../utils/aiClient.js";

export async function handleChat(req, res) {
  try {
    const { message, context, page, history } = req.body;

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return res.status(400).json({ error: "Invalid message" });
    }

    const reply = await getChatResponse({
      message: message.trim(),
      context,
      page,
      history,
    });

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
}