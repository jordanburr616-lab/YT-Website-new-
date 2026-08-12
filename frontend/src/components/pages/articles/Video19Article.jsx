import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video19Article() {
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
          source: "article_19",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_19",
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
          <p className="article-category">Learning</p>
          <p className="article-date">August 12, 2026</p>
          <h1>The 5 Hidden Stats That Make You Smarter</h1>

          <p className="article-subtitle">
            Intelligence is not just a number. It is a collection of skills your
            brain strengthens through 5 hidden stats.
          </p>

          <a
            className="article-video-link"
            href="https://youtu.be/hqkJV5ItSpk"
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
            If you want to become smarter, there is a good chance you have been
            upgrading the wrong stats.
          </p>
          <p>
            Most people spend more than a decade in school chasing grades 
            and diplomas, yet still leave feeling unprepared to think
            clearly in the real world.
          </p>
          <p>
            That is because intelligence is not one number. Your mind relies on
            several abilities that determine how well you learn, adapt, solve
            problems, and connect ideas.
          </p>
          <p>
            Those abilities are rarely taught directly, but they can be trained.
          </p>
          <blockquote>
            Becoming smarter is less about collecting random facts and more about
            building a brain that understands how to learn.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>The Misconception About Intelligence</h2>
          <p>
            People often judge intelligence through surface-level signals.
          </p>
          <p>
            These can be good grades, an impressive degree, or a large
            vocabulary can all suggest intelligence, but none of them capture
            the full picture.
          </p>
          <p>
            School is valuable, but school only rewards the ability to remember
            information long enough to pass an exam.
          </p>
          <p>
            You study, walk into the test knowing exact the material, and then forget
            most of it shortly afterward... because why do I need to know the powerhouse of a cell in the real world?
          </p>
          <p>
            So it becomes memorization without a real purpose.
          </p>
          <p>
            The smartest people are not necessarily the people who know the most
            random facts. They are the people who consistently give their brains
            opportunities to grow.
          </p>
          <blockquote>
            Knowledge matters, but the ability to use and connect knowledge
            matters more.
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats1.png"
              alt="Bands comparing grades and diplomas with deeper intelligence stats"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Neuroplasticity: Your Brain’s Built-In Superpower</h2>
          <p>
            If your brain is not fixed to a certain way forever, then what allows somebody to become
            better at thinking? The answer is neuroplasticity.
          </p>
          <p>
            Neuroplasticity is the brain’s ability to adapt, reorganize, and
            strengthen itself in response to what you repeatedly do.
          </p>
          <p>
            Every day, your brain quietly improves the skills you continue using
            and weakens the skills you neglect.
          </p>
          <p>
            That means you are never permanently stuck with the mind you have at this moment.
          </p>
          <p>
            When you train the right behaviors repeatedly, the pathways behind
            those behaviors become stronger, faster, and eventually more
            automatic.
          </p>
          <p>
            Think of it like leveling up a character in a video game. Every action
            gives you experience, but not every action upgrades the certain stats that
            actually matter.
          </p>
          <blockquote>
            Your brain becomes better at whatever you repeatedly ask it to do.
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats2.png"
              alt="Bands strengthening neural pathways through neuroplasticity"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Stat 1: Curiosity</h2>
          <p>
            Have you ever wondered why you can remember nearly every detail about
            a specific game, show, sport, or hobby but struggle to remember something from
            class?
          </p>
          <p>The difference is often curiosity.</p>
          <p>
            When you try to learn something new, your brain silently asks one
            question:
          </p>
          <blockquote>Do I actually care about this?</blockquote>
          <p>
            If the answer is no, learning feels like forced labor. Your attention
            fades, your energy drops, and the information disappears fast.
          </p>
          <p>
            If the answer is yes then you can research the topic for hours without
            knowing how much time has passed.
          </p>
          <p>
            Curiosity gives your brain a reason to build stronger connections.
            The more meaningful a subject feels, the more likely you are to
            revisit it and remember it.
          </p>
          <p>
            You do not need to force yourself to love every topic presented to you. Instead, look
            for an angle that connects the topic to something you already care
            about.
          </p>
          <blockquote>
            Curiosity tells your brain, “This is worth upgrading.”
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats3.png"
              alt="Bands becoming curious about a topic and improving his learning"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>How to Train Curiosity</h2>
          <p>- Connect new information to something you already understand.</p>
          <p>- Ask why the subject matters instead of only asking what it means.</p>
          <p>- Follow questions that naturally appear while you are learning.</p>
          <p>- Search for examples that connect the idea to real life.</p>
          <p>- Choose projects that force you to care about the answer.</p>
          <blockquote>
            Interest is not always something you wait for. Sometimes you create
            it by finding the right question.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Stat 2: Focus</h2>
          <p>
            Modern life will repeatedly tell us that doing multiple tasks at once means we are
            be productive.
          </p>
          <p>
            More tabs, more notifications, more tasks, and more stimulation can
            make it feel like you are handling everything the right way.
          </p>
          <p>In reality, you are training your brain to live in chaos.</p>
          <p>
            Every time your attention jumps from one thing to another, your mind
            has to reload the train of thought it was building.
          </p>
          <p>
            That makes it harder to strengthen the neural pathways learning really
            depends on.
          </p>
          <p>
            Focus is not about consuming the largest amount of information. It
            is about giving your thinking enough uninterrupted time to understand
            what it is trying to learn.
          </p>
          <blockquote>
            Your brain cannot strengthen a pathway it never fully travels.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>How to Train Focus</h2>
          <p>
            Remove distractions before they have the opportunity to take full control over your
            environment.
          </p>
          <p> - Put your phone in a different room, close unnecessary tabs </p> 
          <p> - Clean your workspace </p> 
          <p> - Turn off notifications </p> 
          <p> - Decide what one task really deserves your attention. </p>
          <p>
            The less energy your mind spends fighting distractions, the more
            energy it can spend learning.
          </p>
          <blockquote>
            Focus becomes easier when distraction is no longer the closest
            option.
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats4.png"
              alt="Bands removing distractions and strengthening his focus"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Stat 3: Application</h2>
          <p>
            Have you ever finished an incredible book and barely remember anything from it a
            month later?
          </p>
          <p>
            That happens because your brain is not rewarded only for consuming
            information. It is rewarded for using it.
          </p>
          <p>Humans learn through action.</p>
          <p>
            When you apply something you learned to your life, your brain receives evidence that the
            information matters.
          </p>
          <p>
            So the next time you learn something useful, do not just highlight it, put it into practice as soon as
            possible.
          </p>
          <p>Read it. Try it. Fail. Adjust. Try again.</p>
          <blockquote>Every application tells your brain, “Keep this one.”</blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats5.png"
              alt="Bands applying information through practice and repetition"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>How to Train Application</h2>
          <p>- Explain the idea in your own words.</p>
          <p>- Build something using what you learned.</p>
          <p>- Teach the concept to another person.</p>
          <p>- Complete a real task before consuming more information.</p>
          <p>- Review what failed and adjust your approach.</p>
          <blockquote>
            Information becomes knowledge when it changes what you can do.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Stat 4: Recovery</h2>
          <p>
            Recovery is one of the most overlooked intelligence stats because
            modern culture repeatedly tells people to work harder rather than
            thinking better.
          </p>
          <p>
            People assume that eight exhausted hours of studying must be better
            than four focused hours followed by proper recovery.
          </p>
          <p>Yet that is not how learning works.</p>
          <p>
            Learning does not end when you close the book. Your brain continues
            processing, organizing, and strengthening what you learned while you are
            rest.
          </p>
          <p>
            Sleep is a major part of recovery, but recovery includes more than just
            sleep.
          </p>
          <p>
            Breaks, movement, exercise, nutrition, quiet time, and stepping away
            from constant stimulation all give your mind room to improve.
          </p>
          <blockquote>
            If curiosity starts the upgrade, focus builds it, and application
            reinforces it, recovery is what locks you in.
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats6.png"
              alt="Bands recovering while his brain strengthens new pathways"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>How to Train Recovery</h2>
          <p>- Protect your sleep instead of treating it as an option.</p>
          <p>- Take real breaks before your focus completely collapses.</p>
          <p>- Exercise regularly to support your energy and attention.</p>
          <p>- Eat in a way that supports consistent mental performance.</p>
          <p>- Give yourself periods without constant screens and stimulation.</p>
          <blockquote>
            A tired brain can consume information, but it struggles to transform
            that information into a lasting ability.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Stat 5: Pattern Recognition</h2>
          <p>
            At this point, your brain has the foundation it needs to truly grow.
          </p>
          <p>
            Curiosity gives you information. Focus helps you absorb it.
            Application proves that it matters. Recovery strengthens the
            pathways.
          </p>
          <p>
            But none of those stats can create intelligence all by themselves. They all actually
            point toward the final stat: pattern recognition.
          </p>
          <p>
            Intelligence is not only about remembering facts. It is about
            connecting them all together.
          </p>
          <p>
            A programmer recognizes patterns in code. A musician recognizes
            patterns in sound. A chess player recognizes patterns on a board. A
            scientist recognizes patterns in data.
          </p>
          <p>
            Experts do not just memorize more information. They connect old
            information in better ways than their previous selves can.
          </p>
          <blockquote>
            Pattern recognition is what happens when the first four stats begin
            working together.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>How to Train Pattern Recognition</h2>
          <p>- Compare new ideas to concepts you already understand.</p>
          <p>- Ask where else the same principle appears.</p>
          <p>- Study mistakes instead of only studying correct answers.</p>
          <p>- Look for repeated structures across different examples.</p>
          <p>- Explain how two seemingly unrelated ideas can be connected.</p>
          <p>- Spend enough time in one field to notice what beginners cannot.</p>
          <blockquote>
            The smartest people are repeatedly asking, “How does this relate to stuff I already know?”
          </blockquote>
          <div className="article-image">
            <img
              src="/images/articles/the-5-hidden-stats-that-make-you-smarter/brainstats7.png"
              alt="Bands connecting ideas through pattern recognition"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Putting the Five Stats Together</h2>
          <p>These five stats are not isolated.</p>
          <p>Curiosity gives your brain a reason to learn.</p>
          <p>Focus gives your mind enough uninterrupted time to build pathways.</p>
          <p>Application tells your brain that the information does matter.</p>
          <p>Recovery strengthens what you practiced.</p>
          <p>Pattern recognition connects everything into the bigger picture.</p>

          <blockquote>Intelligence is one massive system, not a singular stat.</blockquote>
        </section>

        <section className="article-section">
          <h2>Where Most People Go Wrong</h2>
          <p>- They consume information without applying it.</p>
          <p>- They mistake constant stimulation for curiosity.</p>
          <p>- They try to multitask while actively learning.</p>
          <p>- They treat sleep and recovery as wasted time.</p>
          <p>- They chase random facts without connecting them to larger ideas.</p>
          <p>- They quit before the pathways have enough repetition to grow.</p>
          <blockquote>
            Your brain does not need more random input. It needs better training.
          </blockquote>
        </section>

        <section className="article-section article-next">
            <h2>Take the Next Step</h2>

            <p>
                Understanding these five hidden stats is one thing, but actually building
                them into your daily life is what creates lasting change.
            </p>

            <p>
                The Routine helps you organize focused work, learning, recovery,
                priorities, and breaks into one realistic daily schedule so you can
                consistently strengthen the habits that make your brain grow.
            </p>

            <div
                className="article-next-card"
                onClick={() => {
                trackEvent("article_system_clicked", {
                    page: window.location.pathname,
                    metadata: {
                    article: "video_19",
                    system: "the_routine",
                    },
                });

                navigate("/systems/routine");
                }}
            >
                <span>Free System</span>

                <h3>The Routine</h3>

                <p>
                Build a realistic daily schedule around deep work, learning,
                priorities, commitments, training, and recovery.
                </p>

                <span className="next-arrow">Build Your Routine →</span>
            </div>
            </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>
          <p>
            Becoming smarter was never only about having the highest IQ or
            memorizing the largest number of facts.
          </p>
          <p>
            It is about building a brain that becomes better at learning,
            adapting, applying, and piecing ideas together over time.
          </p>
          <p>
            Curiosity, focus, application, recovery, and pattern recognition are
            all trainable.
          </p>
          <p>
            You may not notice dramatic changes after just one day, but repeated
            actions will slowly reshape how you think.
          </p>
          <blockquote>
            Intelligence is not only something you have. It is something you
            build, repeatedly.
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
            navigate("/articles/how-to-get-addicted-to-building-muscle")
          }
        >
          <span>Next Article</span>
          <h3>How to Get Addicted to Building Muscle</h3>
          <p>
            Learn how to turn training into a rewarding progression system that
            makes consistency feel more natural.
          </p>
          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video19Article;