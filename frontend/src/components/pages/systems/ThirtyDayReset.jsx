import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { trackEvent } from "../../../utils/analytics";
import { usePageView } from "../../../hooks/usePageView";

function ThirtyDayReset() {
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageView("thirty_day_reset");

  const handleBack = () => {
    navigate("/systems");
  };

  async function handleSignupSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    setSignupStatus("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "thirty_day_reset",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "thirty_day_reset",
          form: "system_newsletter",
        },
      });

      setSignupStatus("You're in. Future Reset updates will be sent to you.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setSignupStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResetClick = () => {
    trackEvent("program_download_click", {
      page: window.location.pathname,
      metadata: {
        program: "30_day_reset",
        destination: "gumroad",
        cta_text: "GET THE FREE RESET",
      },
    });
  };

  return (
    <main className="page-shell reset-page">
      <div className="reset-page-container">
        <button
          type="button"
          className="reset-page-back"
          onClick={handleBack}
        >
          ← Back to Systems
        </button>

        <section className="reset-page-hero">
          <p className="reset-page-eyebrow">Free Notion System</p>

          <h1 className="reset-page-title">
            The 30 Day Reset
          </h1>

          <p className="reset-page-subtitle">
            Rebuild your habits, restore structure, and regain momentum without
            relying on motivation or expecting every day to be perfect.
          </p>

          <div className="reset-page-actions">
            <a
              className="reset-page-primary-button"
              href="https://jordanburr.gumroad.com/l/xirdsb"
              target="_blank"
              rel="noreferrer"
              onClick={handleResetClick}
            >
              Get the Free Reset →
            </a>

            <a
              className="reset-page-secondary-button"
              href="#how-it-works"
            >
              See How It Works
            </a>
          </div>
        </section>

        <section className="reset-page-preview">
          <div className="reset-page-preview-image">
            <img
              src="/images/30 day img 1.png"
              alt="The 30 Day Reset dashboard"
            />
          </div>

          <div className="reset-page-preview-image">
            <img
              src="/images/30 day img 2.png"
              alt="The 30 Day Reset daily tracker"
            />
          </div>
        </section>

        <section
          id="how-it-works"
          className="reset-page-content-card"
        >
          <div className="reset-page-section-heading">
            <p className="reset-page-section-eyebrow">
              Built for real life
            </p>

            <h2>A reset that does not collapse after one bad day</h2>

            <p>
              Most challenges only work while everything is going perfectly.
              The 30 Day Reset was built around the opposite assumption:
              eventually, you will have an incomplete day.
            </p>
          </div>

          <div className="reset-page-feature-grid">
            <article className="reset-page-feature">
              <span>01</span>

              <h3>Define your rules</h3>

              <p>
                Choose the habits and daily non-negotiables that actually matter
                to your life instead of following somebody else's checklist.
              </p>
            </article>

            <article className="reset-page-feature">
              <span>02</span>

              <h3>Track every day</h3>

              <p>
                Use a clear complete or incomplete system so you always know
                whether you followed through.
              </p>
            </article>

            <article className="reset-page-feature">
              <span>03</span>

              <h3>Recover quickly</h3>

              <p>
                Built-in fallbacks help you respond to an incomplete day
                instead of allowing one mistake to become a lost week.
              </p>
            </article>
          </div>
        </section>

        <section className="reset-page-included">
          <div className="reset-page-included-copy">
            <p className="reset-page-section-eyebrow">
              Included for free
            </p>

            <h2>Everything needed to begin rebuilding consistency</h2>

            <p>
              The free system gives you enough structure to start immediately
              without burying you under complicated features.
            </p>
          </div>

          <div className="reset-page-checklist">
            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Custom daily tasks and non-negotiables</p>
            </div>

            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Complete and incomplete day tracking</p>
            </div>

            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Weekly reset checkpoints</p>
            </div>

            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Once-a-week flexibility passes</p>
            </div>

            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Fallback rules after an incomplete day</p>
            </div>

            <div className="reset-page-checklist-item">
              <span>✓</span>
              <p>Structured 30-day progress counter</p>
            </div>
          </div>
        </section>

        <section className="reset-upgrade-card">
          <div className="reset-upgrade-content">
            <div className="reset-upgrade-badge">
              Next Level — In Development
            </div>

            <p className="reset-page-section-eyebrow">
              The Next Level
            </p>

            <h2 className="reset-upgrade-title">
              The 75 Day Reset
            </h2>

            <h3 className="reset-upgrade-subtitle">
              Turn discipline into a progression system
            </h3>

            <p>
              The upcoming 75 Day Reset will expand the original system with
              levels, XP, achievements, recovery missions, difficulty phases,
              advanced statistics, and milestone challenges.
            </p>

            <div className="reset-upgrade-tags">
              <span>XP Progression</span>
              <span>Achievements</span>
              <span>Recovery Missions</span>
              <span>Boss Challenges</span>
              <span>Advanced Stats</span>
            </div>
          </div>

          <div className="reset-upgrade-level-card">
            <div className="reset-upgrade-level-header">
              <span>Current Level</span>
              <strong>Level 7</strong>
            </div>

            <div className="reset-upgrade-progress">
              <div className="reset-upgrade-progress-fill" />
            </div>

            <div className="reset-upgrade-level-stats">
              <div>
                <span>XP</span>
                <strong>680 / 1,000</strong>
              </div>

              <div>
                <span>Streak</span>
                <strong>12 Days</strong>
              </div>

              <div>
                <span>Rank</span>
                <strong>A</strong>
              </div>
            </div>

            <p>Preview concept — final features may change.</p>
          </div>
        </section>

        <section className="reset-page-final-cta">
          <p className="reset-page-section-eyebrow">
            Start with the foundation
          </p>

          <h2>Your first level starts today</h2>

          <p>
            Use the free 30 Day Reset to prove you can rebuild consistency.
            The advanced system can come later.
          </p>

          <a
            className="reset-page-primary-button"
            href="https://jordanburr.gumroad.com/l/xirdsb"
            target="_blank"
            rel="noreferrer"
            onClick={handleResetClick}
          >
            Get the Free Reset →
          </a>
        </section>

        <section className="reset-page-newsletter">
          <p className="reset-page-section-eyebrow">
            Reset Updates
          </p>

          <h2>Be there when the next level unlocks</h2>

          <p>
            Join the list for new systems, product updates, and the future
            release of the 75 Day Reset.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSignupSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join"}
            </button>
          </form>

          {signupStatus && (
            <p className="reset-page-newsletter-status">
              {signupStatus}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default ThirtyDayReset;
