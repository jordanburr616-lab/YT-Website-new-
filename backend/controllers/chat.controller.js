import { getChatResponse } from "../utils/aiClient.js";

export async function handleChat(req, res) {
  try {
    const { message, context } = req.body;

    if (!message || message.length < 3) {
      return res.status(400).json({ error: "Invalid message" });
    }

    const reply = await getChatResponse(message);

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
}
