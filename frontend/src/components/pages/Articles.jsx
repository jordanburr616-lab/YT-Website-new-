import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageView } from "../../hooks/usePageView";
import { trackEvent } from "../../utils/analytics";
import { HiOutlineDocumentText } from "react-icons/hi2";

function Articles() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

  usePageView("articles");

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const articles = [

    {
      title: "How to Reverse Alcoholism",
      slug: "how-to-reverse-alcoholism",
      category: "Addiction",
      description:
        "A practical guide to reversing alcohol dependence, rebuilding what drinking took from your life, and working your way back to Level 0.",
      image: "/images/video20.png",
      live: true,
    },
    {
      title: "The 5 Hidden Stats That Make You Smarter",
      slug: "the-5-hidden-stats-that-make-you-smarter",
      category: "Learning",
      description:
        "Discover the five hidden skills that determine how fast you learn, think, and solve problems—and how to train each one to become smarter over time.",
      image: "/images/video19.png",
      live: true,
    },
    {
      title: "How to Get Addicted to Building Muscle",
      slug: "how-to-get-addicted-to-building-muscle",
      category: "Fitness",
      description:
        "Six mindset shifts that make building muscle feel addictive by turning every workout into progress you actually want to pursue.",
      image: "/images/video18.png",
      live: true,
    },
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
    {
      title: "How to Get Addicted to Not Using Your Phone",
      slug: "how-to-get-addicted-to-not-using-your-phone",
      category: "Self-Control",
      description:
        "A practical breakdown of how to make your phone less addictive and train yourself to enjoy spending more time away from constant scrolling.",
      image: "/images/video12.png",
      live: true,
    },
    {
      title: "The 7 Levels of Nicotine Addiction",
      slug: "the-7-levels-of-nicotine-addiction",
      category: "Addiction",
      description:
        "A seven-level breakdown of how nicotine addiction develops, gradually takes control, and becomes increasingly difficult to escape.",
      image: "/images/video11.png",
      live: true,
    },
    ];

    const categories = [
      "All",
      ...new Set(articles.map((article) => article.category)),
    ];

    const filteredArticles =
      activeCategory === "All"
        ? articles
        : articles.filter(
            (article) => article.category === activeCategory
          );

  return (
    <>
      {/* HERO */}
      <div
        style={{
          background: "#afb1b3ff",
          width: "100%",
          padding: "42px 0 18px 0",
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
              marginBottom: "26px",
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
          padding: "54px 0 80px",
        }}
      >
        <section style={containerStyle}>
          <div className="articles-filter-section">
            <div className="articles-filter-header">
              <div>
                <p className="articles-filter-label">Browse by topic</p>

                <h2 className="articles-filter-title">
                  Find what you need
                </h2>
              </div>

              <p className="articles-results-count">
                {filteredArticles.length}{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <div className="articles-filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`articles-filter-button ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(category);

                    trackEvent("article_filter_clicked", {
                      page: window.location.pathname,
                      metadata: {
                        category,
                      },
                    });
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="articles-grid">
            {filteredArticles.map((article) => (
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
