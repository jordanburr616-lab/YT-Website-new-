import { useState } from "react";
import { trackEvent } from "../../utils/analytics";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function Footer() {
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  async function handleSignupSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
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
          padding: "16px 0"
        }}
      >

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          
          

          <div className="footer-links">
            <a href="/about">About JB</a>

            <span className="footer-separator">•</span>

            <a href="/contact">Contact</a>

            <span className="footer-separator">•</span>

            <a href="/privacy">Privacy</a>

            <span className="footer-separator">•</span>

            <a href="/terms">Terms</a>
          </div>

        </div>
        
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
                  alt="Instagram"
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
                  alt="Tiktok"
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
        
      </footer>
  );
}

export default Footer;