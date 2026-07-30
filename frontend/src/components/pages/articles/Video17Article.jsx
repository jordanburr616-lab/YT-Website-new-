import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video17Article() {
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
          source: "article_17",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_17",
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
          <p className="article-category">Mindset</p>

          <p className="article-date">July 15, 2026</p>

          <h1>How to Get Out of a Rut in 7 Days</h1>

          <p className="article-subtitle">
            A simple 7-day reset to rebuild momentum, identify exactly what pulled you
            off track, and create a cycle you can repeat so your life starts moving in the right direction.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=CnXSDZslcHU&t=2s"
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
            Not too long ago, you might have been productive, disciplined, and
            locked in on your goals.
          </p>

          <p>
            But now, even doing the basic things feels harder than it should be.
            Getting out of bed, starting your work, going to the gym, cleaning
            your room, or just making one good decision can feel impossible when
            you are in what I like to call... a rut.
          </p>

          <p>
            And these ruts aren't dramatic and obvious. Sometimes
            it is just the slow realization that you stopped moving like the
            person you were trying to become.
          </p>

          <p>
            The goal of this guide is not to fix your entire life in one day.
            The goal is to help you build enough momentum to start moving
            forward once again.
          </p>
        </section>

        <section className="article-section">
          <h2>How to Use This Guide</h2>

          <p>
            This is not meant to produce fast results. It's meant to prepare you for a better future.
          </p>

          <p>
            Come back to this article each day and focus only on that day&apos;s
            objective. The goal is not perfection, it's taking the small steps.
          </p>

          <blockquote>
            Do not treat these seven days like a one-time challenge. Treat them
            like a reset loop you can repeat for the forseable future.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Day 1: Identify the Loop</h2>

          <p>
            Before you try to change everything, you need to figure out what
            pulled you back to bad habits in the first place.
          </p>

          <p>
            Most ruts do not happen overnight. Usually, one bad habit slowly
            sneaks back into your life. Just to list a few examples, it can be drinking, smoking, binge
            eating, doom scrolling, staying up too late, skipping workouts, or
            avoiding the work you know you need to do.
          </p>

          <p>
            At first, it feels harmless. Then it becomes normal and all of a sudden,
            you are back in the same loop you thought you escaped.
            So your only job Day 1 is to identify the trigger.
          </p>

          <blockquote>
            Write down the exact habit, environment, or pattern that started pulling
            you backwards.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-out-of-a-rut/rut1.png"
              alt="Bands identifying the loop that pulled him into a rut"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Day 2: Take One Action</h2>

          <p>
            Day 2 is simple. Take one action toward the person you are trying to
            become. Not ten actions. Not a complete overhaul of your life. One action.
          </p>

          <p>
            Delete the app you keep wasting time on. Go for a walk. Clean your
            room. Make a healthier meal. Apply to that job you've been thinking about. Open the project
            you have been avoiding.
          </p>

          <p>
            What matters is not how impressive the action looks. What matters is
            that you prove to yourself that you can still show up.
          </p>

          <blockquote>
            Every promise you keep to yourself rebuilds trust.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Day 3: Build Momentum</h2>

          <p>
            On Day 3, repeat yesterday&apos;s action and add another one to your plate.
          </p>

          <p>
            This is where the first signs of change usually start to show up.
            You might wake up and not immediately reach for your phone. You
            might make one better decision without overthinking it. You might
            finally do something you have been putting off.
          </p>

          <p>
            Momentum does not mean everything is fixed. It means your actions
            are finally starting to point in the right direction once again.
          </p>

          <p>
            But don't get too comfortable. One slip-up can still pull you back
            into the same cycle if you aren't careful enough to notice.
          </p>

        </section>

        <section className="article-section">
          <h2>Day 4: Make Success Easy</h2>

          <p>
            By now, you will probably notice that the hard part is not
            doing the good habits.
          </p>

          <p>
            The hard part is seriously resisting everything trying to pull you backward.
          </p>

          <p>
            That is why your environment matters. If your phone is next to you
            while you work, put it in another room. If your cabinet is full of
            junk food, replace them with healthier options. If you're going out too much, tell people ahead of time that you are not
            going.
          </p>

          <p>
            Bad habits don't just form out of nowhere. They are usually built from
            boredom, pressure, convenience, and environment.
          </p>

          <blockquote>
            Create distance between yourself and the habits that keep dragging
            you backward.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-out-of-a-rut/rut2.png"
              alt="Bands making success easier by removing distractions"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Day 5: Reward Yourself Properly</h2>

          <p>
            Just because you remove distractions doesn't mean that you can't enjoy life.
            There is a difference between escaping into a reward and actually earning
            one.
          </p>

          <p>
            If you try to force yourself to be disciplined nonstop with no
            reward, you will inevitably burn out. We are not designed psychologically to just
            grind forever with no enjoyment in between.
          </p>

          <p>
            So work with your brain instead of fighting it. You should pick a task, complete, and right after reward yourself.
            Having that reward in mind can push you to be more productive and stay on top of things.
          </p>

          <blockquote>
            The reward should come after the action, not before it.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Day 6: Increase the Difficulty</h2>

          <p>
            By Day 6, you have built the foundation.
          </p>

          <p>
            You identified your trigger, took action, built momentum, reduced
            distractions, and learned how to reward yourself without falling
            back into the same habits.
          </p>

          <p>
            Now it is time to up the difficulty.
          </p>

          <p>
            This is "progressive overload" for your life. A 10 minute walk becomes
            15 minutes. One page turns into three. Thirty minutes of work
            becomes forty-five. The increase should challenge you, but it should not crush you.
          </p>

          <blockquote>
            Easy habits help you start out. Slightly harder only will help you continue to grow.
          </blockquote>

        </section>

        <section className="article-section">
          <h2>Day 7: Reflect and Repeat</h2>

          <p>
            Day 7 is not the finish line. Instead, it is a reflection.
          </p>

          <p>
            Seven days ago, you may have felt stuck, lazy, behind, or completely
            disconnected from the person you wanted to become. But after six
            days of small, consistent action, you now have proof that you can change.
          </p>

          <p>
            The mistake would be acting like the reset is all over and go straight back to bad habits again.
          </p>

          <p>
            Getting out of a rut is not about surviving seven days. It's' about repeating the actions that
            helped you move forward and continuing to build off of the foundation you've created.
          </p>

          <blockquote>
            The point of this reset is not to escape a rut once. The point is to
            become someone who does not stay in one.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-out-of-a-rut/rut3.png"
              alt="Bands reflecting and repeating the 7 day reset"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Day 7 Reflection</h2>

          <p>
            Before you restart the cycle on Day 1 again, answer these questions honestly. (Write these down)
          </p>

          <p>
            What was your biggest win this week?
          </p>

          <p>
            What trigger still gave you the most trouble?
          </p>

          <p>
            What habit helped you feel the most momentum?
          </p>

          <p>
            What action are you repeating next week?
          </p>

          <p>
            What one thing are you putting more focus towards during the next 7-day cycle?
          </p>

          <blockquote>
            Reflect, adjust, and repeat. That is how this becomes a system
            instead of another short burst of motivation.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Bonus Tips for Getting Through the Week</h2>

          <p>
            Keep the reset small enough that you can realistically finish it.
          </p>

          <p>
            Don't turn Day 2 into a complete life makeover. That is exactly how people
            burn out before momentum even has a chance to build.
          </p>

          <p>
            Track your actions somewhere visible. A notebook, notes app,
            whiteboard, or calendar can all work. You need proof that you are
            showing up, and have it as a reminder to your brain.
          </p>

          <p>
            Avoid letting one bad moment become a bad week. Slipping up is not
            the real danger. The real danger is using one slip-up as permission
            to fully quit.
          </p>
        </section>

        <section className="article-section">
          <h2>Common Mistakes</h2>

          <p>
            Trying to change everything all at once.
          </p>

          <p>
            Relying on motivation to carry you throughout the
            entire process.
          </p>

          <p>
            Making your environment harder than it needs to
            be.
          </p>

          <p>
            Reaching Day 7 and assuming you are done.
          </p>

          <p>
            You are not done. You are just ready to run the cycle again with a
            better understanding of yourself. So that you are constantly Improving Everyday.
          </p>
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
            If you want a longer reset after this 7 day process, check out the
            30 Day Reset.
          </p>

          <p>
            It gives you a simple structure to keep building discipline,
            momentum, and consistency beyond just one week.
          </p>

          <div
            className="article-next-card"
            onClick={() => navigate("/systems/reset")}
          >
            <span>Free System</span>

            <h3>The 30 Day Reset</h3>

            <p>
              Build momentum again with a simple 30-day structure for discipline,
              habits, and personal growth.
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

export default Video17Article;