import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ isMobile, setMenuOpen }) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 32px",
        backgroundColor: "#e8e9e9ff",
        borderBottom: "1px solid #646464ff",
      }}
    >
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        <img
          src="/images/youtube-logo.png"
          alt="YouTube logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            fontFamily: "'Poppins', system-ui, sans-serif",
            color: "#fafafaff",
            WebkitTextStroke: "1px black",
            letterSpacing: "0.8px",
            textShadow: `
              0 0 6px rgba(110, 193, 228, 0.6),
              0 0 12px rgba(110, 193, 228, 0.4),
              0 0 18px rgba(110, 193, 228, 0.25)
            `,
          }}
        >
          Improving JB
        </span>
      </div>

      {!isMobile && (
        <div style={{ display: "flex", gap: "16px" }}>
          <NavLink to="/" end className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
            }>
            Home
          </NavLink>

          <NavLink to="/systems" className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
            }>
            Systems
          </NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
            }>
            About Me
          </NavLink>

          <NavLink to="/community" className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
            }>
            Community
          </NavLink>
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#111",
          }}
        >
          ☰
        </button>
      )}
    </nav>
  );
}

export default Navbar;