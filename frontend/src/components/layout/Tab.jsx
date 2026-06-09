function Tab({ label, value, activeTab, setActiveTab }) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.opacity = "0.95";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isActive
          ? "scale(1.12)"
          : "translateY(0)";
        e.currentTarget.style.opacity = isActive ? "1" : "0.75";
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.2rem",
        fontWeight: isActive ? "700" : "500",
        letterSpacing: "0.4px",
        color: "#111",
        opacity: isActive ? 1 : 0.75,
        padding: "8px 6px",
        borderBottom: isActive ? "3px solid black" : "3px solid transparent",
        transform: isActive ? "scale(1.12)" : "translateY(0)",
        transition:
          "transform 0.18s ease, opacity 0.15s ease, border-bottom 0.15s ease",
      }}
    >
      {label}
    </button>
  );
}

export default Tab;