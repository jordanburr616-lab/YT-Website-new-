import { useNavigate } from "react-router-dom";
import { usePageView } from "../../hooks/usePageView";
import { trackEvent } from "../../utils/analytics";

function Systems() {
  const navigate = useNavigate();

  usePageView("systems");

  const systems = [
    {
      title: "The Routine",
      description: "Build your day in under 2 minutes.",
      problem: "I need structure for my day.",
      cta: "Build My Day",
      systemKey: "routine",
      image1: "/images/bands-clock-1.png",
      image2: "/images/bands-clock-2.png",
      route: "/systems/routine",
      tag: "DAILY SYSTEM",
    },
    {
      title: "30 Day Reset",
      description: "Rebuild your habits, discipline, and momentum.",
      problem: "I've fallen off and need a reset.",
      cta: "Start The Reset",
      systemKey: "30-day-reset",
      image1: "/images/bands-refresh-1.png",
      image2: "/images/bands-refresh-2.png",
      route: "/systems/reset",
      tag: "30 DAY SYSTEM",
    },
    {
      title: "The 10 Week Build",
      description: "Create a structured training plan around your goals.",
      problem: "I need structure for my training.",
      cta: "Build My Program",
      systemKey: "build-phase",
      image1: "/images/bands-workout-1.png",
      image2: "/images/bands-workout-2.png",
      route: "/systems/build",
      tag: "TRAINING SYSTEM",
    },
  ];

  const handleSystemClick = (system, source) => {
    trackEvent("system_card_clicked", {
      page: window.location.pathname,
      metadata: {
        system_title: system.title,
        system_key: system.systemKey,
        source,
      },
    });

    navigate(system.route);
  };

  return (
    <>
      {/* HERO */}
      <section className="systems-page-hero">
        <div className="systems-page-container">
          <div className="systems-hero-content">
            <div className="systems-hero-title-wrap">
              <img
                className="systems-hero-title"
                src="/images/productivity-systems-title.png"
                alt="Productivity Systems"
              />
            </div>

            <p className="systems-page-subtitle">
              Free tools and structured programs designed to turn intention into
              consistent action.
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM CARDS */}
      <section className="systems-page-main">
        <div className="systems-page-container">

          <div className="systems-page-grid">
            {systems.map((system) => (
              <article
                key={system.systemKey}
                className="systems-page-card"
              >
                <div className="systems-card-image reset-image" onClick={() => handleSystemClick(system, "image")}>
                  <img
                    src={system.image1}
                    alt={system.title}
                    className="reset-img"
                  />

                  <img
                    src={system.image2}
                    alt={`${system.title} Active`}
                    className="reset-img reset-img-2"
                  />

                  <span className="systems-card-tag">{system.tag}</span>
                </div>

                <div className="systems-card-content">
                  <h3>{system.title}</h3>

                  <p>{system.description}</p>

                  <button
                    type="button"
                    className="systems-card-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSystemClick(system, "button");
                    }}
                  >
                    {system.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Systems;