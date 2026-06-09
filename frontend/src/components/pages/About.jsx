import { usePageView } from "../../hooks/usePageView";

function About() {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "120px 24px",
  };

  usePageView("about");

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
            marginTop: "40px",
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
              “Building systems since 2018” doesn’t mean I had it all figured out
              early.
            </strong>{" "}
            It means I got tired of relying on all the fake motivation there is on the internet and started creating
            structures instead.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            For years, I tried to improve myself by pushing harder and waiting
            for motivation kick in. There were times it worked but Most of the time, I wounded up burning out. 
            My growth progress was inconsistent, fragile, and constantly restarting when
            life got messy.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Everything changed when I put all my focus on building systems, that help me reach my goals. Clear rules. Fewer decisions. These systems worked
            even on days I didn’t feel like showing up.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Over time, the systems I built helped me rebuild my habits, discipline, and
            direction. This site exists to share what I’ve learned and how you can successful build
            your own systems that actually work rather than relying on motivation.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Studying computer science helped me understand something deeper than
            just code: how structure, constraints, and feedback loops shape
            behavior. That way of thinking now drives everything I build for Improving JB.
          </p>

          <p style={{ marginBottom: "28px", lineHeight: "1.8" }}>
            Bands, the stick figure that's everywhere on this site, started as a simple drawing and became
            something more to me. It represents my inner thoughts and dreams. The version of myself that was too scared to act.
          </p>

          <p style={{ lineHeight: "1.8" }}>
            Bands isn’t a mascot. It’s a reminder of who you can truly become when you stop
            waiting to feel ready and start building regardless of what's happening in life.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
