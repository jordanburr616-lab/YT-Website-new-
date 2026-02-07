function Community() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#afb1b3ff",
        padding: "32px 24px",
      }}
    >
      {/* FEEDBACK CTA */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          zIndex: 5,
        }}
      >
        <a
          href="https://forms.gle/YOUR_FORM_LINK"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              background: "#111",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "0.8px",
              cursor: "pointer",
            }}
          >
            GIVE FEEDBACK
          </button>
        </a>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/community-coming-soon.png"
          alt="Community coming soon"
          style={{
            width: "100%",
            maxWidth: "1100px",
            height: "auto",
            borderRadius: "24px",
          }}
        />
      </div>
    </div>
  );
}


export default Community;
