import { useState, useEffect } from "react";

function Chat({ onSave }) {
  const [bandsState, setBandsState] = useState("waiting");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);


  useEffect(() => {
    setBandsState("thinking");

    const timer = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          text: "I’m Bands. What are you looking for?\n• Systems & templates\n• YouTube content\n• About JB",
          
        },
      ]);
      setBandsState("waiting");
      

    }, 500); // ← this delay is the “signal”

    return () => clearTimeout(timer);
  }, []);

  const handleNewChat = () => {
      setMessages([]);
    };
    
  const handleSave = () => {
    if (messages.length === 0) return;

    onSave(messages);
  };

  async function handleSend() {
  if (!input.trim() || loading) return;

  const userText = input;        // ✅ MUST COME FIRST
  setInput("");

  // USER MESSAGE
  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText },
  ]);

  let inferredCategory = activeCategory;

  // ✅ INFERENCE HAPPENS AFTER userText EXISTS
  if (!activeCategory) {
    const lower = userText.toLowerCase();

    if (lower.includes("youtube") || lower.includes("video")) {
      inferredCategory = "youtube";
      setActiveCategory("youtube");
    } else if (lower.includes("system") || lower.includes("template")) {
      inferredCategory = "systems";
      setActiveCategory("systems");
    } else if (lower.includes("about") || lower.includes("jb")) {
      inferredCategory = "about";
      setActiveCategory("about");
    }
  }

  setLoading(true);
  setBandsState("thinking");

  try {
    const res = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        context: inferredCategory,
      }),
    });

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();

    setBandsState("talking");
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);
  } catch {
    setBandsState("talking");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Something went wrong. Try again.",
      },
    ]);
  } finally {
    setLoading(false);           // ✅ THIS MUST ALWAYS RUN
    setTimeout(() => setBandsState("waiting"), 700);
  }
}


  return (

    
    <div className="chat-wrapper"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* CHAT HISTORY */}
      <div className="chat-body"
        style={{
          flex: 1,
          padding: "16px",
          paddingTop: "5px",
          paddingBottom: "120px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                background:
                  msg.role === "user" ? "#f3f4f6" : "#ffffff",
                fontSize: "14px",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="chat-input"
        style={{
          position: "relative",
          borderTop: "1px solid #e5e7eb",
          padding: "16px 16px 16px min(80px, 22vw)",
          display: "flex",
          alignItems: "flex-end",
          gap: "14px",
          minHeight: "88px",
        }}
      >
        {/* BANDS STATE IMAGE */}
        <img
          src={`/images/${bandsState}.png`}
          alt="Bands"
          className="bands-avatar"
        />

        {/* TEXT INPUT */}
        <input
          type="text"
          placeholder="Ask Bands..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            height: "44px",
          }}
        />

        {/* SEND */}
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#2b2b2b",
            color: "white",
            cursor: loading ? "default" : "pointer",
            fontWeight: "600",
            height: "44px",
            opacity: loading ? 0.7 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

