import { useState, useEffect } from "react";

function Chat() {
  const [bandsState, setBandsState] = useState("waiting");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // initial assistant message
    setBandsState("talking");

    setMessages([
      {
        role: "assistant",
        text: "I’m Bands. Want to explore the systems, or do you have a question about the site?",
      },
    ]);

    setTimeout(() => setBandsState("waiting"), 800);
  }, []);

  return (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* CHAT HISTORY */}
    <div
      style={{
        flex: 1,
        padding: "16px",
        overflowY: "auto",
      }}
    >
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: "12px" }}>
          {msg.text}
        </div>
      ))}
    </div>

    {/* INPUT BAR */}
    <div
      style={{
        position: "relative",          // IMPORTANT
        borderTop: "1px solid #e5e7eb",
        padding: "16px 16px 16px min(80px, 22vw)",
        display: "flex",
        alignItems: "flex-end",
        gap: "14px",
        minHeight: "88px",
      }}
    >


      {/* BANDS STATE */}
      <img
        src={`/images/${bandsState}.png`}
        alt="Bands"
        style={{
          position: "absolute",
          left: "16px",
          bottom: "100%",          // anchors to divider line
          width: "min(140px, 18vw)",
          height: "auto",
          objectFit: "contain",
          pointerEvents: "none",
          
        }}
      />


      {/* TEXT INPUT */}
      <input
        type="text"
        placeholder="Ask Bands..."
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
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: "none",
          background: "#2b2b2b",
          color: "white",
          cursor: "pointer",
          fontWeight: "600",
          height: "44px",        
        }}
      >
        Send
      </button>


    </div>
  </div>
  );
}

export default Chat;
