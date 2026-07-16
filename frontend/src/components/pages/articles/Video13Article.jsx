import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video13Article() {
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
          source: "article_13",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_13",
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
          <p className="article-category">Self-Control</p>

          <p className="article-date">May 21, 2026</p>

          <h1>The No Fap Timeline: What Actually Happens</h1>

          <p className="article-subtitle">
            A realistic breakdown of the first 90 days of quitting porn,
            including the urges, setbacks, mental shifts, and practical changes
            that can help you regain control.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/"
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
            Many people relapse before they ever experience what life feels
            like without constantly returning to porn.
          </p>

          <p>
            At first, motivation is high. You tell yourself that this time will
            be different, resist for a few days, and begin feeling proud of the
            progress you have made.
          </p>

          <p>
            Then the urges become stronger. Boredom appears. Stress builds.
            Your mind starts negotiating with you, and the idea of doing it
            “just once” begins sounding reasonable again.
          </p>

          <p>
            Quitting porn does not follow one exact timeline for everybody.
            Your experience will depend on your previous habits, triggers,
            environment, mental health, and reasons for quitting.
          </p>

          <p>
            However, several common stages tend to appear. Understanding them
            can help you prepare for difficult moments instead of being caught
            off guard by them.
          </p>

          <blockquote>
            The goal is not to become someone who never experiences an urge.
            The goal is to become someone who can experience one without
            automatically obeying it.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Day 0: Understand Why You Are Quitting</h2>

          <p>
            Before starting, you need an honest reason for why you want to
            change.
          </p>

          <p>
            Porn can provide fast pleasure, distraction, and temporary stress
            relief. That is exactly why the habit can become difficult to
            control. It offers an immediate reward without requiring much
            effort.
          </p>

          <p>
            The problem begins when it stops feeling like a choice. You might
            continue watching even when it interferes with your sleep,
            relationships, confidence, work, or the way you view other people.
          </p>

          <p>
            Simply declaring that you are quitting usually is not enough. If
            your environment remains identical, all of the same triggers are
            still waiting for you.
          </p>

          <p>
            Clean your room. Move your phone away from your bed. Install website
            restrictions. Unfollow accounts that repeatedly trigger you. Stop
            bringing your phone into places where you usually relapse.
          </p>

          <blockquote>
            Your environment should support the decision you made before your
            willpower becomes weak.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-no-fap-timeline/nofap1.png"
              alt="Bands changing his environment before beginning the no fap timeline"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>My Experience</h2>

          <p>
            I did not create this timeline as someone who was always in complete
            control.
          </p>

          <p>
            My own habits damaged the way I thought, affected my confidence, and
            played a role in the downfall of my previous relationship.
          </p>

          <p>
            I lost control, but I eventually decided to stop hiding from the
            problem. I read about the psychology of lust, watched other people
            explain their experiences, and began paying close attention to my
            own triggers.
          </p>

          <p>
            Over time, I made it beyond 90 days. The biggest change was not
            gaining some magical power. It was proving that an impulse did not
            have to control every decision I made.
          </p>

          <p>
            The process was still difficult. Some stages felt empowering, while
            others felt mentally exhausting. There were moments where the habit
            seemed completely behind me and others where one trigger brought
            the temptation straight back.
          </p>

          <blockquote>
            Recovery was not one perfect upward line. It was repeatedly choosing
            not to return to the same cycle.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Days 1–3: The Beginning</h2>

          <p>
            During the first few days, your mind may repeatedly attempt to pull
            you back toward the old routine.
          </p>

          <p>
            The urges can feel constant because the habit is still fresh. You
            remember the websites, accounts, situations, and times of day that
            previously led to porn.
          </p>

          <p>
            Motivation is usually still high enough to help you resist. Keeping
            your first promise to yourself can create an early feeling of
            confidence and relief.
          </p>

          <p>
            Do not mistake that early confidence for complete recovery. Your
            triggers have not disappeared, and relying entirely on motivation
            leaves you exposed when that motivation eventually fades.
          </p>

          <p>
            Add friction while you are thinking clearly. Use blockers, disable
            private browsing where possible, leave your phone outside your
            bedroom, and avoid scrolling alone late at night.
          </p>

          <blockquote>
            Make the bad decision difficult enough that you have time to stop
            and think.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Days 4–10: The Difficult Stretch</h2>

          <p>
            This is where many people begin struggling.
          </p>

          <p>
            The excitement of starting fades, but the habit has not been
            replaced yet. You may feel restless, distracted, irritable, or
            unusually sensitive to sexual content.
          </p>

          <p>
            That does not mean quitting is damaging you. It may simply mean that
            you are adjusting to living with less immediate stimulation and
            fewer automatic rewards.
          </p>

          <p>
            Instead of obsessing over every negative feeling, recognize what
            each additional day proves. You are beginning to create distance
            between an impulse and your response.
          </p>

          <p>
            Keep your days structured. Exercise, work on something meaningful,
            spend time around other people, and avoid long stretches of
            unplanned isolation.
          </p>

          <blockquote>
            An empty schedule gives an old habit room to return.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-no-fap-timeline/nofap2.png"
              alt="Bands pushing through the difficult early stage of quitting porn"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Days 10–30: Mixed Progress</h2>

          <p>
            This stage can feel unpredictable.
          </p>

          <p>
            Some days, you may feel focused, energetic, and proud of your
            progress. On other days, the process feels exhausting and you begin
            wondering whether continuing is worth the effort.
          </p>

          <p>
            A single social media post, late-night scroll, stressful event, or
            period of boredom can bring back urges you thought were already
            gone.
          </p>

          <p>
            This is where consistency matters more than motivation. You need
            something that continues supporting you when your excitement
            disappears.
          </p>

          <p>
            Accountability can help. Tell one or more trusted people that you
            are trying to quit porn and explain why it matters to you. Choose
            people who will take your goal seriously rather than mock it or
            encourage you to give up.
          </p>

          <p>
            You should also begin tracking your triggers. Write down what
            happened before each major urge, including the time, location,
            emotion, and activity.
          </p>

          <blockquote>
            Do not only count the days. Study the pattern.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Days 30–60: Regaining Control</h2>

          <p>
            After a month, the habit may begin feeling less automatic.
          </p>

          <p>
            This does not mean every urge disappears. It means you may become
            better at noticing an urge, pausing, and deciding what to do next.
          </p>

          <p>
            Many people describe having more energy or focus during this stage.
            Part of that improvement may come from sleeping better, scrolling
            less, reducing shame, and redirecting time toward healthier
            activities.
          </p>

          <p>
            Instead of thinking about “sexual energy” as something mystical,
            think about all of the attention, time, and effort that was
            previously consumed by the habit.
          </p>

          <p>
            That attention can now be redirected toward training, creative
            work, relationships, education, business, or another meaningful
            goal.
          </p>

          <p>
            Social interactions may also feel more natural if you are no longer
            constantly viewing people through a sexualized lens. However, this
            is not a guaranteed superpower. Confidence grows from your behavior,
            not simply from reaching a number on a streak.
          </p>

          <blockquote>
            Removing a destructive habit creates space. You still have to decide
            what will fill it.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Days 60–90: Rebuilding Trust</h2>

          <p>
            At this point, you have accumulated evidence that you can keep a
            difficult promise to yourself.
          </p>

          <p>
            That self-trust may begin spreading into other areas of your life.
            You might reduce your phone use, procrastinate less, improve your
            sleep, drink less, or become more consistent with your goals.
          </p>

          <p>
            This is not because quitting porn automatically solves every
            problem. It is because practicing self-control in one area can
            change the way you approach other impulses.
          </p>

          <p>
            You may also start viewing yourself differently. Instead of seeing
            yourself as someone helpless against the habit, you begin seeing
            yourself as someone capable of making a different choice.
          </p>

          <p>
            Avoid creating an overwhelming promise that you will never struggle
            again. Continue approaching the process one day and one decision at
            a time.
          </p>

          <blockquote>
            Trust is rebuilt through promises kept repeatedly, not through one
            dramatic declaration.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-no-fap-timeline/nofap3.png"
              alt="Bands rebuilding trust in himself after reaching 90 days"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Day 90 and Beyond: Long-Term Freedom</h2>

          <p>
            Reaching 90 days does not make you permanently immune to relapse.
          </p>

          <p>
            The real reward is developing the ability to pause, think, and
            choose differently when an urge appears.
          </p>

          <p>
            Porn may cross your mind less frequently, and the urges may feel
            easier to manage. However, old patterns can return when you stop
            paying attention to the triggers that created them.
          </p>

          <p>
            Those triggers might include alcohol, loneliness, stress, rejection,
            boredom, certain social media accounts, staying awake too late, or
            spending long periods alone.
          </p>

          <p>
            Long-term freedom comes from understanding your personal pattern
            and building a life where porn is no longer your main response to
            discomfort.
          </p>

          <blockquote>
            Freedom is not the absence of temptation. It is having a choice when
            temptation appears.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>What to Do When an Urge Hits</h2>

          <p>
            Leave the room or environment where the urge began.
          </p>

          <p>
            Put your phone somewhere that requires effort to retrieve.
          </p>

          <p>
            Delay the decision by ten minutes instead of trying to defeat the
            urge forever.
          </p>

          <p>
            Exercise, take a walk, shower, clean something, or begin a task that
            requires your full attention.
          </p>

          <p>
            Contact the person who knows you are trying to quit.
          </p>

          <p>
            Write down what triggered the urge so you can prepare for the same
            situation next time.
          </p>

          <blockquote>
            You do not need to feel completely in control. You only need to
            interrupt the automatic response.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>If You Relapse</h2>

          <p>
            One relapse does not erase every improvement you made.
          </p>

          <p>
            The bigger danger is using one mistake as permission to binge,
            abandon your standards, and return completely to the old lifestyle.
          </p>

          <p>
            Review what happened. Where were you? What were you feeling? What
            device did you use? What decision happened immediately before the
            relapse?
          </p>

          <p>
            Then adjust the environment and restart immediately. Do not wait
            until Monday, next month, or another symbolic date.
          </p>

          <blockquote>
            A relapse is information. Use it to strengthen the system instead of
            using it to attack yourself.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Common Mistakes</h2>

          <p>
            Depending entirely on motivation instead of changing your
            environment.
          </p>

          <p>
            Spending every day obsessively checking your streak.
          </p>

          <p>
            Replacing porn with endless scrolling or another source of constant
            stimulation.
          </p>

          <p>
            Believing that reaching a certain day will automatically transform
            your confidence, dating life, or success.
          </p>

          <p>
            Remaining isolated while trying to fight the habit alone.
          </p>

          <p>
            Treating one relapse as proof that the entire effort was worthless.
          </p>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>
            This journey was never only about reaching a large number on a
            calendar.
          </p>

          <p>
            It was about learning that every impulse does not deserve an
            immediate reaction.
          </p>

          <p>
            The beginning can feel impossible, but the process becomes more
            manageable when you understand your triggers, change your
            environment, remain occupied, and continue through the uncomfortable
            stages.
          </p>

          <p>
            Do not expect quitting porn to solve your entire life. Use the space
            it creates to become more present, disciplined, honest, and
            intentional.
          </p>

          <blockquote>
            Regaining control is not one decision. It is the same decision made
            again every time the old cycle tries to return.
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
            Porn is not the only source of constant stimulation fighting for
            your attention.
          </p>

          <p>
            Learning to control your phone use can make it easier to avoid
            triggers, protect your focus, and stop living completely on impulse.
          </p>

          <div
            className="article-next-card"
            onClick={() => navigate("/articles/get-addicted-to-being-off-your-phone")}
          >
            <span>Related Article</span>

            <h3>Get Addicted to Being Off Your Phone</h3>

            <p>
              Learn how to reduce constant stimulation and make spending time
              away from your phone feel natural.
            </p>

            <span className="next-arrow">Read Article →</span>
          </div>
        </section>

        <div
        className="article-next-card"
        onClick={() => navigate("/articles/how-to-get-addicted-to-building-muscle")}
        >
        <span>Next Article</span>

        <h3>How to Get Addicted to Building Muscle</h3>

        <p>
            Learn how to make training something you genuinely look forward to instead
            of another habit you constantly struggle to stay consistent with.
        </p>

        <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video13Article;