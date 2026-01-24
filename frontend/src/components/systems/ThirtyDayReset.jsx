function ThirtyDayReset({ onBack }) {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "120px 24px",
  };

  const heroStyles = {
  titleWrap: {
    display: "inline-block",
    position: "relative",
    marginBottom: "32px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    marginBottom: "12px",
    color: "white",
    WebkitTextStroke: "2px black",
    letterSpacing: "0.8px",
    textShadow: `
      0 0 6px rgba(110, 193, 228, 0.6),
      0 0 12px rgba(110, 193, 228, 0.4),
      0 0 18px rgba(110, 193, 228, 0.25)
    `,
    whiteSpace: "nowrap",
  },
  underline: {
    height: "12px",
    width: "102%",
    background: "#2da6da",
    borderRadius: "6px",
    marginTop: "-25px",
    opacity: 0.85,
    transform: "rotate(-0.6deg)",
  },
  subtitle: {
    fontSize: "1.25rem",
    opacity: 0.7,
    marginBottom: "40px",
    maxWidth: "500px",
    color: "#000",
    fontWeight: "600",
  },
  ctaWrap: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  button: {
    background: "#2da6da",
    color: "white",
    border: "none",
    padding: "14px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    transition: "transform 0.2s ease",
  },
};

  return (
    <div style={{ background: "#afb1b3ff", minHeight: "100vh" }}>
      <section style={containerStyle}>
        {/* BACK LINK */}
        <div
        style={{
            marginBottom: "24px",
        }}
        >
        <button
            onClick={onBack}
            style={{
            background: "none",
            border: "none",
            color: "#111",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            }}
        >
            ← Back to Systems
        </button>
        </div>

        {/* TITLE */}
        <div style={heroStyles.titleWrap}>
        <h1
            style={{
            ...heroStyles.title,
            fontSize: "3rem",           // slimmer for detail page
            WebkitTextStroke: "1.5px black",
            }}
        >
            30 Day Reset
        </h1>
        <div
            style={{
            ...heroStyles.underline,
            marginTop: "-16px",         // calmer than Home
            }}
        />
        </div>

        <p
        style={{
            ...heroStyles.subtitle,
            maxWidth: "600px",
            marginBottom: "56px",
        }}
        >
          A simple execution system designed to help you reset your habits,
          rebuild structure, and regain momentum — without relying on motivation.
        </p>

        {/* PAID VERSION CTA */}
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <a
            href="https://www.notion.so/The-30-Day-Reset-2e15f1ba8b5080e4b8c9f28a00774468?source=copy_link"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                background: "#111",
                color: "white",
                border: "none",
                padding: "14px 26px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "700",
                letterSpacing: "0.6px",
                cursor: "pointer",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              GET THE FULL SYSTEM →
            </button>
          </a>
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            opacity: 0.6,
            marginTop: "8px",
          }}
        >
          Free version available below.


        </p>


        {/* VIDEO PLACEHOLDER */}
        <div
        style={{
            background: "#ffffff",
            borderRadius: "16px",
            height: "420px",
            marginBottom: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
            boxShadow: `
            0 0 24px rgba(45, 166, 218, 0.45),
            0 0 48px rgba(45, 166, 218, 0.25)
            `,
        }}
        >
        VIDEO EXPLANATION (COMING SOON)
        </div>


        {/* WHAT THIS IS */}
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "16px" }}>
          What this system is
        </h2>

        <p style={{ maxWidth: "640px", lineHeight: "1.7", marginBottom: "40px" }}>
          The 30 Day Reset is not a motivation challenge. It’s a lightweight
          structure that helps you eliminate decision fatigue, focus on the
          essentials, and rebuild consistency one day at a time.
        </p>

        {/* WHAT YOU GET */}
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "16px" }}>
          What you get
        </h2>

        <ul style={{ lineHeight: "1.8", marginBottom: "48px" }}>
          <li>Daily structure to remove guesswork</li>
          <li>Weekly reset checkpoints</li>
          <li>A clear definition of “enough” each day</li>
          <li>A simple way to rebuild momentum fast</li>
        </ul>

        {/* FREE VERSION */}
        <div
          style={{
            background: "#35a4cf",
            padding: "48px",
            borderRadius: "20px",
            color: "white",
          }}
        >
          <h3 style={{ fontSize: "1.75rem", fontWeight: "800", marginBottom: "16px" }}>
            Start with the free version
          </h3>

          <p style={{ maxWidth: "520px", marginBottom: "24px", opacity: 0.95 }}>
            You can start using the core version of the 30 Day Reset for free.
            No signup. No funnel. Just the structure.
          </p>

          <a
            href="https://www.notion.so/The-30-Day-reset-Free-Version-2d35f1ba8b50805dadadd697450021cd?source=copy_link"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                background: "white",
                color: "#111",
                border: "none",
                padding: "14px 28px",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ACCESS FREE VERSION →
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default ThirtyDayReset;
