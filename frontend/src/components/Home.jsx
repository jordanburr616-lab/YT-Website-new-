function Home({ setActiveTab, setActiveSystem }) {

  const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 24px",
  
  };

  const youtubeVideos = [

  {
    id: "zDd8vLlyhRo",
    title: "How To Unf*ck Your Life in 30 Days",
  },
  {
    id: "cX26koGRujA",
    title: "Why You Can’t Get a Girlfriend... Yet",
  },
  {
    id: "yIpBMFLH07I",
    title: "Waking Up Early Is Easy Once You Understand This",
  },
  {
    id: "O1VHA9tMiJQ",
    title: "Why making friends feels impossible (what actually works)"
  },
  {
    id: "XWVzAFrYZek",
    title: "Why discipline isn't sticking (even when giving your all)"
  },
  {
    id: "LN0puitH2Ro",
    title: "Confidence seems unattainable (until you understand this)",
  },
  

];

const heroStyles = {
  titleWrap: {
    display: "inline-block",
    position: "relative",
    marginBottom: "32px",
  },
  lineWrap: {
    display: "inline-block",
    marginBottom: "2px", 
  },
  underline: {
    height: "12px",
    width: "102%",
    background: "#2da6da",
    borderRadius: "6px",
    marginTop: "-6px",
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
        <>
      <SocialLinks />
      <ScrollIndicator/>

      
      {/* HERO – FULL WIDTH */}
      <div
        style={{
          background: "#afb1b3ff",
          width: "100%",
          padding: "180px 0 80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* HERO CONTENT */}
        <div
          style={{
            ...containerStyle,
            position: "relative",
            zIndex: 3,
          }}
        >
          <section className="hero-section">

  <div className="hero-text">

    {/* TOP ROW */}
    <div className="hero-top-row">

      <div className="hero-title-text">
        <h1 className="hero-title">IMPROVE</h1>
        <h1 className="hero-title">EVERYDAY</h1>
      </div>

      {/* BIG IMAGE MOVED HERE */}
      <div className="hero-image-wrap">
        <span className="hero-badge">IMPROVE EVERYDAY</span>
        <img
          src="/images/building.png"
          alt="Building progress"
          className="hero-main-image"
        />
      </div>

    </div>

    <p className="hero-subtitle">
      Build Discipline. Stack Wins. Repeat.
    </p>

    <button
      className="hero-cta"
      style={heroStyles.button}
      onClick={() => setActiveTab("systems")}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      Start Improving →
    </button>

  </div>
</section>

        </div>
      </div>

{/*Program Section*/}
<section id="reset">
<div className="program-section">
  <div className="program-container">
    <div className="reset-card">
      
      <div className="reset-content">
        <p className="reset-eyebrow">NEW PRODUCTIVITY SYSTEM</p>
        <h1 className="reset-title">30 Day Reset</h1>

        <p className="reset-description">
          Improving JB's daily nonnegotiables tracker that turns discipline
          into consistency and makes progress <strong>ACTUALLY</strong> achievable.
        </p>

        <button
            className="reset-button"
            onClick={() => {
                setActiveTab("systems");
                setActiveSystem("reset");
              }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            EXPLORE →
          </button>

      </div>

      <div className="reset-image"
      onClick={() => {
                setActiveTab("systems");
                setActiveSystem("reset");
              }}
              >

        <img
          src="/images/bands-refresh-1.png"
          alt="30 Day Reset"
          className="reset-img reset-img-1"
        />
        <img
          src="/images/bands-refresh-2.png"
          alt="30 Day Reset Active"
          className="reset-img reset-img-2"
        />
      </div>


    </div>
  </div>
</div>
</section>






      {/* PROGRAMS PREVIEW */}
      <div
        style={{
          backgroundColor: "#afb1b3ff",
          padding: "40px 0",
        }}
      >
        <section style={{ ...containerStyle }}>
          {/* SECTION HEADER */}
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "inline-block" }}>
              <div className="systems-title-image">
                <img
                  src="/images/systems-title.png"
                  alt="Systems"
                  className="systems-title-img systems-title-img-1"
                />
              </div>

            </div>
          </div>

          {/* PROGRAM GRID */}
          <div className="systems-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "40px",
              marginBottom: "80px",
            }}
          >
            {/* SYSTEM – 30 DAY RESET */}
          <div style={{ textAlign: "center" }}>
            {/* IMAGE CONTAINER */}
            <div className="reset-image systems-size"

              onClick={() => {
                setActiveTab("systems");
                setActiveSystem("reset");
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

            {/* TEXT — STAYS PUT */}
            <h3 style={{ fontWeight: "700" }}>
              30 Day Reset
            </h3>
          </div>



            {/* PROGRAM 2 – COMING SOON */}
            <div style={{ textAlign: "center" }}>
              <div className="reset-image systems-size">
                <img
                  src="/images/bands-workout-1.png"
                  alt="Coming Soon"
                  className="reset-img"
                />
                <img
                  src="/images/bands-workout-2.png"
                  alt="Coming Soon Active"
                  className="reset-img reset-img-2"
                />
              </div>

              <h3 style={{ fontWeight: "700" }}>
                10 Week Workout Plan
              </h3>
              <p style={{ fontWeight: "700" }}>
                coming soon
              </p>
            </div>

          </div>

          {/* VIEW ALL BUTTON */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setActiveTab("systems")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              style={{
                background: "#2da6da",
                color: "white",
                border: "none",
                padding: "16px 40px",
                fontSize: "0.9rem",
                fontWeight: "600",
                letterSpacing: "1px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.2s ease, opacity 0.2s ease",

              }}
            >
              VIEW ALL
            </button>

          </div>
        </section>
      </div>




      {/* YOUTUBE SECTION */}
      <div
        style={{
          backgroundColor: "#afb1b3ff",
          padding: "40px 0",
        }}
      >
        <section style={{ ...containerStyle }}>
          {/* SECTION HEADER */}
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "inline-block" }}>
              <div className="systems-title-image">
                <img
                  src="/images/youtube-title.png"
                  alt="Youtube"
                  className="systems-title-img systems-title-img-1"
                />
              </div>
            </div>
          </div>

          {/* VIDEO GRID */}
          <div className="youtube-grid"
            style={{

              marginBottom: "80px",
            }}
          >
            {youtubeVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: `
                      0 0 18px rgba(45, 166, 218, 0.35),
                      0 0 36px rgba(45, 166, 218, 0.2)
                    `,
                  }}
                >
                  {/* THUMBNAIL */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* PLAY ICON */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.25)",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          background: "#ff0000",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "18px solid white",
                            borderTop: "12px solid transparent",
                            borderBottom: "12px solid transparent",
                            marginLeft: "4px",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div style={{ padding: "12px 14px" }}>
                    <h3
                      
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              </a>


            ))}
          </div>

          {/* SUBSCRIBE BUTTON */}
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.youtube.com/@improvingjb?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  position: "relative",
                  background: "linear-gradient(to right, #ff0000 50%, #2da6da 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "right bottom",

                  color: "white",
                  border: "none",
                  padding: "16px 48px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  borderRadius: "8px",
                  cursor: "pointer",

                  transition: "background-position 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = "left bottom";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = "right bottom";
                }}
              >
                SUBSCRIBE
              </button>

            </a>
          </div>
        </section>
      </div>

    </>
  );
}

function SocialLinks() {
  return ( 
    <div
      className="social-sidebar"
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        zIndex: 100,
      }}
    >
      {/* YOUTUBE */}
      <a
        href="https://www.youtube.com/@improvingjb/videos"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        <img
          src="/images/youtube-icon.png"
          alt="YouTube"
          style={{
            width: "22px",
            height: "22px",
            objectFit: "contain",
            filter: "brightness(1.5)",
          }}
        />
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://www.instagram.com/improvingjb/?hl=en"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        <img
          src="/images/instagram.png"
          alt="Instagram"
          style={{
            width: "22px",
            height: "22px",
            objectFit: "contain",
            filter: "brightness(1.5)",
          }}
        />
      </a>

      {/* TIKTOK */}
      <a
        href="https://www.tiktok.com/@improvingjb"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        <img
          src="/images/tiktok.png"
          alt="TikTok"
          style={{
            width: "22px",
            height: "22px",
            objectFit: "contain",
            filter: "brightness(1.5)",
          }}
        />
      </a>
    </div>
  );
}


const iconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  opacity: 0.85,
  transition: "opacity 0.2s ease, transform 0.2s ease",
};

function ScrollIndicator() {
  return (
    <div className="scroll-indicator"
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        opacity: 0.65,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* TEXT */}
      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "2px",
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#000000ff",
        }}
      >
        SCROLL
      </span>

      {/* ARROW */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "8px solid #000000ff",
        }}
      />
    </div>
  );
}

export default Home;

