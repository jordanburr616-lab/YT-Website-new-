import { useState } from "react";
import { useEffect } from "react";


import Home from "./components/Home";
import Systems from "./components/Systems";
import About from "./components/About";
import Community from "./components/Community";
import Chat from "./components/Chat";
import Reset from "./components/systems/ThirtyDayReset";


function App() {
  const [activeSystem, setActiveSystem] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatHovered, setChatHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeTab]);

  const renderTab = () => {
    if (activeTab === "systems") {
      if (activeSystem === "reset") {
        return <Reset onBack={() => setActiveSystem(null)} />;
      }

      return <Systems setActiveSystem={setActiveSystem} />;
    }

    switch (activeTab) {
      case "about":
        return <About />;
      case "community":
        return <Community/>;
      default:
        return <Home setActiveTab={setActiveTab} setActiveSystem={setActiveSystem} />;
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
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "26px",
              cursor: "pointer",
              color: "#111",
            }}
          >
            ☰
          </button>
        ) : (
          <div style={{ display: "flex", gap: "16px" }}>
            <Tab
              label="Home"
              value="home"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tab
              label="Systems"
              value="systems"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tab
              label="About Me"
              value="about"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tab
              label="Community"
              value="community"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

          </div>
        )}

      </nav>

      {isMobile && menuOpen && (
      <div
        style={{
          position: "absolute",
          top: "72px",
          right: "16px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
          padding: "12px 0",
          zIndex: 1000,
          minWidth: "180px",
        }}
      >
        {[
          { label: "Home", value: "home" },
          { label: "Systems", value: "systems" },
          { label: "About Me", value: "about" },
          { label: "Community", value: "community" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => {
              setActiveTab(item.value);
              setMenuOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 18px",
              background: "none",
              border: "none",
              textAlign: "left",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    )}


        
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
          {/* CHAT LAUNCHER */}
          {!chatOpen && (
            <div
              onMouseEnter={() => setChatHovered(true)}
              onMouseLeave={() => setChatHovered(false)}
              onClick={() => {
                setChatHovered(false);
                setChatOpen(true);
              }}

              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "80px",
                height: "80px",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              {/* CIRCLE */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#646464ff",
                  border: chatHovered
                    ? "2px solid #a09e9e"
                    : "2px solid #d1d5db",
                  boxShadow: chatHovered
                    ? "0 16px 36px rgba(0,0,0,0.35)"
                    : "0 8px 24px rgba(0,0,0,0.25)",
                  transform: chatHovered ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(.2,.8,.2,1)",
                  
                }}
              />

              {/* DEFAULT BANDS */}
              <img
                src="/images/chat.png"
                alt="Bands"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: chatHovered ? 0 : 1,
                  transform: "scale(1)",
                  transition: "opacity 0.15s ease",
                  pointerEvents: "none",
                }}
              />

              {/* HOVER BANDS */}
              <img
                src="/images/chat-hover.png"
                alt="Bands hover"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: chatHovered ? 1 : 0,
                  transform: chatHovered
                    ? "scale(1.25) translateY(-6px)"
                    : "scale(1)",
                  transition: "opacity 0.15s ease, transform 0.3s cubic-bezier(.2,1,.2,1)",
                  pointerEvents: "none",
                }}
              />

            </div>
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
                      setChatHovered(false);
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
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.opacity = "0.95";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isActive
          ? "scale(1.12)"
          : "translateY(0)";
        e.currentTarget.style.opacity = isActive ? "1" : "0.75";
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",

        fontSize: "1.2rem",
        fontWeight: isActive ? "700" : "500",
        letterSpacing: "0.4px",

        color: "#111",

        opacity: isActive ? 1 : 0.75,

        padding: "8px 6px",

        borderBottom: isActive
          ? "3px solid black"
          : "3px solid transparent",

        transform: isActive ? "scale(1.12)" : "translateY(0)",

        transition:
          "transform 0.18s ease, opacity 0.15s ease, border-bottom 0.15s ease",
      }}
    >
      {label}
    </button>
  );
}



export default App;
