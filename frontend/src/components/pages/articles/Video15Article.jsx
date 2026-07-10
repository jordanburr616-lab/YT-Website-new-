import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video15Article() {
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
          source: "article_15",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_15",
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
          <p className="article-category">Fitness</p>

          <p className="article-date">June 17, 2026</p>

          <h1>The 7 Stages of Weight Loss</h1>

          <p className="article-subtitle">
            A deeper breakdown of what actually happens during a weight loss
            journey, why most people quit, and how to keep moving forward even when
            motivation disappears.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=wjeYESP8Uew&t=51s"
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
            You&apos;ve tried to lose weight before, but every single time, you
            quit and end up right back where you started.
          </p>

          <p>
            The truth is, most people don&apos;t fail because they chose the
            wrong diet or had a bad workout plan.
          </p>

          <p>
            They fail because they get stuck in one of the 7 stages of losing
            weight... without even realizing it.
          </p>

          <p>
            Depending on which stage you&apos;re currently in, you&apos;re either one
            decision away from finally breaking through or one mistake away from
            starting all over again.
          </p>
        </section>

        <section className="article-section">
          <h2>Stage 1: The Breaking Point</h2>

          <p>
            The breaking point is the moment where you finally become aware of
            what&apos;s been really going on.
          </p>

          <p>
            Maybe you walk up a flight of stairs and feel completely out of
            breath. Or you see a picture of yourself and barely recognize the
            person staring back at you. Or maybe you simply realize that most of
            your days are spent sitting around, eating whatever takes the least
            effort, and pretending everything is fine.
          </p>

          <p>
            This stage isn&apos;t really about losing weight yet. It&apos;s about
            awareness.
          </p>

          <p>
            You stop lying to yourself. You stop pretending your habits are not
            affecting you. And for the first time in a while, you decide enough
            is enough.
          </p>

          <blockquote>
            The first step is not becoming disciplined overnight. The first step
            is admitting that something has to change.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-stages-of-weight-loss/weight1.png"
              alt="Bands reaching his breaking point"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Stage 2: Highly Motivated</h2>

          <p>
            After a few walks, you might not see a huge difference on the scale,
            but something else starts to shift.
          </p>

          <p>
            You feel accomplished. Every walk feels like proof that you can
            actually do this. So of course, you continue to move forward.
          </p>

          <p>
            You sign up for the gym. It feels nerve racking at first because
            everyone looks more experienced than you. But after a few workouts,
            you realize something important.
          </p>

          <p>
            Nobody is paying nearly as much attention to you as you think they
            are.
          </p>

          <p>
            You start training a few days per week. With that you begin to eat out less, delete
            the food delivery apps, start grocery shopping more, and Slowly, your
            body begins to respond.
          </p>

          <p>
            This stage feels good because motivation is still high. But that is
            also the danger.
          </p>

          <p>
            Motivation can start the journey, but it cannot carry the you to the very end.
          </p>
        </section>

        <section className="article-section">
          <h2>Stage 3: The Reality Check</h2>

          <p>
            In the beginning, everything feels exciting. You see progress on the
            scale, you feel better about yourself, and every workout feels like a
            win.
          </p>

          <p>
            But eventually, the excitement will start to fade.
          </p>

          <p>
            You'll wake up sore, you won&apos;t feel like going to the gym, and the weight loss starts to
            slow down. The same workouts that once made you feel unstoppable
            now feel more annoying.
          </p>

          <p>
            This is where most people quit.
          </p>

          <p>
            Not because they are incapable. Not because they are lazy. But
            because they expected motivation to last forever.
            This is the stage where discipline needs to take over.
          </p>

          <blockquote>
            Progress is not made when you feel motivated. Progress is made when
            you keep showing up after motivation runs out.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-stages-of-weight-loss/weight2.png"
              alt="Bands facing the reality check of weight loss"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Stage 4: Routine</h2>

          <p>
            After showing up on the days you normally would have skipped, the gym
            starts becoming part of your life.
          </p>

          <p>
            Missing a workout begins to feel strange. Your walks turn into runs.
            Your lifts become more intense. Each week gives you a new goal to chase.
          </p>

          <p>
            Your diet starts becoming more consistent as well.
            This is where you realize weight loss is not just about finding the
            perfect workout because calories do matter also. On top of other factors (consistency & discipline) that matter more than any random burst of motivation.
          </p>

          <p>
            And eventually, people around you will begin to notice. They no longer see
            you as the person who keeps saying they are going to change.
            They start seeing someone who is actually doing it.
          </p>
        </section>

        <section className="article-section">
          <h2>Stage 5: Visible Results</h2>

          <p>
            After months of consistency, the results become obvious.
          </p>

          <p>
            You start doing double takes in the mirror. Your out fitting your large clothes. Your shoulders and arms look better. Your confidence
            starts changing because you finally have proof that your work is
            paying off.
          </p>

          <p>
            This is also where attention begins to show up.
            Some people will be impressed... and
            some people will criticize you for taking things too seriously.
          </p>

          <p>
            Do not let either side control you.
          </p>

          <p>
            Compliments feel good, but they are not the finish line. Criticism
            might sting, but it does not mean you are doing something wrong.
            This stage is where you learn to keep improving even after people
            start noticing.
          </p>

          <div className="article-image">
            <img
              src="/images/articles/the-7-stages-of-weight-loss/weight3.png"
              alt="Bands seeing visible results from weight loss"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Stage 6: The Plateau</h2>

          <p>
            Eventually, the beginner gains will slow down.
          </p>

          <p>
            The lifts that used to go up every week start flattening. The scale
            stops moving. The mirror stops giving you that brand-new-person type of
            feeling.
          </p>

          <p>
            Even though you are still showing up, eating well, and
            putting in the work. But nothing seems to be happening.
          </p>

          <p>
            This stage is frustrating because it feels like your effort stopped
            working. A lot of people quit here due to easier habits starting to
            look more rewarding once again.
          </p>

          <p>
            But every strong, lean, athletic person you see has gone through
            this exact stage.
          </p>

          <p>
            The difference is that they never assumed they were done growing.
            They adjusted, remained patient, and kept showing up long enough for
            their body to eventually catch up with their mentality.
          </p>

          <blockquote>
            A plateau is not proof that you failed. It is proof that your body is
            asking for a smarter level of effort.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Stage 7: The New You</h2>

          <p>
            After enough time, what started as a goal to lose weight becomes a brand new
            lifestyle.
          </p>

          <p>
            You think healthier. You take care of yourself without needing to
            force it. People no longer see you as the same person you used to be.
            But the biggest transformation is not the weight loss, the
            abs, or even the way other people treat you.
          </p>

          <p>The biggest transformation is mental.</p>

          <p>
            The discipline you built starts showing up in other areas of your
            life. So you start to ask bigger questions.
          </p>

          <p>
            What&apos;s next? A half marathon? A powerlifting meet? A new sport? A
            bigger goal?
          </p>

          <p>
            At this point, doing hard things is no longer something you avoid.
            It becomes part of who you are.
          </p>

          <div className="article-image">
            <img
              src="/images/articles/the-7-stages-of-weight-loss/weight4.png"
              alt="Bands becoming the new version of himself"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Where Most People Go Wrong</h2>

          <p>
            Most people treat weight loss like a short term challenge instead of
            a long term identity shift.
          </p>

          <p>
            They want the results, but they do not want the boring stuff that's in the middle.
            They want the transformation, but they do not want the days where
            nothing exciting happens.
          </p>

          <p>
            That is why the real goal is not just to lose weight. The real goal
            is to become the type of person who no longer lives the way they used
            to.
          </p>

          <p>
            If you only chase the scale, you will eventually grow frustrated. But
            if you build the habits, routines, and discipline that create the desired
            result, then weight loss becomes a side effect of heading towards that better you.
          </p>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>
            Weight loss is not one clear straight line. It is a process filled
            with motivation, discomfort, progress, plateaus, doubt, and many other things.
          </p>

          <p>
            The people who succeed are not the ones who feel motivated every
            day.
            They are the people who understand what stage they are in and refuse
            to let one bad week send them back to the beginning.
          </p>

          <blockquote>
            You do not need to become perfect. You just need to keep moving
            forward long enough for the new version of you to be the new normal.
          </blockquote>
        </section>

        <section className="article-newsletter">
          <h2>Get Future Systems & Weekly Updates</h2>

          <p>
            Be the first to know when new systems, videos, and updates drop
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
            If you&apos;re ready to stop guessing what to do next in the gym, check out the 10 Week
            Build.
          </p>

          <p>
            It helps you generate a personalized training plan based on your own
            goals, experience, schedule, and current strength levels.
          </p>

          <div
            className="article-next-card"
            onClick={() => navigate("/systems/build")}
          >
            <span>Free System</span>

            <h3>The 10 Week Build</h3>

            <p>
              Build a structured workout plan and test your strength over a 10
              week stretch.
            </p>

            <span className="next-arrow">View System →</span>
          </div>
        </section>

        <div
          className="article-next-card"
          onClick={() => navigate("/articles/why-you-care-so-much")}
        >
          <span>Next Article</span>

          <h3>Why You Care So Much What People Think</h3>

          <p>
            Understand why judgment controls so many people and how to stop
            letting opinions drive your life.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video15Article;