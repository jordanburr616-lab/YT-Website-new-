import { useState } from "react";

import Home from "./components/Home";
import Systems from "./components/Systems";
import About from "./components/About";
import Chat from "./components/Chat";
import Momentum from "./components/Momentum";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);


  const renderTab = () => {
  switch (activeTab) {
    case "systems":
      return <div><Systems /></div>;
    case "about":
      return <div><About /></div>;
    // case "chat":
    //   return <div><Chat /></div>;
    // case "momentum":
    //   return <div><Momentum /></div>;
    default:
      return <Home />;
  }
};

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f5f6ff" }}>
      {/* NAV BAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
          backgroundColor: "#e8e9e9ff",
          borderBottom: "1px solid #646464ff",
        }}
      >
      {/* LOGO */}
      <div
        onClick={() => setActiveTab("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          }}
      >
      <img
        src="/images/youtube-logo.png"
        alt="YouTube logo"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",     
          objectFit: "cover",
        }}
      />

      <span
        style={{
          fontSize: "2.5rem",          
          fontWeight: "800",
          color: "#fafafaff",              
          WebkitTextStroke: "1px black", 
          letterSpacing: "0.8px",

          textShadow: `
            0 0 6px rgba(110, 193, 228, 0.6),
            0 0 12px rgba(110, 193, 228, 0.4),
            0 0 18px rgba(110, 193, 228, 0.25)
            `,
        }}
      >
        Improving JB
      </span>
    </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Tab label="Home" value="home" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab label="Systems" value="systems" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab label="About Me" value="about" activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* <Tab label="Chat" value="chat" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab label="Momentum" value="momentum" activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        </div>
      </nav>

        
      {/* CONTENT */}
      <main>
        {renderTab()}

        {/* CHATBOT FLOATING BUTTON */}
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
          }}
        >
          {/* TOGGLE BUTTON */}
          {!chatOpen && (
          <button
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#646464ff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              border: "2px solid rgba(255,255,255,0.25)",
            }}
          >
            <img
              src="/images/chat.png"
              alt="Chat"
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          </button>
          )}

          {/* CHAT PANEL */}

          {chatOpen && (
            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "420px",              
                height: chatMinimized ? "60px" : "85vh",
                maxHeight: chatMinimized ? "60px" : "720px",
                background: "#ffffff",
                borderRadius: "18px",
                border: "2px solid #2b2b2b", // dark outline
                boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
                overflow: "hidden",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  height: "60px",
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e5e7eb",
                  background: "#f9fafb",
                }}
              >
                {/* LEFT: TITLE */}
                <span style={{ fontWeight: "600" }}>Bands</span>

                {/* RIGHT: CONTROLS */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* NEW CHAT (placeholder) */}
                  <button
                    title="New chat"
                    style={{
                      width: "30px",
                      height: "26px",
                      borderRadius: "6px",
                      border: "1.8px solid #2b2b2b",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "700",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </button>

                  {/* MINIMIZE (placeholder) */}
                  <button
                    title={chatMinimized ? "Expand" : "Minimize"}
                    onClick={() => setChatMinimized(!chatMinimized)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "700",
                      transform: chatMinimized ? "scaleX(1.8) rotate(180deg)" : "scaleX(1.8)",
                      lineHeight: 1,
                    }}
                  >
                    v
                  </button>



                  {/* CLOSE */}
                  <button
                    onClick={() => {
                      setChatOpen(false);
                      setChatMinimized(false);
                    }}
                    aria-label="Close chat"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "26px",   // bigger
                      fontWeight: "700",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* CHAT BODY */}
              {!chatMinimized && (
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <Chat />
                </div>
              )}

            </div>
          )}


        </div>

      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#e8e9e9ff",
          borderTop: "1px solid #646464ff",
          padding: "48px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Intentionally left blank */}
        </div>
      </footer>
    </div>
  );
}

function Tab({ label, value, activeTab, setActiveTab }) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",

        fontSize: "1.2rem",          
        fontWeight: isActive ? "700" : "500",
        letterSpacing: "0.4px",

        opacity: isActive ? 1 : 0.75,
        color: "#111",

        padding: "8px 4px",          
        borderBottom: isActive
          ? "3px solid black"
          : "3px solid transparent",

        transition: "opacity 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

export default App;
