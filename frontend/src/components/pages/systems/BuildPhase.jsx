function BuildPhase({ onBack }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#afb1b3ff",
        padding: "120px 24px",
      }}
    >
      <button onClick={onBack}>
        ← Back
      </button>

      <h1>The 10 Week Build</h1>

      <p>Coming soon.</p>
    </div>
  );
}

export default BuildPhase;