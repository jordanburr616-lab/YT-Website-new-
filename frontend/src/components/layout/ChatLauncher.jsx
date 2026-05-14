import Chat from "../Chat";

function ChatLauncher({
  chatOpen,
  setChatOpen,
  chatMinimized,
  setChatMinimized,
  chatHovered,
  setChatHovered,
  chatSessionId,
  setChatSessionId,
}) {
  return (
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
  );
}

export default ChatLauncher;