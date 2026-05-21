import { usePageView } from "../../hooks/usePageView";

function Community() {

  usePageView("community");

  return (
    <div
      className="page-content"
      style={{
        background: "#afb1b3ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        flex: '1',
      }}
    >
      {/* FEEDBACK CTA */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe_aSVEgy0P2xGBYJBnK_ONROAqKFjkx6V5i7dzeE8efgPN4A/viewform?usp=publish-editor"
          target="_blank"
          rel="noreferrer"
        >
          <button
            style={{
              background: "#2da6da",          // same blue as other tabs
              color: "white",
              border: "none",
              padding: "24px 44px",
              borderRadius: "8px",
              fontSize: "1.3rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              marginTop: "40px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            PROVIDE FEEDBACK
          </button>
        </a>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/images/community-coming-soon.png"
          alt="Community coming soon"
          style={{
            width: "100%",
            maxWidth: "1100px",
            borderRadius: "24px",
          }}
        />
      </div>
    </div>
  );
}



export default Community;
