import { useNavigate } from "react-router-dom";
import { usePageView } from "../../hooks/usePageView";
import { trackEvent } from "../../utils/analytics";
import { HiOutlineDocumentText } from "react-icons/hi2";

function Articles() {
  const navigate = useNavigate();

  usePageView("articles");

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const articles = [
    {
      title: "How to Get Out of a Rut",
      slug: "how-to-get-out-of-a-rut",
      category: "Mindset",
      description:
        "7 practical shifts to rebuild momentum and escape the cycle of feeling stuck.",
      image: "/images/video17.png",
      live: true,
    },
    {
        title: "Why You Care So Much What People Think",
        slug: "why-you-care-so-much",
        category: "Mindset",
        description:
        "Understand why other people's opinions control you and the realizations that help you break free.",
        image: "/images/video16.png",
        live: true,
    },
    {
        title: "The 7 Stages of Weight Loss",
        slug: "the-7-stages-of-weight-loss",
        category: "Fitness",
        description:
          "Understand the seven stages nearly everyone experiences during a weight loss journey and how to keep moving forward.",
        image: "/images/video15.png",
        live: true,
    },
    {
      title: "The 7 Levels of a Glow Up",
      slug: "the-7-levels-of-a-glow-up",
      category: "Self-Improvement",
      description:
        "A seven-level breakdown of how real transformation develops—from basic appearance changes to building a stronger identity.",
      image: "/images/video14.png",
      live: true,
    },
    {
      title: "The No Fap Timeline",
      slug: "the-no-fap-timeline",
      category: "Self-Control",
      description:
        "A realistic breakdown of what can happen when you quit porn and stop relying on constant sexual stimulation.",
      image: "/images/video13.png",
      live: true,
    },
    ];

  return (
    <>
      {/* HERO */}
      <div
        style={{
          background: "#afb1b3ff",
          width: "100%",
          padding: "70px 0 24px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <section style={containerStyle}>
          <div className="title-size">
            <img
              src="/images/articles-title.png"
              alt="Articles"
            />
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.7,
              marginBottom: "48px",
              maxWidth: "560px",
              color: "#000",
              fontWeight: "600",
            }}
          >
            Deeper breakdowns of the ideas behind Improving JB videos, systems, and lessons.
          </p>
        </section>
      </div>

      {/* ARTICLES SECTION */}
      <div
        className="articles-section"
        style={{
          background: "#35a4cf",
          padding: "120px 0",
        }}
      >
        <section style={containerStyle}>
          <div className="articles-grid">
            {articles.map((article, i) => (
              <div key={article.slug} className="article-grid-item">
                <div
                  className="article-card"

                  
                  onClick={() => {
                    trackEvent("article_card_clicked", {
                      page: window.location.pathname,
                      metadata: {
                        article_title: article.title,
                        article_slug: article.slug,
                        live: article.live,
                      },
                    });

                    if (!article.live) return;

                    navigate(`/articles/${article.slug}`);
                  }}
                  style={{
                    opacity: article.live ? 1 : 0.85,
                    cursor: article.live ? "pointer" : "default",
                  }}
                >

                  <div className="article-type-icon">
                    <HiOutlineDocumentText />
                  </div>
                  <img
                    src={article.image}
                    alt={article.title}
                  />
                </div>

                <h3 className="article-card-title">
                  {article.title}
                </h3>

                {!article.live && (
                  <p className="article-card-status">
                    Coming Soon
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

export default Articles;
