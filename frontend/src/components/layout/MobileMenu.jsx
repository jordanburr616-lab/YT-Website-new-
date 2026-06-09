function MobileMenu({
    isMobile,
    menuOpen,
    setMenuOpen,
    setActiveTab,
    setActiveSystem,
  }) {
  if (!isMobile) return null;

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Systems", value: "systems" },
    { label: "About Me", value: "about" },
    { label: "Community", value: "community" },
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
            <div
              key={item.value}
              className="mobile-menu-link"
              onClick={() => {
                if (item.value === "systems") {
                  setActiveSystem(null);
                }

                setActiveTab(item.value);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="mobile-menu-newsletter">
          <p>Get future systems and updates.</p>

          <button
            onClick={() => {
              setActiveTab("home");
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