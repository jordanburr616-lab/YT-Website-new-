function MobileMenu({ isMobile, menuOpen, setMenuOpen, setActiveTab }) {
  if (!isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        height: "100vh",
        width: "220px",
        background: "#ffffff",
        boxShadow: "-12px 0 32px rgba(0,0,0,0.25)",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(.2,.8,.2,1)",
        zIndex: 2000,
        paddingTop: "96px",
      }}
    >
      <button
        onClick={() => setMenuOpen(false)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          color: "#111",
        }}
      >
        ✕
      </button>

      {[
        { label: "Home", value: "home" },
        { label: "Systems", value: "systems" },
        { label: "About Me", value: "about" },
        { label: "Community", value: "community" },
      ].map((item, index, arr) => (
        <div
          key={item.value}
          onClick={() => {
            setActiveTab(item.value);
            setMenuOpen(false);
          }}
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            padding: "18px 24px",
            borderBottom: index !== arr.length - 1 ? "1px solid #111" : "none",
            cursor: "pointer",
            color: "#111",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default MobileMenu;