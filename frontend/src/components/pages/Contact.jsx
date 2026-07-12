import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  return (
    <main className="simple-page">
      <section className="simple-page-container">
        <button
          className="article-back-button"
          onClick={() => navigate("/")}
          style={{ marginBottom: "36px" }}
        >
          ← Back
        </button>

        <h1>Contact</h1>

        <p>
          Got a question, feedback, a collaboration idea, or a business inquiry?
          Well I'd love to hear from you!
        </p>

        <p>
          The best way to reach me is by email. I read every message (response time will vary based on my schedule, but I will get back to you eventually!).
        </p>

        <div className="simple-page-links">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe_aSVEgy0P2xGBYJBnK_ONROAqKFjkx6V5i7dzeE8efgPN4A/viewform?usp=publish-editor"
            target="_blank"
            rel="noreferrer"
          >
            Email JB →
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contact;