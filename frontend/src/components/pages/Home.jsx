import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageView } from "../../hooks/usePageView";
import { trackEvent } from "../../utils/analytics";

function Home() {
  const navigate = useNavigate();

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const goToProgram = (systemKey) => {
    if (systemKey === "build-phase") {
      navigate("/systems/build");
      return;
    }

    if (systemKey === "30-day-reset") {
      navigate("/systems/reset");
      return;
    }

    navigate("/systems");
  };

  const youtubeVideos = [

  {
    id: "wjeYESP8Uew",
    title: "the 7 stages of weight loss",
  },
  {
    id: "ZHRfDUs0QuM",
    title: "the 7 levels of a glow up",
  },
  {
    id: "bZ_UqzFKKNI",
    title: "the no fap timeline (what actually happens)",
  },
  {
    id: "7cdjkpQghl0",
    title: "how to get addicted to NOT using your phone",
  },
  {
    id: "XqFfUQ4zMS0",
    title: "the 7 levels of nicotine addiction"
  },
  {
    id: "TBAsxOtjPCU",
    title: "the uncomfortable truth about your 20s"
  },
  
  
  
  
  

];

const programs = [
  {
    title: "30 Day Reset",
    systemKey: "30-day-reset",
    status: "",
    image1: "/images/bands-refresh-1.png",
    image2: "/images/bands-refresh-2.png",
    active: true,
  },
  {
    title: "The 10 Week Build",
    systemKey: "build-phase",
    status: "",
    image1: "/images/bands-workout-1.png",
    image2: "/images/bands-workout-2.png",
    active: true,
  },
  {
    title: "The Routine",
    systemKey: "routine",
    status: "In Development",
    image1: "/images/bands-clock-1.png",
    image2: "/images/bands-clock-2.png",
    active: false,
  },
];

const [slideDirection, setSlideDirection] = useState("right");
const [slideKey, setSlideKey] = useState(0);

const [programIndex, setProgramIndex] = useState(0);
const [visibleCount, setVisibleCount] = useState(
  window.innerWidth <= 768 ? 1 : 2
);

useEffect(() => {
  const handleResize = () => {
    setVisibleCount(window.innerWidth <= 768 ? 1 : 2);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

usePageView("home");

const visiblePrograms = Array.from({ length: visibleCount }, (_, i) => {
  const index = (programIndex + i) % programs.length;
  return programs[index];
});

const goPrev = () => {
  setSlideDirection("left");
  setSlideKey((prev) => prev + 1);

  setProgramIndex((prev) =>
    (prev - 1 + programs.length) % programs.length
  );
};

const goNext = () => {
  setSlideDirection("right");
  setSlideKey((prev) => prev + 1);

  setProgramIndex((prev) =>
    (prev + 1) % programs.length
  );
};

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

                <div className="hero-title-image-wrap">
                  <img
                    src="/images/home-title.png"
                    alt="Break The Cycle"
                    className="hero-title-image"
                  />
                </div>

                {/* BIG IMAGE MOVED HERE */}
                <div className="hero-image-wrap">
                  <span className="hero-badge">BREAK THE CYCLE</span>
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
                onClick={() => {
                  trackEvent("home_cta_clicked", {
                    page: window.location.pathname,
                    metadata: {
                      location: "hero",
                      target: "systems",
                    },
                  });

                  navigate("/systems");
                }}
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
        <p className="reset-eyebrow">NEW PROGRAM</p>

        <h1 className="reset-title">
          The 10 Week Build
        </h1>

        <p className="reset-description">
          A personalized 10-week training system designed to help users build strength, improve consistency, and work toward new personal records through structured progression.
        </p>

        <button
          className="reset-button"
          onClick={() => {
            trackEvent("home_cta_clicked", {
              page: window.location.pathname,
              metadata: {
                location: "featured_build_section",
                target: "build-phase",
              },
            });

            navigate("/systems/build");
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          START THE BUILD →
        </button>
      </div>

      <div
        className="reset-image"
        onClick={() => {
          trackEvent("home_program_clicked", {
            page: window.location.pathname,
            metadata: {
              program_title: "The 10 Week Build",
              program_key: "build-phase",
              location: "featured_build_image",
              active: true,
            },
          });

          navigate("/systems/build");
        }}
      >

        <img
          src="/images/bands-workout-1.png"
          alt="The 10 Week Build"
          className="reset-img reset-img-1"
        />

        <img
          src="/images/bands-workout-2.png"
          alt="The 10 Week Build Active"
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

          <div className="program-carousel">
            <button
              className="program-arrow"
              onClick={goPrev}
            >
              <span>‹</span>
            </button>

            <div key={slideKey} className={`program-carousel-track slide-${slideDirection}`}>
              {visiblePrograms.map((program) => (
                <div className="program-card" key={program.title}>
                  <div
                    className="reset-image systems-size"
                    onClick={() => {
                      trackEvent("home_program_clicked", {
                        page: window.location.pathname,
                        metadata: {
                          program_title: program.title,
                          program_key: program.systemKey,
                          active: program.active,
                        },
                      });

                      if (!program.active) return;

                      goToProgram(program.systemKey);
                    }}

                    style={{
                      opacity: program.active ? 1 : 0.75,
                      cursor: program.active ? "pointer" : "default",
                    }}
                  >
                    <img
                      src={program.image1}
                      alt={program.title}
                      className="reset-img"
                    />

                    <img
                      src={program.image2}
                      alt={`${program.title} Active`}
                      className="reset-img reset-img-2"
                    />
                  </div>

                  <h3>{program.title}</h3>
                </div>
              ))}
            </div>

            <button
              className="program-arrow"
              onClick={goNext}
            >
              <span>›</span>
            </button>
          </div>

          {/* VIEW ALL BUTTON */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                trackEvent("home_cta_clicked", {
                  page: window.location.pathname,
                  metadata: {
                    location: "systems_preview",
                    target: "systems",
                  },
                });

                navigate("/systems");
              }}
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
            {youtubeVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
                onClick={() =>
                  trackEvent("video_clicked", {
                    page: window.location.pathname,
                    metadata: {
                      video_title: video.title,
                      position: index + 1,
                      section: "youtube_grid",
                    },
                  })
                }
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
              onClick={() =>
                trackEvent("youtube_subscribe_clicked", {
                  page: window.location.pathname,
                  metadata: {
                    location: "youtube_section",
                  },
                })
              }
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
        onClick={() =>
          trackEvent("social_link_clicked", {
            page: window.location.pathname,
            metadata: {
              platform: "youtube",
              location: "floating_sidebar",
            },
          })
        }
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
        onClick={() =>
          trackEvent("social_link_clicked", {
            page: window.location.pathname,
            metadata: {
              platform: "instagram",
              location: "floating_sidebar",
            },
          })
        }
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
        onClick={() =>
          trackEvent("social_link_clicked", {
            page: window.location.pathname,
            metadata: {
              platform: "tiktok",
              location: "floating_sidebar",
            },
          })
        }
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

