import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video20Article() {
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
          source: "article_20",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_20",
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
          <p className="article-category">Addiction</p>
          <p className="article-date">August 26, 2026</p>

          <h1>How to Reverse Alcoholism</h1>

          <p className="article-subtitle">
            Alcohol can slowly take control of your life... so reaching level 0 is all about
            reversing the alcohol process and taking back control.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=f6v-ppTYNhk"
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
            Alcohol addiction usually does not happen because of one night.
          </p>

          <p>
            A drink on special occasions can quickly move to drinking every weekend.
            Drinking for fun becomes drinking to escape. Your tolerance continues to expand,
            alcohol becomes more important, and eventually something that used
            to be a small part of your life can start to take full control.
          </p>

          <p>
            But if alcohol can gradually take pieces of your life away, those
            pieces can also be taken back over time.
          </p>

          <p>
            That is what Level 0 represents.
          </p>

          <blockquote>
            Level 0 is not about pretending alcohol was never a problem. It is
            about reaching the point where alcohol no longer has a say in your
            decisions.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>What Level 0 Actually Means</h2>

          <p>
            At Level 1, alcohol was only a tiny part of your life.
          </p>

          <p>
            You had friends, hobbies, responsibilities, goals, and experiences
            that existed completely independently from drinking.
          </p>

          <p>
            As alcohol moves deeper into your life, that relationship typically reverses on itself.
          </p>

          <p>
            Your weekends revolve around drinking. Your social life revolves
            around drinking. Normal human emotions make you want to drink. Boredom makes you
            want to drink. Eventually, alcohol gets a vote in almost everything.
          </p>

          <p>
            Level 0 means reversing that relationship.
          </p>

          <blockquote>
            At Level 1, alcohol is a small part of your life. At Level 7, your
            life becomes a small part of alcohol. Level 0 is taking your life
            back.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-reverse-alcoholism/alcohol1.png"
              alt="Bands moving from alcohol controlling his life toward Level 0"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Step 1: Admit What Alcohol Is Costing You</h2>

          <p>
            You cannot reverse a problem you are still trying to convince
            yourself does not exist.
          </p>

          <p>
            One of the easiest ways to continue drinking is to separate every
            consequence from the habit itself.
          </p>

          <p>
            You stopped working out because you got "busy". You wasted Saturday
            because "you were tired". You spent too much money because "all my friends went out".
             You stopped seeing certain people because "life changed".
          </p>

          <p>
            Maybe some of those explanations are true.
          </p>

          <p>
            But eventually you need to look at the picture as a whole.
          </p>

          <p>Ask yourself what drinking has affected:</p>

          <p>- Your health</p>
          <p>- Your relationships</p>
          <p>- Your money</p>
          <p>- Your energy</p>
          <p>- Your hobbies</p>
          <p>- Your work</p>
          <p>- Your ability to enjoy life without the need of alcohol</p>

          <blockquote>
            The way back starts when you stop protecting the habit from the
            consequences it created.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-reverse-alcoholism/alcohol2.png"
              alt="Bands looking at the different areas of his life affected by alcohol"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Step 2: Break the Automatic Drinking Loop</h2>

          <p>
            At the beginning, drinking requires some kind of decision.
          </p>

          <p>
            Which overtime, that decision will become automatic.
          </p>

          <p>
            Friday night means drinking. A stressful shift means drinking.
            Watching the game means drinking. Seeing certain friends means
            drinking.
          </p>

          <p>
            The trigger appears and your brain already knows what happens next.
          </p>

          <p>
            Getting back to Level 0 means interrupting that pattern.
          </p>

          <p>
            Start small. Have one night where the normal trigger happens and you
            don't impulsively drink.
          </p>

          <p>
            Then prove you can do it again.
          </p>

          <blockquote>
            Every time the trigger appears and you choose something different,
            you weaken the idea that drinking is the automatic response.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 3: Figure Out What You Were Escaping From</h2>

          <p>
            Alcohol is usually not the main source of the problem.
          </p>

          <p>
            Sometimes it becomes the solution you repeatedly use for another
            problem.
          </p>

          <p>Stress.</p>
          <p>Boredom.</p>
          <p>Loneliness.</p>
          <p>Insecurity.</p>
          <p>Relationship problems.</p>
          <p>Not knowing what you are doing with your life.</p>

          <p>
            Drinking can temporarily make those feelings go silent.
          </p>

          <p>
            But silencing an emotion is not the same thing as finding a solution.
          </p>

          <p>
            If every uncomfortable emotion leads to drinking, you never get the
            opportunity to learn how to handle the emotion itself.
          </p>

          <blockquote>
            Stop only asking, "How can I stop feeling this?" and start asking,
            "Why am I feeling this?"
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-reverse-alcoholism/alcohol3.png"
              alt="Bands confronting the problems he previously used alcohol to escape"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Step 4: Make Drinking Harder</h2>

          <p>
            Trying to change while remaining in the same exact environment that created
            the problem makes everything 10x harder.
          </p>

          <p>
            If alcohol is sitting around your house, every weekend revolves
            around bars, and everyone around you expects you to drink, you are
            relying almost entirely on your willpower.
          </p>

          <p>Change the environment instead.</p>

          <p>- Remove alcohol from places where you constantly see it.</p>
          <p>- Stop automatically agreeing to every night out.</p>
          <p>- Create plans that do not revolve around drinking.</p>
          <p>- Spend time around people who do not care if you are drinking.</p>
          <p>- Identify situations where you repeatedly lose control.</p>

          <p>
            You do not necessarily need to abandon everyone you have ever drank
            with.
          </p>

          <p>
            But you should recognize when an environment repeatedly pulls you
            toward a version of yourself you are trying to leave behind.
          </p>

          <blockquote>
            The goal is not to become infinitely disciplined. Make the better
            decision easier to make.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 5: Rebuild What Alcohol Replaced</h2>

          <p>
            Removing alcohol can create something people often underestimate:
            empty space.
          </p>

          <p>
            If Friday and Saturday were spent drinking every week, what happens
            to those nights now?
          </p>

          <p>
            If alcohol was how you handled stress, what should replace it?
          </p>

          <p>
            If bars were your entire social life, what do you do with your
            friends?
          </p>

          <p>
            You cannot only remove the old behavior. You need to build something
            in its place.
          </p>

          <p>- Return to hobbies you stopped doing.</p>
          <p>- Start training again.</p>
          <p>- Reconnect with people you disappeared from.</p>
          <p>- Build something you care about.</p>
          <p>- Work toward a goal that requires you to be present.</p>

          <p>
            Eventually, drinking will battle for time with the things that truly matter.
          </p>

          <blockquote>
            The stronger your life becomes outside of alcohol, the more alcohol
            has to take away from you.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-reverse-alcoholism/alcohol4.png"
              alt="Bands rebuilding his hobbies relationships health and goals"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Step 6: Do Not Let One Failure Turn Into Ten</h2>

          <p>
            Progress is easy to destroy when you think in extremes.
          </p>

          <p>
            Somebody goes two weeks without drinking, has one terrible night,
            and immediately thinks all of their progress disappeared.
          </p>

          <p>
            Then one mistake becomes an excuse to return to the old pattern.
          </p>

          <p>
            Instead, study what happened.
          </p>

          <p>What triggered you?</p>
          <p>Who were you around?</p>
          <p>What were you feeling?</p>
          <p>What excuse did you make beforehand?</p>

          <p>
            The failure has a ton of information about the part of your system that
            still needs to change.
          </p>

          <blockquote>
            One bad decision does not erase your progress. Repeating it without
            learning anything from it will.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 7: Start Taking Your Life Back</h2>

          <p>
            Eventually, reversing alcoholism becomes about something bigger than
            alcohol.
          </p>

          <p>
            There may be relationships you need to repair, money you need to
            rebuild, health you neglected, responsibilities you ignored, and
            goals you stopped pursuing.
          </p>

          <p>
            Those things probably will not come back immediately.
          </p>

          <p>
            The same way alcohol slowly took pieces of your life, you rebuild
            them piece by piece.
          </p>

          <p>One night where you choose not to drink.</p>
          <p>One morning where you wake up clearheaded.</p>
          <p>One workout you would have skipped.</p>
          <p>One conversation you finally have.</p>
          <p>One responsibility you start taking seriously again.</p>

          <p>
            None of those decisions look life-changing on the outside.
          </p>

          <p>
            Stack enough of them together and eventually your life looks
            completely different.
          </p>

          <blockquote>
            The comeback is built through small decisions repeated long enough
            for your life to become yours again.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-reverse-alcoholism/alcohol5.png"
              alt="Bands rebuilding his life one piece at a time"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>When You Should Get Professional Help</h2>

          <p>
            There is an important difference between changing an unhealthy
            relationship with alcohol and dealing with a severe physical
            dependence.
          </p>

          <p>
            If you drink heavily or regularly enough that stopping causes many
            withdrawal symptoms, trying to suddenly quit on your own can be
            dangerous.
          </p>

          <p>
            In that situation, getting help from a qualified medical
            professional or addiction specialist is not a failure of
            discipline. It is the safer way to approach the problem.
          </p>

          <p>
            The deeper alcohol has worked its way into your life, the more
            support you may need while climbing your way back.
          </p>

          <blockquote>
            Taking control includes knowing when the problem requires more than
            willpower.
          </blockquote>
        </section>

        <section className="article-section article-next">
          <h2>Take the Next Step</h2>

          <p>
            Alcohol can take control when your days lose structure and the
            easiest option repeatedly becomes the default.
          </p>

          <p>
            The Routine helps you create a realistic daily schedule around your
            priorities, work, training, recovery, and free time so there is more
            of your life being intentionally built.
          </p>

          <div
            className="article-next-card"
            onClick={() => {
              trackEvent("article_system_clicked", {
                page: window.location.pathname,
                metadata: {
                  article: "video_20",
                  system: "the_routine",
                },
              });

              navigate("/systems/routine");
            }}
          >
            <span>Free System</span>

            <h3>The Routine</h3>

            <p>
              Build a realistic daily schedule around your priorities,
              commitments, training, recovery, and the life you are trying to
              rebuild.
            </p>

            <span className="next-arrow">Build Your Routine →</span>
          </div>
        </section>

        <section className="article-section">
          <h2>Final Thoughts: The Way Back to Level 0</h2>

          <p>
            Level 0 does not mean life will instantly get easier.
          </p>

          <p>
            Stress will still exist. Boredom will still exist. Bad nights will
            still happen, and sometimes escaping your problems will sound much
            easier than confronting them.
          </p>

          <p>
            The difference is that alcohol no longer gets to automatically
            decide what happens next.
          </p>

          <p>
            Your relationships, goals, health, hobbies, and even future all will start to matter again.
          </p>

          <p>
            You do not have to rebuild everything tonight.
          </p>

          <p>You just have to start moving in the opposite direction.</p>

          <blockquote>
            Sometimes the entire way back begins with one decision: Not tonight.
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

        <div
          className="article-next-card"
          onClick={() =>
            navigate("/articles/the-5-hidden-stats-that-make-you-smarter")
          }
        >
          <span>Next Article</span>

          <h3>The 5 Hidden Stats That Make You Smarter</h3>

          <p>
            Learn the five trainable abilities that determine how effectively
            your brain learns, adapts, and connects ideas.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video20Article;