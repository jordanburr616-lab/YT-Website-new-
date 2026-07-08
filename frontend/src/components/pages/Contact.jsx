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
          Have a question, feedback, or want to reach out about Improving JB?
        </p>

        <p>
          The best way to contact JB right now is through Instagram or YouTube.
        </p>

        <div className="simple-page-links">
          <a
            href="https://www.instagram.com/improvingjb/?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Message on Instagram →
          </a>

          <a
            href="https://www.youtube.com/@improvingjb"
            target="_blank"
            rel="noreferrer"
          >
            Visit YouTube →
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contact;