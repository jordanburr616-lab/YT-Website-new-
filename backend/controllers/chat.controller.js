import { getChatResponse } from "../utils/aiClient.js";

export async function handleChat(req, res) {
  try {
    const { message, context, page, history } = req.body;

    if (!message || message.length < 3) {
      return res.status(400).json({ error: "Invalid message" });
    }

    // HARD GATE — controller decides flow
    if (!context) {
      return res.json({
        reply:
          "What are you looking for?\n• Website details\n• Systems & programs\n• YouTube\n• About JB",
      });
    }

    const reply = await getChatResponse({
      message,
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
