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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatSessionId, setChatSessionId] = useState(0);
  const [saveChatSignal, setSaveChatSignal] = useState(0);
  const [savedChats, setSavedChats] = useState([]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
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
          position: "fixed",
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
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
          fontFamily: "'Poppins', system-ui, sans-serif",
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

    {!isMobile && (
      <div style={{ display: "flex", gap: "16px" }}>
        <Tab label="Home" value="home" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab label="Systems" value="systems" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab label="About Me" value="about" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab label="Community" value="community" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    )}

    {isMobile && (
      <button
        onClick={() => setMenuOpen(true)}
        style={{
          background: "none",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          color: "#111",
        }}
      >
        ☰
      </button>
    )}
      </nav>

      {/* TABS */}
        {isMobile && (
          <div
            style={{
              position: "fixed",
              top: "0",
              right: "0",
              height: "100vh",
              width: "220px",
              background: "#ffffff",
              boxShadow: "-12px 0 32px rgba(0,0,0,0.25)",
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(.2,.8,.2,1)",
              zIndex: 2000,
              paddingTop: "96px",
            }}
          >

            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "none",
                border: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#111",
              }}
            >
              ✕
            </button>

            {[
              { label: "Home", value: "home" },
              { label: "Systems", value: "systems" },
              { label: "About Me", value: "about" },
              { label: "Community", value: "community" },
            ].map((item, index, arr) => (
              <div
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value);
                  setMenuOpen(false);
                }}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  padding: "18px 24px",
                  borderBottom:
                    index !== arr.length - 1 ? "1px solid #111" : "none",
                  cursor: "pointer",
                  color: "#111",
                }}
              >
                {item.label}
              </div>
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
                setChatMinimized(false);
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
            <div className={`chat-container ${chatMinimized ? "minimized" : ""}`}
              style={{
                position: "fixed",
                bottom: "24px",
                // right: "24px",
                // width: "420px",              
                // height: chatMinimized ? "60px" : "85vh",
                // maxHeight: chatMinimized ? "60px" : "720px",
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
                <span style={{ fontWeight: "600" }}>Ask Bands</span>

                {/* RIGHT: CONTROLS */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* NEW CHAT (placeholder) */}
                  <button
                    title="New chat"
                    onClick={() => {
                      console.log("NEW CHAT");
                      setChatSessionId((id) => id + 1);
                    }}
                    style={{
                      width: "30px",
                      height: "26px",
                      borderRadius: "6px",
                      border: "1.8px solid #2b2b2b",
                      background: "none",
                      cursor: "pointer",
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
                    onClick={() => setChatMinimized(prev => !prev)}

                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "700",
                      transform: chatMinimized
                        ? "scaleX(1.8) rotate(180deg)"
                        : "scaleX(1.8)",
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
              <div className="chat-content" style={{ flex: 1, overflow: "hidden" }}>
                <Chat key={chatSessionId} />
              </div>


            </div>
          )}


        </div>

      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#e8e9e9ff",
          borderTop: "1px solid #646464ff",
          padding: "72px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div className="footer-newsletter">
            <h3>Get Future Systems & Weekly Updates</h3>

            <p>
              Be the first to know new system releases, video uploads,
              and important updates from Improving JB.
            </p>

            <div className="newsletter-form">
              <input />
              <button>JOIN</button>
            </div>
          </div>
          
          {/* Intentionally left blank */}
          <div className="footer-socials"
          >
            {/* YOUTUBE */}
            <a
              href="https://www.youtube.com/@improvingjb"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/youtube-icon.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>

            <a
              href="https://www.instagram.com/improvingjb/?hl=en"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/instagram.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@improvingjb"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/tiktok.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>
          </div>

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
