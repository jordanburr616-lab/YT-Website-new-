import { useNavigate } from "react-router-dom";

function Privacy() {

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
        
        <h1>Privacy Policy</h1>

        <p>
          Improving JB collects basic information when users interact with the
          website, such as newsletter signups, page visits, and website
          activity.
        </p>

        <p>
          Email addresses submitted through the website are used to send updates
          about new systems, videos, articles, and website releases.
        </p>

        <p>
          Analytics may be used to understand which pages, systems, and articles
          people visit so the website can be improved over time.
        </p>

        <p>
          Improving JB does not sell personal information.
        </p>

        <p>
          If you want your email removed from the newsletter list, contact JB
          through the contact page.
        </p>
      </section>
    </main>
  );
}

export default Privacy;