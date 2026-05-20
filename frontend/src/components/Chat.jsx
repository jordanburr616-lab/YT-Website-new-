import { useState, useEffect, useRef } from "react";

function Chat() {
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
          text: "Hello there! My name's Bands. \n \n What would you like to explore?",
          
        },
      ]);
      setBandsState("waiting");
      

    }, 500); // ← this delay is the “signal”

    return () => clearTimeout(timer);
  }, []);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
    
  const handleSave = () => {
    if (messages.length === 0) return;

    onSave(messages);
  };

  function getLinkLabel(url) {
    if (url.includes("youtube.com")) return "Watch on YouTube";
    if (url.includes("instagram.com")) return "Visit Instagram";
    if (url.includes("tiktok.com")) return "Visit TikTok";
    if (url.includes("gumroad.com")) return "Open Download";
    return "Open Link";
  }

  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        const cleanUrl = part.replace(/[.,!?;:)]$/, "");

        return (
          <a
            key={index}
            href={cleanUrl}
            target="_blank"
            rel="noreferrer"
            className="chat-link-button"
          >
            {getLinkLabel(cleanUrl)}
          </a>
        );
      }

      return part;
    });
  }

  function inferCategory(text) {
    const lower = text.toLowerCase();

    // YOUTUBE
    if (
      lower.includes("youtube") ||
      lower.includes("video") ||
      lower.includes("channel") ||
      lower.includes("watch")
    ) {
      return "youtube";
    }

    // SYSTEMS
    if (
      lower.includes("system") ||
      lower.includes("program") ||
      lower.includes("template") ||
      lower.includes("reset") ||
      lower.includes("30 day") ||
      lower.includes("workout")
    ) {
      return "systems";
    }

    // COMMUNITY
    if (
      lower.includes("community") ||
      lower.includes("discord") ||
      lower.includes("feedback") ||
      lower.includes("membership")
    ) {
      return "community";
    }

    // WEBSITE / SOCIALS
    if (
      lower.includes("website") ||
      lower.includes("site") ||
      lower.includes("page") ||
      lower.includes("where") ||
      lower.includes("link") ||
      lower.includes("tiktok") ||
      lower.includes("instagram") ||
      lower.includes("insta") ||
      lower.includes("social")
    ) {
      return "website";
    }

    // ABOUT
    if (
      lower.includes("who is jb") ||
      lower.includes("who are you") ||
      lower.includes("about jb")
    ) {
      return "about";
    }

    return null;
  }

  async function handleSend() {
  if (!input.trim() || loading) return;

  const userText = input;        // ✅ MUST COME FIRST
  setInput("");

  // USER MESSAGE
  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText },
  ]);

  const inferredCategory = inferCategory(userText);
  const finalCategory = inferredCategory || activeCategory;

  if (!finalCategory) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "What are you looking for? Choose a topic below or ask about Systems, YouTube, JB, or Community.",
      },
    ]);
    return;
  }

  const chatHistory = messages.slice(-8).map((msg) => ({
    role: msg.role,
    content: msg.text,
  }));


  setLoading(true);
  setBandsState("thinking");

  try {
    //when testing locally pls update this
    const API_URL = "https://improving-jb-production.up.railway.app";

    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        context: finalCategory,
        page: window.location.pathname,
        history: chatHistory,
      }),
    });

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();

    if (inferredCategory) {
      setActiveCategory(inferredCategory);
    }

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

function handleStarterClick(text) {
  setInput(text);
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
              {linkifyText(msg.text)}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
                fontSize: "14px",
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              Bands is thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

        {messages.length === 1 && messages[0].role === "assistant" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginTop: "12px",
              width: "fit-content",
              maxWidth: "360px",
              alignSelf: "flex-start",
            }}
          >
            {["Systems & Programs", "YouTube", "About JB", "Community"].map((label) => (
              <button
                key={label}
                onClick={() => handleStarterClick(label)}
                style={{
                  width: "100%",
                  minHeight: "62px",
                  borderRadius: "16px",
                  border: "1px solid #4aabfa",
                  background: "#dbeafe",
                  color: "#255079",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
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

