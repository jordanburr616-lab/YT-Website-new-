import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video12Article() {
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
          source: "article_12",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_12",
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

          <p className="article-date">May 7, 2026</p>

          <h1>How to Get Addicted to Not Using Your Phone</h1>

          <p className="article-subtitle">
            Four practical steps for retraining your brain, breaking automatic
            scrolling habits, and turning your phone back into a tool instead
            of a constant distraction.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=7cdjkpQghl0"
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
            Let’s be honest, so many people struggle to go ten minutes without
            checking their phone.
          </p>

          <p>
            You always feel the need to remain in the loop with your friends, your
            crush, celebrities, current events, and whatever else typically appears on
            your feed.
          </p>

          <p>
            The urge to check for only a minute repeatedly gets the best of
            you. The real issue lies when that minute becomes ten, then thirty, till eventually
            another hour of your life disappears.
          </p>

          <p>
            You might believe this happens because you lack discipline. You
            search through plenty of YT videos about productivity, focus, dopamine, and
            phone addiction, only to find yourself in the exact same position.
          </p>

          <p>
            The deeper problem is not just a lack of discipline. It is the
            way your brain has been trained through years of repeated phone
            use.
          </p>

          <blockquote>
            You do not only have a discipline problem. You have a wiring
            problem.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Your Phone Has Become Automatic</h2>

          <p>
            Your phone takes up more time than you likely realize.
          </p>

          <p>
            It is not only present when you are bored. It appears during small
            moments throughout the entire day.
          </p>

          <p>
            It is in your hand while you eat, while you walk somewhere, while
            you wait in line, while you work, and even during moments when
            nothing is happening.
          </p>

          <p>
            You very rarely consciously decide to use it. The phone just leaves
            your pocket and appears in front of your face before you have even
            thought about what you are doing.
          </p>

          <p>
            Phones are not only just used for entertainment now. They have also become a
            way to regulate emotions.
          </p>

          <p>
            So when you feel bored, lonely, uncomfortable, stressed, or uncertain,
            the phone immediately gives your mind something else to remain distracted on.
          </p>

          <blockquote>
            The phone is no longer something you only use. It has become an
            automatic response to discomfort.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-addicted-to-not-using-your-phone/phone1.png"
              alt="Bands automatically reaching for his phone throughout the day"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Why Scrolling Feels So Normal</h2>

          <p>
            Society has made constant phone use appear completely normal in today's world.
          </p>

          <p>
            Look around the next time you are waiting in a coffee shop, standing
            in a line, driving, or sitting in a public space. Most people 
            immediately reach for their phones instead of sitting in silence.
          </p>

          <p>
            We feel pressure to remain updated on people we know, people we
            barely know, and celebrities who have no idea we actually do exist.
          </p>

          <p>
            Being caught up feels safer than sitting alone with just our
            thoughts.
          </p>

          <p>
            Most of us already are aware that our phones are affecting our
            attention, mood, sleep, productivity, and social skills. However,
            knowing that something is harmful does not automatically give us
            control over it.
          </p>

          <blockquote>
            Awareness matters, but awareness without any systems in place will rarely create
            any lasting changes.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>My Experience With Phone Addiction</h2>

          <p>
            I was not always fully aware of how much control my phone had over
            me.
          </p>

          <p>
            I would scroll well past my bedtime, watch things I knew I
            should not be watching, and waste time that should have gone toward
            the goals that truly mattered to me.
          </p>

          <p>
            This was not only a problem because of how I grew up. Phone addiction has
            remained an ongoing battle because deeply trained habits do not
            disappear easily.
          </p>

          <p>
            I could lift consistently, eat healthy, wake up early, and still
            feel the urge to check my phone whenever things got slightly
            uncomfortable.
          </p>

          <p>
            I checked it while I was busy. I checked it while I was working. I
            checked it while I should have been creating videos. I created so many
            excuses to run away from life.
          </p>

          <p>
            Eventually, I had to sit with the uncomfortable question:
          </p>

          <blockquote>
            What is actually controlling this behavior?
          </blockquote>

          <p>
            Once I understood what I was fighting, the process began to change.
            I stopped treating the issue like a character flaw and started
            treating it like a trained pattern that can gradually be retrained.
          </p>
        </section>

        <section className="article-section">
          <h2>The Real Enemy: Your Brain’s Training</h2>

          <p>
            The more you repeat a certain action, the more automatic that action will
            become.
          </p>

          <p>
            Every time you open an app, watch a short video, refresh a feed, or
            continue scrolling, your brain receives another message that this
            pathway is worth repeating.
          </p>

          <p>
            This relates to neuroplasticity, which is the brain’s ability to
            reorganize and adapt throughout your life.
          </p>

          <p>
            Your mind is not permanently hardwired. It continually changes in
            response to the actions, information, rewards, and environments you
            expose it to.
          </p>

          <p>
            That ability will open up the oppurtunity to improve, but it can also work against you.
            When you repeatedly choose fast and effortless stimulation, your
            mind becomes better at demanding fast and effortless stimulation. Simple.
          </p>

          <p>
            Yet eventually, your brain begins making decisions without stopping to
            ask what you actually want.
          </p>

          <blockquote>
            Your brain strengthens the pathways you repeatedly use, even when
            those pathways are damaging your life.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Fast Lanes and Slow Lanes</h2>

          <p>
            Scrolling trains your mind to prefer the fast lanes.
          </p>

          <p>
            Fast lanes provide immediate entertainment, immediate novelty, and
            immediate pleasure without requiring much effort.
          </p>

          <p>
            Slow lanes include reading, exercising, working, learning,
            socializing, creating, and pursuing goals whose rewards arrive
            later in life.
          </p>

          <p>
            The more time you spend in fast lanes, the less comfortable slow
            activities begin to feel.
          </p>

          <p>
            That is why sitting down to complete homework, create something meaningful,
            hold a conversation, or work toward a distant goal can feel
            unusually difficult after hours of scrolling beforehand.
          </p>

          <p>
            The solution is not to throw your phone away or even remove every enjoyable
            activity from your life.
          </p>

          <p>
            The solution is to deliberately spend more time in slower lanes so
            your brain can begin strengthening those pathways again.
          </p>

          <blockquote>
            You cannot retrain a fast mind while continuing to feed it constant
            speed.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-addicted-to-not-using-your-phone/phone2.png"
              alt="Bands moving from fast scrolling pathways toward slower intentional activities"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Before You Begin: Define Your Purpose</h2>

          <p>
            Before applying any of these steps I'm about to tell you, write down why you want to reduce
            your phone use.
          </p>

          <p>
            Maybe you want to regain your focus, build a better social presence,
            improve your sleep, complete more meaningful work, or finally give
            your goals the attention they deserve.
          </p>

          <p>
            Your reason needs to matter more than simply lowering a number on a
            screen-time report.
          </p>

          <p>
            Writing your reason down signals that this is a serious decision
            rather than another temporary burst of motivation.
          </p>

          <blockquote>
            A strong system works better when it is connected to something you
            genuinely care about.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 1: Add Friction</h2>

          <p>
            Right now, scrolling probably feels automatic because access is
            effortless.
          </p>

          <p>
            Your phone is constantly nearby. Your most-used apps remain in familiar
            locations, and opening them requires almost zero thought.
          </p>

          <p>
            So of course your brain will continue to choose the easiest option.
          </p>

          <p>
            Friction makes that option more difficult though. That additional
            difficulty creates a pause between the impulse and the action.
          </p>

          <p>
            That pause is super important because it gives you an opportunity to make an
            actual thoughtful choice.
          </p>

          <p>
            Begin by moving your most distracting apps away from their normal
            positions. Place them inside folders, remove them from your home
            screen, log out, or just delete them entirely.
          </p>

          <p>
            You can also grayscale your phone so the screen becomes less visually
            pleasing. Set app limits or use a stronger app-blocking tool if the
            ordinary limits are too easy to ignore.
          </p>

          <p>
            You can also disable settings such as "Raise to Wake" so accessing
            your phone requires another deliberate action.
          </p>

          <p>
            When possible, follow through with optional scrolling on a laptop instead of your phone.
            Social media is often less convenient and less immersive on a laptop than
            it is on a phone.
          </p>

          <blockquote>
            The goal is not to just quit overnight. The goal is to stop making
            distraction the easiest option.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 2: Replace the Behavior</h2>

          <p>
            Removing your phone without replacing the behavior creates a ton of empty
            space.
          </p>

          <p>
            When the urge eventually appears, your brain will search for
            something familiar. Without another option prepared, you will
            probably return back to the phone.
          </p>

          <p>
            People who successfully reduce their screen time usually have other
            activities available to occupy their attention.
          </p>

          <p>
            Choose three simple replacements that you can begin whenever an
            impulse appears.
          </p>

          <p>
            You could complete a few pushups, read several pages in a book, walk
            outside, clean part of your room, write something down, stretch, or
            begin a small task.
          </p>

          <p>
            These replacements should not require enormous amounts of motivation. They
            should be easy enough to begin before your mind has time to return
            to the old routine.
          </p>

          <p>
            Write your three replacements underneath your why that you wrote down
            earlier.
          </p>

          <blockquote>
            Don't just only remove the old behavior. Give your brain somewhere else
            to go.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-addicted-to-not-using-your-phone/phone3.png"
              alt="Bands replacing phone scrolling with exercise reading and walking"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>Step 3: Adjust Your Environment</h2>

          <p>
            Friction slows down a bad decision, but your environment influences
            which decisions will appear in the first place.
          </p>

          <p>
            When your phone remains visible on the corner of your desk, you won't stop thinking about it.
          </p>

          <p>
            When it sits beside your bed, checking it becomes one of your first
            actions in the morning as well as one of your final actions at night.
          </p>

          <p>
            So put your phone somewhere you cannot casually reach.
          </p>

          <p>
            Leave it in another room, place it beneath several books, put it
            inside a drawer, or use another location entirely that requires you to stand
            up and deliberately go get it.
          </p>

          <p>
            When the phone leaves your field of vision, your brain receives
            fewer reminders to check on it.
          </p>

          <p>
            One of the most important times to do this is right before bed.
          </p>

          <p>
            Keeping your phone away from your bed makes late-night scrolling
            more difficult and can also force you to get up in the morning if
            your phone alarm is placed across the room.
          </p>

          <blockquote>
            Your environment should make the correct behavior easier before your
            tired mind even gets a say.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>What Changes After the First Three Steps</h2>

          <p>
            Once you add friction, prepare replacement behaviors, and adjust
            your environment, something will start to shift.
          </p>

          <p>
            You create space to think, focus, and connect with other people
            again.
          </p>

          <p>
            You may notice how often your phone previously interrupted
            conversations, prevented you from sitting in silence, or allowed you
            to avoid developing your social skills.
          </p>

          <p>
            When your life contains meaningful work, activities, and people,
            mindless scrolling becomes less necessary as a source of escape.
          </p>

          <blockquote>
            Reducing phone use is not only about losing a distraction. It is
            about regaining space for a real life.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 4: Weaponize Your Phone</h2>

          <p>
            The final step is not to toss your phone into the trash.
          </p>

          <p>
            It is to stop using it on autopilot and begin using it with a better
            purpose.
          </p>

          <p>
            Your phone can remain a source of distraction, or it can become a
            tool that helps you communicate, learn, create, plan, and improve.
          </p>

          <p>
            Start by replacing some distracting apps with productive ones.
            Choose apps that help you read, learn, track habits, organize work,
            manage tasks, communicate intentionally, or build useful skills.
          </p>

          <p>
            The goal is not to fill your phone with fake productivity. The goal
            is to make intentional actions easier to access than endless
            scrolling.
          </p>

          <p>
            Next, study your screen time.
          </p>

          <p>
            Write down the total at the end of each day. Seeing the number
            repeatedly makes it harder to lie to yourself about how much time
            you are actually spending.
          </p>

          <p>
            When you choose to scroll, set a timer beforehand. You are still
            allowed to take breaks, but the timer creates a clear stopping point
            instead of allowing the session to continue with no set time to stop.
          </p>

          <blockquote>
            Your phone was built to be a tool. Use it deliberately enough that
            it becomes one again.
          </blockquote>

          <div className="article-image">
            <img
              src="/images/articles/how-to-get-addicted-to-not-using-your-phone/phone4.png"
              alt="Bands transforming his phone from a distraction into a useful tool"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>A Simple Phone Reset System</h2>

          <p>
            Use the following process whenever your scrolling begins to get out
            of control again.
          </p>

          <p>
            - Write down why reducing your phone use currently matters.
          </p>

          <p>
            - Remove distracting apps from their normal locations.
          </p>

          <p>
            - Turn on grayscale or activate a more useful app blocker.
          </p>

          <p>
            - Choose three easy replacement behaviors.
          </p>

          <p>
            - Put your phone outside your immediate reach while working.
          </p>

          <p>
            - Keep your phone away from your bed at night.
          </p>

          <p>
            - Track your screen time at the end of the day.
          </p>

          <p>
            - Use a timer whenever you intentionally choose to scroll.
          </p>

          <blockquote>
            You do not need a perfect detox. You need a repeatable system that
            interrupts the autopilot.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>This Will Not Be a Linear Process</h2>

          <p>
            Your brain will not completely reverse years of training within a
            few days.
          </p>

          <p>
            You will still have plenty of moments where you scroll longer than intended,
            ignore a timer, bypass a blocker, or reach for your phone without
            thinking.
          </p>

          <p>
            That does not mean the process has failed.
          </p>

          <p>
            Every time you add friction, replace an impulse, change your
            environment, or use your phone intentionally, you strengthen a
            different pathway.
          </p>

          <p>
            Repetition gradually makes slower and more intentional behaviors
            feel way more natural.
          </p>

          <p>
            The purpose is not to become someone who never enjoys technology.
            It is to become someone who can use technology without surrendering
            control over their attention.
          </p>

          <blockquote>
            Progress is every moment where you notice the impulse and choose
            what happens next.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>
            You are not permanently trapped by the way you currently use your
            phone.
          </p>

          <p>
            The same neuroplasticity that strengthened your scrolling habits
            can actually help you create new ones.
          </p>

          <p>
            Add friction so distraction is no longer effortless. Replace
            scrolling with simple intentional behaviors. Change your
            environment so the phone stops making decisions for you. Finally,
            transform the device into a tool that serves your goals.
          </p>

          <p>
            This process takes time, but remember that there is far more to life than
            endlessly consuming whatever appears next on your phone screen.
          </p>

          <blockquote>
            The goal is not to hate your phone. The goal is to stop letting it
            control your life.
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
          onClick={() => navigate("/articles/the-7-levels-of-nicotine-addiction")}
        >
          <span>Next Article</span>

          <h3>The 7 Levels of Nicotine Addiction</h3>

          <p>
            Understand the 7 stages of tobacco use and how to escape each level.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video12Article;