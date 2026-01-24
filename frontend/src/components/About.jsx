function About() {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "120px 24px",
  };

  return (
    <div style={{ background: "#afb1b3ff", minHeight: "100vh" }}>
      <section style={containerStyle}>
        {/* IMAGE */}
        <img
          src="/images/about-me.png"
          alt="About me"
          style={{
            width: "100%",
            height: "auto",          
            borderRadius: "20px",
            marginBottom: "64px",
            boxShadow: `
                  0 0 18px rgba(45, 166, 218, 0.35),
                  0 0 40px rgba(45, 166, 218, 0.25),
                  0 0 80px rgba(45, 166, 218, 0.15)
                `,
          }}
        />


        {/* TEXT */}
        <div style={{ maxWidth: "720px" }}>
          {/* EYEBROW */}
          <p
            style={{
              marginBottom: "20px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              fontWeight: "600",
              color: "#374151",
              textTransform: "uppercase",
            }}
          >
            Building Systems Since 2018
          </p>

          {/* OPENING */}
          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            <strong>
              “Building systems since 2018” doesn’t mean I had it figured out
              early.
            </strong>{" "}
            It means I got tired of relying on motivation — and started designing
            structure instead.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            For years, I tried to improve myself by pushing harder and waiting
            for motivation to show up. Sometimes it worked. Most of the time, it
            didn’t. Progress was inconsistent, fragile, and always reset when
            life got messy.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Everything changed when I stopped chasing motivation and started
            building structure. Clear rules. Fewer decisions. Systems that worked
            even on days I didn’t feel like showing up.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Over time, those systems helped me rebuild my habits, discipline, and
            direction. This site exists to share what I’ve learned — not hype or
            inspiration, but practical systems that actually hold up in real
            life.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Studying computer science helped me understand something deeper than
            just code: how structure, constraints, and feedback loops shape
            behavior. That way of thinking now drives everything I build here.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Bands, the stick figure, started as a simple drawing and became
            something more. It represents execution without emotion. Action
            before overthinking. Progress built one brick at a time.
          </p>

          <p style={{ lineHeight: "1.8" }}>
            Bands isn’t a mascot. It’s a reminder of who you become when you stop
            waiting to feel ready and start building anyway.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
