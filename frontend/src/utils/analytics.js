const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const ANALYTICS_ENABLED =
  window.location.hostname !== "localhost";

function getSessionId() {
  let sessionId = localStorage.getItem("jb_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("jb_session_id", sessionId);
  }

  return sessionId;
}

export async function trackEvent(event_name, page, metadata = {}) {
  if (!ANALYTICS_ENABLED) {
    console.log("[Analytics Disabled]", event_name, page, metadata);
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/api/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name,
        page,
        metadata,
        session_id: getSessionId(),
      }),
    });
  } catch (err) {
    console.error("Analytics tracking failed:", err);
  }
}