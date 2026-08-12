import { useState, useEffect, useRef } from "react";
import { trackEvent } from "../utils/analytics";

function Chat() {
  const [bandsState, setBandsState] = useState("waiting");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const firstTopicTrackedRef = useRef(false);
  const [thinkingFrame, setThinkingFrame] = useState(1);
  const [waitingFrame, setWaitingFrame] = useState(0);
  const [sleepFrame, setSleepFrame] = useState(1);

  useEffect(() => {
    setBandsState("thinking");

    const timer = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          text: "Hi! I'm Bands. \n \nWhat can I help you find today?",
          
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

  useEffect(() => {
  if (!loading) {
    setThinkingFrame(1);
    return;
  }

  const interval = setInterval(() => {
    setThinkingFrame((prev) => (prev === 3 ? 1 : prev + 1));
  }, 450);

  return () => clearInterval(interval);
}, [loading]);

useEffect(() => {
  if (bandsState !== "waiting") {
    setWaitingFrame(0);
    return;
  }

  let bobTimeout;
  let resetTimeout;

  const scheduleBob = () => {
    const delay = 3000 + Math.random() * 2500;

    bobTimeout = setTimeout(() => {
      setWaitingFrame(1);

      resetTimeout = setTimeout(() => {
        setWaitingFrame(0);
        scheduleBob();
      }, 350);
    }, delay);
  };

  scheduleBob();

  return () => {
    clearTimeout(bobTimeout);
    clearTimeout(resetTimeout);
  };
}, [bandsState]);

useEffect(() => {
    if (bandsState !== "waiting") return;

    const sleepTimeout = setTimeout(() => {
      setSleepFrame(1);
      setBandsState("sleeping");
    }, 3 * 60 * 1000);

    return () => clearTimeout(sleepTimeout);
  }, [bandsState]);

useEffect(() => {
    if (bandsState !== "sleeping") {
      setSleepFrame(1);
      return;
    }

    const interval = setInterval(() => {
      setSleepFrame((prev) => (prev === 3 ? 1 : prev + 1));
    }, 700);

    return () => clearInterval(interval);
  }, [bandsState]);
  

  function getLinkLabel(url) {
  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    return "Watch on YouTube";
  }

  if (url.includes("instagram.com")) return "Visit Instagram";
  if (url.includes("tiktok.com")) return "Visit TikTok";
  if (url.includes("gumroad.com")) return "Open Download";

  return "Open Link";
}

function resolveUrl(url) {
  if (url.startsWith("/")) {
    return `${window.location.origin}${url}`;
  }

  return url;
}

function renderMessageText(text) {
  // Convert plain internal routes into Markdown-style links.
  // Example: /systems/build → [/systems/build](/systems/build)
  const preparedText = text.replace(
    /(^|[\s(])((?:\/(?:systems|articles|community|about|contact))(?:\/[a-zA-Z0-9-_]+)*)(?=$|[\s.,!?;)])/g,
    "$1[$2]($2)"
  );

  const tokenRegex =
    /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|https?:\/\/[^\s]+)/g;

  return preparedText.split(tokenRegex).map((part, index) => {
    if (!part) return null;

    // Render **bold text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Render Markdown links: [Label](URL)
    const markdownLink = part.match(
      /^\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)$/
    );

    if (markdownLink) {
      const [, label, rawUrl] = markdownLink;
      const resolvedUrl = resolveUrl(rawUrl);
      const isInternal = rawUrl.startsWith("/");

      return (
        <a
          key={index}
          href={resolvedUrl}
          onClick={() =>
            trackEvent("chat_link_clicked", {
              page: window.location.pathname,
              metadata: {
                url: resolvedUrl,
                label,
                topic: activeCategory || "unknown",
              },
            })
          }
          target={isInternal ? "_self" : "_blank"}
          rel={isInternal ? undefined : "noreferrer"}
          className="chat-link-button"
        >
          {label}
        </a>
      );
    }

    // Render plain external URLs
    if (part.startsWith("http://") || part.startsWith("https://")) {
      const cleanUrl = part.replace(/[.,!?;:)]$/, "");

      return (
        <a
          key={index}
          href={cleanUrl}
          onClick={() =>
            trackEvent("chat_link_clicked", {
              page: window.location.pathname,
              metadata: {
                url: cleanUrl,
                label: getLinkLabel(cleanUrl),
                topic: activeCategory || "unknown",
              },
            })
          }
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

  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        const cleanUrl = part.replace(/[.,!?;:)]$/, "");

        return (
          <a
            key={index}
            href={cleanUrl}
            onClick={() =>
              trackEvent("chat_link_clicked", {
                page: window.location.pathname,
                metadata: {
                  url: cleanUrl,
                  label: getLinkLabel(cleanUrl),
                  topic: activeCategory || "unknown",
                },
              })
            }
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
      lower.includes("article") ||
      lower.includes("watch") ||
      lower.includes("read")
    ) {
      return "content";
    }

    // SYSTEMS
    if (
      lower.includes("system") ||
      lower.includes("program") ||
      lower.includes("template") ||
      lower.includes("reset") ||
      lower.includes("30 day") ||
      lower.includes("workout") ||
      lower.includes("build") ||
      lower.includes("routine")
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
      lower.includes("about jb") ||
      lower.includes("bands") ||
      lower.includes("creator") ||
      lower.includes("improving jb") ||
      lower.includes("your mission") ||
      lower.includes("why did jb")
    ) {
      return "about";
    }

    return null;
  }

  async function handleSend(messageOverride = null, categoryOverride = null) {
    const userText =
      typeof messageOverride === "string"
        ? messageOverride.trim()
        : input.trim();

    if (!userText || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    const inferredCategory =
      categoryOverride || inferCategory(userText);

    const finalCategory =
      categoryOverride ||
      inferredCategory ||
      activeCategory;

    trackEvent("chat_message_sent", {
      page: window.location.pathname,
      metadata: {
        topic: finalCategory || "unknown",
      },
    });

    if (finalCategory && !firstTopicTrackedRef.current) {
      trackEvent("chat_first_topic_selected", {
        page: window.location.pathname,
        metadata: {
          topic: finalCategory,
          source: categoryOverride
            ? "starter_button"
            : inferredCategory
              ? "typed_message"
              : "active_category",
        },
      });

      firstTopicTrackedRef.current = true;
    }

    if (!finalCategory) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "What are you looking for? Choose a topic below or ask about Videos & Articles, Systems, Website, About JB, or Community.",
        },
      ]);

      return;
    }

    setActiveCategory(finalCategory);
    setLoading(true);
    setBandsState("thinking");

    const chatHistory = messages.slice(-8).map((msg) => ({
      role: msg.role,
      content: msg.text,
    }));

    try {
      const API_URL = "https://improving-jb-production.up.railway.app";

      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          context: finalCategory,
          page: window.location.pathname,
          history: chatHistory,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);

      setBandsState("talking");
    } catch (error) {
      console.error("Chat request failed:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Try again.",
        },
      ]);

      setBandsState("talking");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setBandsState("waiting");
      }, 1200);
    }
  }

const starterTopics = [
  {
    label: "Systems & Programs",
    category: "systems",
  },
  {
    label: "Videos & Articles",
    category: "content",
  },
  {
    label: "About JB",
    category: "about",
  },
  {
    label: "Community",
    category: "community",
  },
];

function handleStarterClick(label, category) {
  trackEvent("chat_starter_clicked", {
    page: window.location.pathname,
    metadata: {
      topic: category,
    },
  });

  handleSend(label, category);
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
              {renderMessageText(msg.text)}
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
          <div className="chat-starter-grid">
            {starterTopics.map(({ label, category }) => (
              <button
                key={category}
                className="chat-starter-button"
                onClick={() => handleStarterClick(label, category)}
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
          src={
            bandsState === "thinking"
              ? `/images/thinking${thinkingFrame}.png`
              : bandsState === "sleeping"
                ? `/images/sleep${sleepFrame}.png`
                : bandsState === "waiting" && waitingFrame === 1
                  ? "/images/waiting1.png"
                  : `/images/${bandsState}.png`
          }
          alt="Bands"
          className={`bands-avatar ${
            bandsState === "thinking" ? "bands-thinking" : ""
          }`}
        />

        {/* TEXT INPUT */}
        <input
          type="text"
          placeholder="Ask Bands..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
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
          onClick={() => handleSend()}
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

