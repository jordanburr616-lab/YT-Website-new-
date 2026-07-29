import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video14Article() {
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setSignupStatus("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "article_14",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_14",
          form: "article_newsletter",
        },
      });

      setSignupStatus("Thank you for signing up!");
      setEmail("");
    } catch (err) {
      setSignupStatus("Something went wrong. Try again.");
      console.error(err);
    }
  }

  return (
    <main className="article-page">
      <article className="article-container">
        <button
          className="article-back-button"
          onClick={() => navigate("/articles")}
        >
          ← Back to Articles
        </button>

        <header className="article-header">
          <p className="article-category">Self-Improvement</p>

          <p className="article-date">June 3, 2026</p>

          <h1>The 7 Levels of a Glow Up</h1>

          <p className="article-subtitle">
            A glow up is not just about becoming better looking. It is the
            process of gradually improving habits, health, confidence, identity, and
            the way you carry yourself without becoming over obsessed with the end result.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com//watch?v=ZHRfDUs0QuM"
            target="_blank"
            rel="noreferrer"
          >
            <span className="yt-icon">▶</span>
            Watch on YouTube
            <span className="article-link-arrow">↗</span>
          </a>
        </header>

        <section className="article-section">
          <h2>Introduction</h2>

          <p>
            Most people believe attractiveness is determined almost entirely by
            genetics. Well, genetics obviously does play a role, but they are not the full story.
            Your sleep, hygiene, posture, fitness, grooming, confidence, and
            daily habits all influence how you look and how other people
            perceive you.
          </p>

          <p>
            That is why almost anyone can experience a noticeable glow up at any stage of their life. It
            is not about becoming flawless. It requires removing the habits
            that unknowingly damage your appearance and replacing them with habits
            that make you healthier, stronger, and more confident.
          </p>

          <p>
            These seven levels explain how the glow up transformation typically
            develops, from basic damage control to a dangerous end goal...
          </p>
        </section>

        <section className="article-section">
          <h2>Level 1: Damage Control</h2>

          <p>
            The first level is not about becoming exceptionally attractive. It
            is dialing in on stopping the habits that are actively making you look worse.
          </p>

          <p>
            Poor sleep, constant screen use, dehydration, bad hygiene, and a
            complete lack of self-care can make your eyes, skin, and levels of energy seem way worse than they actually are.
          </p>

          <p>
            Start improving on the basics. Get seven to eight hours of sleep,
            Drink plenty of water throughout the day, and focus on your hygiene: brushing your teeth, showering regularly, keeping your
            facial hair maintained, and spending less time staring at screens late
            at night.
          </p>

          <p>
            None of these actions sound exciting on the surface, but that is exactly why people
            overlook them. The foundation of a glow up is usually built through
            simple actions performed consistently.
          </p>

          <blockquote>
            Before adding any of the advanced habits you see online, stop doing the little things that are
            actively pulling you backward.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-a-glow-up/glow-up1.png"
              alt="Bands beginning his glow up by improving basic self-care"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 2: Build the Foundation</h2>

          <p>
            Once the worst habits are finally under control, the next step is creating
            structure.
          </p>

          <p>
            Strength training is one of the most effective ways to improve your
            appearance because it doesn't just add muscle. It changes your posture, body composition,
            confidence, and physical presence.
          </p>

          <p>
            You do not need to become a professional bodybuilder. Training
            three or four days each week while prioritizing proper form is
            enough to begin seeing visible progress.
          </p>

          <p>
            Your haircut, clothes, grooming, and fragrance also matter. A
            haircut that complements your face and clothes that properly fit
            your body can completely change how put together you appear.
          </p>

          <p>
            You also do not need an expensive wardrobe. Simple colors and
            versatile clothing combinations can look better than constantly
            buying new outfits that do not suit you well.
          </p>

          <blockquote>
            Looking put together is usually due to consistency, not just
            expensive products.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 3: Visible Transformation</h2>

          <p>
            Level 3 is when the work begins showing externally.
          </p>

          <p>
            Your physique looks leaner, your posture improves, your skin may
            seem clearer, and your confidence becomes way more noticeable. People
            who ignored your progress before finally begin to recognize you.
          </p>

          <p>
            The key to maintainenence is realizing that nutrition is crucial for sustainability. Building
            muscle while holding an athletic appearance usually requires
            eating mostly nutritious, minimally processed foods, and consuming
            the right amount of protein.
          </p>

          <p>
            Basic skin care can also make a difference. A cleanser and
            moisturizer will not magically transform your face, but a simple,
            consistent routine of these can most definitely lead to healthier skin.
          </p>

          <p>
            Your body language matters just as much. Stand upright, make eye
            contact, walk with intention, and stop apologizing for things you didn't do.
          </p>

          <blockquote>
            Confidence becomes visible before you ever say a word.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-a-glow-up/glow-up2.png"
              alt="Bands showing the first visible results of his transformation"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 4: Social Proof</h2>

          <p>
            Once your appearance and confidence improve, people will start
            treating you differently.
          </p>

          <p>
            You might receive more compliments, have smoother conversations, feel
            more confident while dating, or notice that people are now more willing
            to listen to you.
          </p>

          <p>
            But this is also where many people lose themselves.
          </p>

          <p>
            When attention starts turning automatic, it becomes easy to
            chase more of it. Partying, nicotine, validation, casual attention,
            and ego can slowly replace the habits that created the glow up in
            the first place.
          </p>

          <p>
            If you begin believing that you are above everyone else, the
            progress can reverse quickly. The people who continue improving are
            usually the ones who remain humble and grounded.
          </p>

          <blockquote>
            Attention is not proof that you are done growing.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 5: Optimization</h2>

          <p>
            This is where the smaller details begin separating someone who looks
            good from someone who genuinely stands out.
          </p>

          <p>
            Improving your diet may reduce facial bloating. Continuing to train
            can develop areas people typically forget to workout, including the neck,
            shoulders, and posture muscles.
          </p>

          <p>
            However, the biggest improvement at this level is not even physical. It
            is developing your own identity.
          </p>

          <p>
            Many people shape their personality, appearance, and decisions
            around whatever earns approval from their peers the fastest. While that can create temporary attention, it does not create
            confidence.
          </p>

          <p>
            Develop your own interests, goals, standards, and personality. A
            person who knows what they value is naturally more memorable than
            someone repeatedly copying everybody around them.
          </p>

          <blockquote>
            Refinement means becoming more like yourself, not becoming a copy of
            someone else.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 6: Status</h2>

          <p>
            After putting serious time into consistent improvement, your presence begins
            carrying more weight.
          </p>

          <p>
            Confidence will come naturally. People will view you as
            disciplined, capable, attractive, and dependable before they know
            much about you.
          </p>

          <p>
            But appearance can never replace social skills.
          </p>

          <p>
            If your looks start doing all the work, it is possible to stop
            practicing conversation, empathy, humor, and genuine connection.
            Eventually, that weakness will become obvious.
          </p>

          <p>
            Continue getting real social practice. Like talking to people at work, at
            the gym, within your family, and even in every day situations. Learn to
            listen, communicate clearly, and make other people feel respected.
          </p>

          <p>
            Physical attractiveness combined with ambition, social ability,
            reliability, and humility is far more powerful than appearance
            alone.
          </p>

          <blockquote>
            Looks can create an introduction. Character determines whether
            people will continue respecting you or not.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-a-glow-up/glow-up3.png"
              alt="Bands combining confidence, social ability, and ambition"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 7: The Perfection Trap</h2>

          <p>
            The final level is not the perfect glow up. It is the point where
            the pursuit of improvement becomes unhealthy.
          </p>

          <p>
            Social media constantly introduces new beauty standards, extreme
            routines, cosmetic procedures, and a multitude of appearance trends. No matter how
            much progress you make, another person/trend will always suggest
            that something about you still needs fixing.
          </p>

          <p>
            When your self-worth becomes completely tied to your appearance, you
            will never feel finished. You can become healthier and more
            attractive while simultaneously feeling less confident than when
            you started.
          </p>

          <p>
            That is why appearance cannot become your entire identity. The goal
            is to improve yourself in a healthy and sustainable way, not spend
            every waking hour trying to look flawless.
          </p>

          <p>
            A glow up should improve your life... it should not make you afraid of
            aging, imperfections, bad pictures, or losing the approval of
            strangers.
          </p>

          <blockquote>
            If improvement makes you hate yourself more, it is no longer considered an
            improvement.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>How to Approach Your Own Glow Up</h2>

          <p>
            Begin with one level instead of trying to complete the entire
            transformation immediately.
          </p>

          <p>
            Such as fixing your sleep and hygiene before purchasing supplements or
            expensive skin-care products. Building a consistent workout routine
            before obsessing over advanced exercises. Improving the way your
            clothes fit before replacing your entire wardrobe.
          </p>

          <p>
            Take progress pictures monthly rather than checking the mirror
            every few hours. Daily changes are difficult to notice, but
            consistent progress becomes obvious during longer periods.
          </p>

          <p>
            Most importantly, choose habits you can maintain. A routine that
            lasts for years will outperform an extreme transformation that
            collapses after two weeks.
          </p>
        </section>

        <section className="article-section">
          <h2>Common Glow Up Mistakes</h2>

          <p>
            Buying expensive products before fixing basic habits.
          </p>

          <p>
            Attempting to transform everything about yourself at once.
          </p>

          <p>
            Following every new appearance trend you see online.
          </p>

          <p>
            Comparing your first month to someone else&apos;s transformation.
          </p>

          <p>
            Improving only to earn attention from other people.
          </p>

          <p>
            Becoming so obsessed with perfection that you stop appreciating
            the progress you've already made.
          </p>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>
            A glow up is not an imaginary finish line where everyone suddenly
            finds you attractive.
          </p>

          <p>
            It is the process of becoming healthier, disciplined,
            confident, and more comfortable with who you are.
          </p>

          <p>
            Improving your appearance can open doors, but your identity,
            behavior, and character determine what happens after those doors
            open.
          </p>

          <blockquote>
            Keep improving, but do not lose yourself in the process.
          </blockquote>
        </section>

        <section className="article-newsletter">
          <h2>Get Future Systems & Weekly Updates</h2>

          <p>
            Be the first to know when new systems, videos, and updates drop.
          </p>

          <form className="newsletter-form" onSubmit={handleSignupSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Join</button>
          </form>

          {signupStatus && <p>{signupStatus}</p>}
        </section>

        <section className="article-section article-next">
        <h2>Take the Next Step</h2>

        <p>
            Improving your appearance is only one part of building a stronger version
            of yourself.
        </p>

        <p>
            The 10 Week Build gives you a structured training plan to build strength,
            muscle, and consistency over the next ten weeks.
        </p>

        <div
            className="article-next-card"
            onClick={() => navigate("/systems/build")}
        >
            <span>Free System</span>

            <h3>The 10 Week Build</h3>

            <p>
            Follow a personalized ten-week training structure designed around your
            experience, goals, schedule, and available equipment.
            </p>

            <span className="next-arrow">View System →</span>
        </div>
        </section>

        <div
          className="article-next-card"
          onClick={() =>
            navigate("/articles/the-no-fap-timeline")
          }
        >
          <span>Next Article</span>

          <h3>The No Fap Timeline</h3>

          <p>
            A realistic breakdown of what happens from Day 1 to Day 90 when you quit
            porn, including the challenges, mindset shifts, and how to stay consistent.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video14Article;