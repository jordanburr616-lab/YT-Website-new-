function getSessionId() {
  let sessionId = localStorage.getItem("jb_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "jb_session_id",
      sessionId
    );
  }

  return sessionId;
}

export async function trackEvent(
  event_name,
  page,
  metadata = {}
) {
  try {
    await fetch("http://localhost:8080/api/analytics", {
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