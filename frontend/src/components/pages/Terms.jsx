import { useNavigate } from "react-router-dom";

function Terms() {

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
        
        <h1>Terms of Use</h1>

        <p>
          By using Improving JB, you agree to use the website, articles, systems,
          and resources for personal informational purposes.
        </p>

        <p>
          The content on this website is based on personal development, fitness,
          discipline, mindset, and self-improvement ideas. It is not professional
          medical, financial, legal, or mental health advice.
        </p>

        <p>
          Systems and articles are designed to provide structure and guidance,
          but results are not guaranteed.
        </p>

        <p>
          Users are responsible for their own actions, decisions, health,
          safety, and outcomes.
        </p>

        <p>
          Improving JB may update or remove website content at any time.
        </p>
      </section>
    </main>
  );
}

export default Terms;