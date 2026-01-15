function Home() {

  const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 24px",
  
  };

  const youtubeVideos = [

  {
    id: "nSEYiBpRexE",
    title: "Why making friends feels impossible (what actually works)"
  },
  {
    id: "7HQlAXvbhG8",
    title: "Why discipline isn't sticking (even when giving your all)"
  },
  {
    id: "-nJkg6gsJRM",
    title: "Confidence seems unattainable (until you understand this)",
  },
  {
    id: "HYTLAPSd3Wk",
    title: "Why you can't stop scrolling (it's simpler than you think)",
  },
  {
    id: "vEsGoaE5Ffo",
    title: "Why you can't lose weight (even tho you're trying)",
  },
  {
    id: "MDb4z82SGNQ",
    title: "The Next Chapter",
  },

];

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
        <>
      <SocialLinks />
      <ScrollIndicator/>
      {/* HERO – FULL WIDTH */}
      <div
        style={{
          background: "#afb1b3ff",
          width: "100%",
          padding: "180px 0",
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
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "80px",
            }}
          >
            {/* LEFT COLUMN — TEXT */}
            <div style={{ maxWidth: "520px" }}>
              {/* TITLE */}
              <div style={heroStyles.titleWrap}>
                <h1 style={heroStyles.title}>KEEP BUILDING.</h1>
                <div style={heroStyles.underline} />
              </div>

              {/* SUBTITLE */}
              <p style={heroStyles.subtitle}>
                Stack wins every day
              </p>

              {/* CTA */}
              <div style={heroStyles.ctaWrap}>
                <button
                  style={heroStyles.button}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  Productivity Hacks →
                </button>
              </div>
            </div>

            {/* RIGHT — IMAGE */}
            <div
              style={{
                // padding: "24px",               // space between image + glow
                borderRadius: "28px",
                background: "#ffffff",         // clean white base
                boxShadow: `
                  0 0 18px rgba(45, 166, 218, 0.35),
                  0 0 40px rgba(45, 166, 218, 0.25),
                  0 0 80px rgba(45, 166, 218, 0.15)
                `,
              }}
            >
              <img
                src="/images/building.png"
                alt="Building progress"
                style={{
                  width: "900px",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "20px",
                }}
              />
            </div>


          </section>
        </div>
      </div>

      {/* PROGRAM SECTION */}
<div
  style={{
    backgroundColor: "#35a4cf",
    padding: "120px 0",
  }}
>
  <section
    style={{
      ...containerStyle,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "72px 64px",
        width: "100%",
        maxWidth: "1000px",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "64px",
        alignItems: "center",
      }}
    >
      {/* LEFT – TEXT */}
      <div>
        <p
          style={{
            letterSpacing: "2px",
            fontSize: "0.8rem",
            opacity: 0.6,
            marginBottom: "16px",
          }}
        >
          NEW PRODUCTIVITY HACK
        </p>

        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "20px",
            color: "#111",
          }}
        >
          30 Day Reset
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.7",
            opacity: 0.8,
            maxWidth: "520px",
            marginBottom: "40px",
            color: "#111",
          }}
        >
          Improving JB&apos;s schedule planner that makes planning and
          getting your goals done <strong>ACTUALLY achievable</strong>.
        </p>

        <button
          style={{
            background: "#2da6da",
            color: "white",
            border: "none",
            padding: "16px 36px",
            fontSize: "0.9rem",
            fontWeight: "600",
            letterSpacing: "1px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          EXPLORE →
        </button>
      </div>

      {/* RIGHT – VISUAL PLACEHOLDER */}
      <div
        style={{
          background: "#f1f3f5",
          borderRadius: "14px",
          height: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
          fontSize: "0.9rem",
        }}
      >
        PROGRAM PREVIEW
      </div>
    </div>
  </section>
</div>



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
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  marginBottom: "12px",
                  color: "white",
                  WebkitTextStroke: "1px black",
                  textShadow: `
                    0 0 6px rgba(45, 166, 218, 0.6),
                    0 0 12px rgba(45, 166, 218, 0.35),
                    0 0 18px rgba(45, 166, 218, 0.2)
                  `,
                }}
              >
                SYSTEMS
              </h2>

              {/* BLUE UNDERLINE */}
              <div
                style={{
                  height: "10px",
                  width: "105%",
                  background: "#2da6da",
                  borderRadius: "6px",
                  marginTop: "-18px",
                  opacity: 0.85,
                  transform: "rotate(-0.6deg)",
                }}
              />
            </div>
          </div>

          {/* PROGRAM GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "40px",
              marginBottom: "80px",
            }}
          >
            {/* PROGRAM 1 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "#e5e7eb",
                  height: "320px",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  boxShadow: `
                    0 0 18px rgba(45, 166, 218, 0.35),
                    0 0 36px rgba(45, 166, 218, 0.2)
                  `,
                }}
              >
                {/* image goes here */}
              </div>

              <h3 style={{ fontWeight: "700" }}>
                30 Day Reset
              </h3>
            </div>

            {/* PROGRAM 2 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "#e5e7eb",
                  height: "320px",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  opacity: 0.9,
                  boxShadow: `
                    0 0 14px rgba(45, 166, 218, 0.25),
                    0 0 28px rgba(45, 166, 218, 0.15)
                  `,
                }}
              >
                {/* image goes here */}
              </div>

              <h3 style={{ fontWeight: "700" }}>
                More Systems Coming
              </h3>
            </div>
          </div>

          {/* VIEW ALL BUTTON */}
          <div style={{ textAlign: "center" }}>
            <button
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
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  marginBottom: "12px",
                  color: "white",
                  WebkitTextStroke: "1px black",
                  textShadow: `
                    0 0 6px rgba(45, 166, 218, 0.6),
                    0 0 12px rgba(45, 166, 218, 0.35),
                    0 0 18px rgba(45, 166, 218, 0.2)
                  `,
                }}
              >
                YOUTUBE
              </h2>

              {/* BLUE UNDERLINE */}
              <div
                style={{
                  height: "10px",
                  width: "105%",
                  background: "#2da6da",
                  borderRadius: "6px",
                  marginTop: "-18px",
                  opacity: 0.85,
                  transform: "rotate(-0.6deg)",
                }}
              />
            </div>
          </div>

          {/* VIDEO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
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
                      style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "#111",
                        lineHeight: "1.3",
                        // padding: "1px 2px",
                        minHeight: "45px",
                      }}
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
              href="https://www.youtube.com/@improvingjb"
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  background: "#2da6da",
                  color: "white",
                  border: "none",
                  padding: "16px 48px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  borderRadius: "8px",
                  cursor: "pointer",
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
      <a
        href="https://www.youtube.com/@improvingjb/videos"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        YT
    {/* <img **FOR LATER UPGRADES**
        src="/youtube-icon.png"
        alt="YouTube"
        style={{
            width: "18px",
            height: "18px",
            objectFit: "contain",
        }}
    /> */}
      </a>

      <a
        href="https://www.instagram.com/improvingjb/?hl=en"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        IG
      </a>

      <a
        href="https://www.tiktok.com/@animedriven"
        target="_blank"
        rel="noreferrer"
        style={iconStyle}
      >
        TT
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
    <div
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

