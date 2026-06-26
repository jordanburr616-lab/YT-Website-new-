import { NavLink, useNavigate } from "react-router-dom";

function MobileMenu({
  isMobile,
  menuOpen,
  setMenuOpen,
}) {
  const navigate = useNavigate();

  if (!isMobile) return null;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Systems", path: "/systems" },
    { label: "About Me", path: "/about" },
    { label: "Community", path: "/community" },
  ];

  return (
    <>
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <div className="mobile-menu-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "mobile-menu-link active"
                  : "mobile-menu-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="mobile-menu-newsletter">
          <p>Get future systems and updates.</p>

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);

              setTimeout(() => {
                document
                  .querySelector(".footer-newsletter")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Join →
          </button>

          <img src="/images/pointing.png" alt="Bands pointing" />
        </div>
      </div>
    </>
  );
}

export default MobileMenu;