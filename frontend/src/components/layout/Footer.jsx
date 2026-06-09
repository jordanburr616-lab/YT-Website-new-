import { useState } from "react";
import { trackEvent } from "../../utils/analytics";

function Footer() {
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  async function handleSignupSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "footer",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", "footer", {
        location: "footer",
        form: "footer_newsletter",
      });

      setSignupStatus("Thank you for signing up!");
      setEmail("");
    } catch (err) {
      setSignupStatus("Something went wrong. Try again.");
      console.error(err);
    }
  }

  return (
    <footer
        style={{
          backgroundColor: "#e8e9e9ff",
          borderTop: "1px solid #646464ff",
          padding: "72px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div className="footer-newsletter">
            <h3>Get Future Systems & Weekly Updates</h3>

            <p>
              Be the first to know when new systems, videos, and updates drop.
            </p>

            <form className="newsletter-form" onSubmit={handleSignupSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Join</button>
            </form>

            {signupStatus && <p>{signupStatus}</p>}
          </div>
          
          {/* Intentionally left blank */}
          <div className="footer-socials"
          >
            {/* YOUTUBE */}
            <a
              href="https://www.youtube.com/@improvingjb"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() =>
                trackEvent("social_link_clicked", {
                  page: window.location.pathname,
                  metadata: {
                    platform: "youtube",
                    location: "footer",
                  },
                })
              }
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/youtube-icon.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>

            <a
              href="https://www.instagram.com/improvingjb/?hl=en"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() =>
                trackEvent("social_link_clicked", {
                  page: window.location.pathname,
                  metadata: {
                    platform: "instagram",
                    location: "footer",
                  },
                })
              }
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/instagram.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@improvingjb"
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() =>
                trackEvent("social_link_clicked", {
                  page: window.location.pathname,
                  metadata: {
                    platform: "tiktok",
                    location: "footer",
                  },
                })
              }
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/tiktok.png"
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",     // 🔑 no stretching
                    opacity: 0.85,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                />
              </div>
            </a>
          </div>

        </div>
      </footer>
  );
}

export default Footer;