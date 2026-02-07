import { useState } from "react";
import ThirtyDayReset from "./systems/ThirtyDayReset";


function Systems() {
  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const [activeSystem, setActiveSystem] = useState(null);


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
    marginTop: "-20px",
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

if (activeSystem === "30-day-reset") {
  return <ThirtyDayReset onBack={() => setActiveSystem(null)} />;
}


  return (
    <>
      {/* HERO */}
      <div
        style={{
          background: "#afb1b3ff",
          width: "100%",
          padding: "130px 0 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <section style={containerStyle}>

          {/* TITLE */}
          <div className="title-size">
            <img
              src="/images/productivity-systems-title.png"
              alt="Systems"
            
            />
          </div>

          {/* SUBTITLE */}
          <p
            style={{
              ...heroStyles.subtitle,
              fontSize: "1.1rem",
              marginBottom: "48px",
              textWrap: 0,
            }}
          >
            Structured systems/programs designed to turn intention into consistent action.
          </p>

        </section>
      </div>

      {/* SYSTEMS SECTION */}
      <div
        style={{
          background: "#35a4cf",
          padding: "120px 0",
        }}
      >
        <section style={{ ...containerStyle }}>
          

          {/* SYSTEMS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "40px",
            }}
          >
            {[
              { title: "30 Day Reset", live: true },
              { title: "Laser Focus", live: false },
              { title: "Daily Execution", live: false },
            ].map((system, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {system.title === "30 Day Reset" ? (
                  /* ================= LIVE SYSTEM ================= */
                  <div className="reset-image systems-size systems-tab-img"

                    onClick={() => {
                      setActiveTab("systems");
                      setActiveSystem("reset");
                    }}
                    style={{
                      background: "#ffffff",
                      height: "320px",
                      borderRadius: "16px",
                      marginBottom: "16px",
                      overflow: "hidden",
                      position: "relative",
                      opacity: 0.75,
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    >
                    <img
                      src="/images/bands-refresh-1.png"
                      alt="Coming Soon"
                      className="reset-img"
                    />
                    <img
                      src="/images/bands-refresh-2.png"
                      alt="Coming Soon Active"
                      className="reset-img reset-img-2"
                    />
                  </div>
                ) : (
                  /* ================= COMING SOON SYSTEM ================= */
                  <div
                    className="reset-image systems-size systems-tab-img"
                    style={{
                      background: "#ffffff",
                      height: "320px",
                      borderRadius: "16px",
                      marginBottom: "16px",
                      overflow: "hidden",
                      position: "relative",
                      opacity: 0.75,
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    <img
                      src="/images/coming-soon-1.png"
                      alt="Coming Soon"
                      className="reset-img"
                    />
                    <img
                      src="/images/coming-soon-2.png"
                      alt="Coming Soon Active"
                      className="reset-img reset-img-2"
                    />
                  </div>
                )}

                <h3 style={{ fontWeight: "700", color: "white" }}>
                  {system.title}
                </h3>

                {!system.live && (
                  <p
                    style={{
                      opacity: 0.8,
                      fontSize: "0.85rem",
                      color: "white",
                    }}
                  >
                    Coming soon
                  </p>
                )}
              </div>
            ))}
          </div>

        </section>
      </div>

    </>
  );
}

export default Systems;
