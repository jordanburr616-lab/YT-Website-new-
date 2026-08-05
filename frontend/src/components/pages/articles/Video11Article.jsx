import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video11Article() {
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
          source: "article_11",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_11",
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

          <p className="article-date">April 10, 2026</p>

          <h1>The 7 Levels of Nicotine Addiction</h1>

          <p className="article-subtitle">
            A seven-level breakdown of how nicotine use can grow from something
            you dislike into something that controls your day... as well as what you can
            do before the habit gets even worse.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=XqFfUQ4zMS0"
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
            The first time someone offers you a vape, you may think it is
            one of the worst things on the planet.
          </p>

          <p>
            You wonder how anybody could enjoy it. Like even after you take that first
            hit, you don't think much about it.
          </p>

          <p>
            Yet weeks later, you get the temptation to hit it again. You start thinking
            about it when you are stressed, bored, or around certain people.
            Eventually, something that once seemed pointless begins to feel
            like a necessity.
          </p>

          <p>
            Nobody plans on becoming addicted after one hit. The change usually
            happens slowly enough that you do not notice where curiosity ended
            and where dependence began.
          </p>

          <p>
            These seven levels explain that exact progression. More importantly, each
            level includes a way to interrupt it before nicotine gains more
            control over your life.
          </p>

          <blockquote>
            Addiction rarely is noticable. It grows through small decisions
            that stop feeling small over time.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 1: Despise</h2>

          <p>
            At this level, you are not addicted. In fact, you may think vaping
            looks stupid, smells unpleasant, and just makes zero sense.
          </p>

          <p>
            That does not mean there is no pressure to give vaping a try. Your friends may use
            nicotine around you, pass devices back and forth, or treat it like a
            normal part at a hang out.
          </p>

          <p>
            The temptation often has less to do with nicotine and more to do
            with feeling itself.
          </p>

          <p>
            You may not want the vape itself. You might just want the social approval
            that appears to come with joining in.
          </p>

          <p>
            The solution at this level is simple, even though it can feel
            awkward: do not hit it in the first place.
          </p>

          <p>
            Say no before curiosity becomes a habit. You do not need a dramatic
            explanation. A direct answer is enough.
          </p>

          <blockquote>
            The easiest addiction to escape is the one you never allow to begin.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-nicotine-addiction/nicotine1.png"
              alt="Bands refusing a vape before nicotine use begins"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 2: Curiosity</h2>

          <p>
            You take that first ever hit and immediately begin coughing.
          </p>

          <p>
            The experience may not even feel enjoyable, but it becomes memorable.
            For a while, you continue with your day and assume it meant nothing.
          </p>

          <p>
            Then a stressful moment arrives.
          </p>

          <p>
            You begin looking for quick relief, whether that's scrolling, porn, or... vaping. That earlier hit crosses your
            mind. You remember the temporary escape more than the coughing or
            discomfort.
          </p>

          <p>
            This is where curiosity can turn into repetition.
          </p>

          <p>
            You face a choice: replace the urge with something healthier, or
            convince yourself that one more hit will not matter and relieve you in the moment.
          </p>

          <p>
            The best option is to choose a replacement before the next stressful moment appears. Take
            a walk, exercise, call somebody, step outside, shower, write, or begin
            a task that fully takes up all your attention.
          </p>

          <blockquote>
            A craving becomes more powerful when your mind believes nicotine is
            the only available escape.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 3: “Only Every Now and Then”</h2>

          <p>
            At this level, nicotine is only hit in certain situations.
          </p>

          <p>
            You might vape at parties, during late-night hangouts, while
            drinking, or whenever somebody else offers it.
          </p>

          <p>
            In your mind, this proves you are in control because you do not own
            a device and do not use nicotine every day.
          </p>

          <p>
            The danger is that repeated social use makes the behavior feel more
            normal. The line between a special occasion and a regular excuse
            begins to disappear.
          </p>

          <p>
            This level is often connected to other triggers, including alcohol,
            weed, boredom, stress, and social pressure.
          </p>

          <p>
            The best move is to stop accepting nicotine from other people and
            temporarily remove yourself from the environments where you use it
            the most.
          </p>

          <p>
            Even one or two weeks away from those situations can show you how
            strongly those environments were influencing your choices.
          </p>

          <blockquote>
            “Only sometimes” becomes dangerous when those situations keep on
            happening.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 4: You Buy Your Own</h2>

          <p>
            This is where the habit changes dramatically.
          </p>

          <p>
            You no longer depend on friends. Nicotine is now available whenever
            you want a hit.
          </p>

          <p>
            Accessibility removes the pause that once existed between the urge
            and the action.
          </p>

          <p>
            Instead of waiting for a party or asking somebody else, you reach
            into your pocket and immediately get the reward.
          </p>

          <p>
            Usage begins increasing because the device is constantly nearby. You
            may also begin experimenting with other nicotine products because
            they appear different, easier, and even more socially acceptable.
          </p>

          <p>
            The strongest move at this stage is to remove ownership completely.
            Throw the vape away and do not think about owning a back up.
          </p>

          <p>
            If you hesitate, that hesitation tells you the device already has
            more control than you want to admit.
          </p>

          <blockquote>
            Easy access turns occasional use into automatic use.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-nicotine-addiction/nicotine2.png"
              alt="Bands buying his own vape and making nicotine constantly accessible"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 5: “I Am Not Addicted”</h2>

          <p>
            At this stage, denial begins to protect the habit.
          </p>

          <p>
            You tell yourself that you only use nicotine on certain occasions,
            but those occasions don't stop popping up because now it includes boredom, stress, waking up, driving,
            working, studying, and even relaxing.
          </p>

          <p>
            You may begin delaying important tasks because vaping feels easier
            than starting something difficult.
          </p>

          <p>
            Friends or family might express concern, but you dismiss them because
            admitting the truth would require a major lifestyle change.
          </p>

          <p>
            You also start noticing that you feel worse without nicotine. You
            become restless, irritated, distracted, or mentally uncomfortable
            until you use it again. Life without it is starting to seem impossible.
          </p>

          <p>
            So now what? Throwing your vapes away can still work, but many people panic,
            replace the device hours later, and feel way less confident.
          </p>

          <p>
            If immediate removal continues to fail, begin tracking and reducing
            your usage. Count how often you use nicotine in a day, delay each session,
            and place the device somewhere inconvenient between uses.
          </p>

          <p>
            The purpose is not to create a permanent compromise with the
            addiction. It is to weaken the automatic pattern while building
            toward complete removal.
          </p>

          <blockquote>
            You cannot regain control over a behavior you refuse to measure
            with full honesty.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Level 6: Nicotine Controls Your Day</h2>

          <p>
            At this level, nicotine is no longer just something you do.
          </p>

          <p>
            It affects your mood, attention, schedule, spending, and ability to
            sit through ordinary parts of the day.
          </p>

          <p>
            You may constantly look for opportunities to step away at school or
            work. You might even feel unable to focus without the use of nicotine first.
          </p>

          <p>
            The habit becomes expensive, but the individual purchases happen so
            frequently that you stop noticing the total spent.
          </p>

          <p>
            Review your bank or credit-card history and calculate how much you
            have spent on nicotine.
          </p>

          <p>
            Do not do this to shame yourself. Do it because numbers make the
            habit difficult to minimize.
          </p>

          <p>
            Study the rest of the pattern too. Write down when you use nicotine,
            what you were feeling beforehand, and how you felt afterward.
          </p>

          <p>
            At this point, professional support becomes a serious option rather
            than something to dismiss. Speaking with a medical professional or
            a trusted person can help you stop fighting the problem in secrecy.
          </p>

          <blockquote>
            When nicotine controls your mood and schedule, treating it like a
            harmless habit is no longer being honest to yourself.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/the-7-levels-of-nicotine-addiction/nicotine3.png"
              alt="Bands calculating the financial and daily cost of nicotine addiction"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Level 7: Addiction</h2>

          <p>
            At the final level, you may feel like you have already been defeated.
          </p>

          <p>
            You have promised yourself that you would quit so many times, only to
            return to the same habit every single time.
          </p>

          <p>
            Eventually, giving in can feel easier than experiencing another
            failed attempt.
          </p>

          <p>
            Nicotine may shape your mornings, breaks, spending, mood, and ability
            to feel normal. You are no longer using it for enjoyment. You are
            using it to quiet the urge created by dependence.
          </p>

          <p>
            This is not proof that change is impossible. It is proof that the
            problem has grown beyond casual advice and private promises.
          </p>

          <p>
            Talk to a qualified professional or somebody you deeply trust. Be
            direct about how often you use nicotine, how many times you have
            tried to quit, and what happens when you stop.
          </p>

          <p>
            Remove the secrecy. Create accountability. Accept help instead of
            waiting for one perfect burst of motivation.
          </p>

          <blockquote>
            Reaching the worst level does not mean you are beyond recovery. It
            means you need to find a stronger response than the addiction itself.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>How to Begin Reversing the Levels</h2>

          <p>
            Escaping nicotine does not always happen through one dramatic
            decision.
          </p>

          <p>
            For some people, removing every device immediately is the correct
            move. Others need more structure, support, and a deliberate
            reduction plan in order to escape.
          </p>

          <p>
            Begin by making the habit visible.
          </p>

          <p>
            Track when you use nicotine, what triggered it, how much you spend,
            and which situations create the strongest urges for you.
          </p>

          <p>
            Then reduce access. Stop carrying backups, remove devices from your
            bedroom, avoid the environments where you use nicotine most, and
            tell other people not to offer it to you.
          </p>

          <p>
            Replace the routine. If nicotine usually follows stress, boredom,
            driving, drinking, or socializing, choose another response before
            the trigger appears again.
          </p>

          <p>
            Finally, involve other people. Addiction becomes harder to defend
            when somebody else knows what you are trying to change.
          </p>

          <blockquote>
            You do not escape all seven levels at once. You reverse those small
            decisions that once built them.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Common Mistakes</h2>

          <p>
            - Waiting until the addiction becomes unbearable before taking it
            seriously.
          </p>

          <p>
            - Keeping a vape nearby while claiming you are trying to quit.
          </p>

          <p>
            - Continuing to spend time in the exact environments that trigger
            nicotine use.
          </p>

          <p>
            - Replacing vaping with another destructive source of stimulation.
          </p>

          <p>
            - Hiding failed attempts from everybody and trying to solve the
            problem completely alone.
          </p>

          <p>
            - Treating one relapse as proof that quitting is impossible.
          </p>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>
            The entire addiction can begin with one hit that appears not to
            matter.
          </p>

          <p>
            That is why recognizing your current level matters. The earlier you
            interrupt the pattern, the easier it is to prevent nicotine from
            becoming part of your daily life.
          </p>

          <p>
            If you saw yourself somewhere in these levels, do not wait until the
            consequences become way worse.
          </p>

          <p>
            This is not only about nicotine. It is about protecting your ability
            to make decisions without a habit slowly stealing your freedom.
          </p>

          <p>
            If you are trying to quit, stay patient and take the process
            one day at a time. Getting through it is something future you will be proud of.
          </p>

          <blockquote>
            The first hit may feel small, but so does the first decision that
            begins taking your life back.
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
            navigate("/articles/how-to-get-addicted-to-not-using-your-phone")
          }
        >
          <span>Next Article</span>

          <h3>How to Get Addicted to Not Using Your Phone</h3>

          <p>
            Learn how to retrain your brain, interrupt automatic scrolling, and
            turn your phone back into a tool instead of a constant distraction.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video11Article;