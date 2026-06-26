import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../../utils/analytics";
import { usePageView } from "../../../hooks/usePageView";

function ThirtyDayReset() {

  const navigate = useNavigate();

  usePageView("thirty_day_reset");

  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "120px 24px",
  };

  const handleBack = () => {
    navigate("/systems");
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
    <div className="page-shell" style={{ background: "#afb1b3ff", minHeight: "100vh" }}>
      <section style={containerStyle}>
        {/* BACK LINK */}
        <div
        style={{
            marginBottom: "24px",
            zIndex: "5",
            position: "relative",
            marginTop: "40px"
        }}
        >

          
        <button
            onClick={handleBack}
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
        <div className="title-size">
            <img
              src="/images/30-day-title.png"
              alt="Systems"
            
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
           Built with fail-safes that let you recover from incomplete days instead of spiraling.
        </p>

        {/* PAID VERSION CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "6px",           // 🔥 controls closeness
            marginBottom: "40px",
          }}
        >
          <a
            href="https://jordanburr.gumroad.com/l/xirdsb"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            onClick={() => {
              trackEvent("program_download_click", "thirty_day_reset", {
                program: "30_day_reset",
                destination: "gumroad",
                cta_text: "GET THE RESET",
              });
            }}
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
              GET THE RESET →
            </button>
          </a>
        </div>


        {/* VIDEO PLACEHOLDER */}
        <img
          src="/images/30 day img 1.png"
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
            marginBottom: "20px",
          }}
        />

        <img
          src="/images/30 day img 2.png"
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        />




        {/* WHAT THIS IS */}
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "16px" }}>
          Why this works
        </h2>

        <div style={{ maxWidth: "640px", marginBottom: "40px" }}>
          <p style={{ lineHeight: "1.7", marginBottom: "16px" }}>
            The 30 Day Reset works because you define the rules.
          </p>

          <p style={{ lineHeight: "1.7", marginBottom: "16px" }}>
            Instead of forcing strict guidelines, the system adapts to your real life,
            giving you the freedom to set your own non-negotiables, follow through even 
            on rough days, and recover quickly when things don’t work out.
          </p>

          <p style={{ lineHeight: "1.7" }}>
            This structure has been refined through my own personal use to prioritize
            sustainability over intensity, making it possible to stay consistent
            without burnout.
          </p>
        </div>


        {/* WHAT YOU GET */}
        <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "16px" }}>
          What you get
        </h2>

        <ul style={{ lineHeight: "1.8", marginBottom: "48px" }}>
          <li>Daily tasks checklist</li>
          <li>Weekly reset checkpoints</li>
          <li>"Once a week" freebies</li>
          <li>Fall back system when previous day is incomplete</li>
          <li>Structured day counter with complete/incomplete buttons</li>
        </ul>

        
      </section>
    </div>
  );
}

export default ThirtyDayReset;
