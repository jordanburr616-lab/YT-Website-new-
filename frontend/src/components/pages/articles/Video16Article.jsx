import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video16Article() {
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
          source: "article_16",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_16",
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

          <p className="article-date">
            July 1, 2026
          </p>

          <h1>Why You Care So Much What People Think (And How to Stop)</h1>

          <p className="article-subtitle">
            A deeper breakdown on why judgment controls so many people and
            the realizations that help you prevent others opinions from ruining
            your life.
          </p>

          <a
            className="article-video-link"
            href="https://www.youtube.com/watch?v=ILbDe687Fpk"
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
            Have you ever replayed a conversation over and over in your head,
            wondering if you said something totally embarrassing? Or maybe you&apos;ve
            stayed quiet your entire life because you&apos;re afraid of people&apos;s judgement.
            Or maybe you&apos;ve even changed the way you dressed, acted, or spoke
            just to fit in.
          </p>

          <p>If so, you&apos;re not alone.</p>

          <p>
            Everyone has experienced the fear of judgement at some
            point or another. The problem is that many people spend their entire lives
            trapped in this cycle without ever understanding what&apos;s actually
            causing it. So living this way begins to feel normal.
          </p>

          <p>
            The good news is that this isn&apos;t a personality flaw. There are real
            reasons why your brain works this way, and once you understand them,
            it becomes much easier to break free from other people&apos;s opinions.
          </p>
        </section>

        <section className="article-section">
          <h2>Why It Feels So Hard to Quit Caring</h2>

          <p>
            I want you to Imagine a kid growing up with his own interests, opinions, and dreams.
          </p>

          <p>
            He's young and completely unaware of the world around him so he says what he thinks, 
            enjoys what he enjoys, and doesn&apos;t spend much
            time worrying about how other people see him.
          </p>

          <p>Then one day, someone makes a comment.</p>

          <p>
            Maybe it&apos;s a comment about his appearance. Maybe it&apos;s something he
            said in class. Whatever it is, the room joins in. Suddenly, something
            changes.
          </p>

          <p>
            Instead of asking himself what he enjoys, he starts asking what
            everyone else expects from him.
          </p>

          <p>
            Little by little, he changes. He dresses differently. He hides parts
            of his personality. He starts agreeing with the crowd because fitting
            in feels safer than standing out.
          </p>

          <p>
            Most of us never realize how often this happens throughout our lives.
            We slowly trade pieces of our authentic selves just for a slice of approval,
            convincing ourselves it&apos;s simply “how the world works.”
          </p>

          <p>But it doesn&apos;t have to stay this way.</p>

          <div className="article-image">
            <img
              src="/images/articles/why-you-care-so-much/care1.png"
              alt="Bands being laughed at in class"
            />
          </div>
        </section>

        <section className="article-section">
          <h2>The Three Reasons We Care So Much</h2>

          <div className="article-subsection">
            <h3>1. Your Brain Was Built for Survival</h3>

            <p>
              Thousands of years ago, being accepted to a tribe wasn&apos;t just
              nice to have, it was necessary for survival.
              Being rejected could mean losing protection, resources, or even
              your chance to find a future partner.
            </p>

            <p>
              So over time, our brains evolved to crave acceptance and avoid rejection.
            </p>

            <p>
              The problem is that while society has changed dramatically, our
              brains haven&apos;t quite caught up to speed.
              You&apos;re probably not fighting to survive in the wilderness anymore,
              yet your mind still treats every social rejection like it&apos;s a real threat.
              That&apos;s why public speaking feels terrifying, criticism sticks with
              you for days, and embarrassment can feel much bigger than it really is.
            </p>

            <p>Caring what people think isn&apos;t a weakness. It&apos;s human nature.</p>

            
          </div>

          <div className="article-subsection">
            <h3>2. Your Brain Loves Validation</h3>

            <p>
              Every compliment, like, and person who agrees with you gives your
              brain a small reward.
            </p>

            <p>At first, there&apos;s nothing wrong with that.</p>

            <p>
              The problem begins when you depend on validation instead of simply
              just appreciating it. Instead of asking yourself what you want to say, 
              you begin to put what everyone else wants to hear first.
            </p>

            <p>
              So you stop sharing opinions that might be unpopular. You apologize
              even when you&apos;ve done nothing wrong. You avoid conflict because
              you&apos;re afraid people won&apos;t like you anymore.
            </p>

            <p>This is what we like to call, people pleasing.</p>

            <p>
              The more approval you chase, the more control other people have
              over your decisions.
            </p>

          </div>

          <div className="article-subsection">
            <h3>3. Modern Society Never Stops Comparing</h3>

            <p>
              For most of human history, people compared themselves to the small
              community they are surrounded by.
            </p>

            <p>
              But in today's world, we&apos;re connected to millions of people every single day.
              Every time you open social media, you&apos;re exposed to people who
              appear richer, stronger, more attractive, more successful, or
              further ahead in life.
            </p>

            <p>
              Even if you don&apos;t notice it, your brain is constantly keeping score.
            </p>

            <p>
              Who&apos;s making more money? Who&apos;s in the happiest relationship?
              Who&apos;s accomplishing more?
            </p>

            <p>
              The problem is that you&apos;re comparing your everyday life to someone
              else&apos;s own highlight reel.
              You rarely see their failures, setbacks, or the years of work
              that happened behind the scenes. The more time you spend studying everyone else&apos;s life, the less
              time you spend building your own.
            </p>

            <div className="article-image">
              <img
              src="/images/articles/why-you-care-so-much/care2.png"
              alt="Bands being laughed at in class"
              />
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>Three Realizations That Will Set You Free</h2>

          <p>Understanding why you care is important. 
            But understanding just that alone won&apos;t change your life.</p>

          <p>
            These three realizations are what actually help you detach from other people&apos;s opinions.
          </p>

          <div className="article-subsection">
            <h3>Realization #1: Most People Are Too Busy Worrying About Themselves</h3>

            <p>
              When you&apos;re at the gym, eating at a restaurant, or walking into a
              social event, it often feels like everyone is paying attention to you.
              Your mind creates these scenarios in your head when in reality, 
              they&apos;re usually thinking about themselves.
            </p>

            <p>
              They&apos;re wondering if they look awkward. They&apos;re hoping people like
              them. They&apos;re worried they&apos;ll say the wrong thing at the wrong time.
            </p>

            <p>The exact same fears you&apos;re experiencing.</p>

            <p>
              Psychologists call this the <strong>Spotlight Effect</strong>, which is our
              tendency to believe people notice us far more than they actually do.
              So the next time you catch yourself worrying about being judged,
              remember this:
            </p>

            <blockquote>
              People aren&apos;t paying nearly as much attention to you as you think
              they are.
            </blockquote>

            <p>
              And even if they do notice something, they&apos;ll probably forget about
              it by tomorrow.
            </p>

          </div>

          <div className="article-subsection">
            <h3>Realization #2: You Will Never Please Everybody</h3>

            <p>No matter what you do, someone will disagree with you.</p>

            <p>Someone will misunderstand you.</p>

            <p>Someone will criticize you.</p>

            <p>Trying to make everyone happy is a game you&apos;ll never win.</p>

            <p>
              Ironically, the people we admire most aren&apos;t the ones who please
              everyone. They&apos;re the people who have their own opinions, their own
              personality, and the confidence to stand behind both those attributes.
              They aren&apos;t pretending to be someone else. They&apos;re simply being themselves.
            </p>

            <p>
              The moment you stop trying to earn everyone&apos;s approval is the
              moment you begin becoming someone worth remembering.
            </p>

          </div>

          <div className="article-subsection">
            <h3>Realization #3: Growth Requires Judgment</h3>

            <p>Want to start a business? Someone will question you.</p>

            <p>Want to go to the gym? Someone will tell you it won&apos;t last.</p>

            <p>Want to post videos online? Someone will call it cringe.</p>

            <p>But criticism is just part of the process.</p>

            <p>
              Many people think judgment is proof they&apos;re doing something wrong.
              When in reality, it&apos;s often proof they&apos;re doing something worth noticing.
              The most confident people aren&apos;t confident because nobody judges
              them. They&apos;re confident because they understand that criticism comes
              with putting yourself out there.
            </p>

            <p>Some criticism will help you improve. Some will be completely useless.</p>

            <p>
              The goal isn&apos;t to ignore every opinion. The goal is learning which
              opinions deserve your attention and which ones don&apos;t.
            </p>

            <div className="article-image">
              <img
              src="/images/articles/why-you-care-so-much/care3.png"
              alt="Bands being laughed at in class"
              />
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>Final Thoughts</h2>

          <p>You can&apos;t stop people from having opinions.</p>

          <p>But you can stop letting those opinions take the drivers seat of your life.</p>

          <p>
            Once you understand why your brain craves acceptance, why validation
            feels rewarding, and why comparison has become so common, something
            will start to change.
          </p>

          <p>
            You stop trying to impress everyone. You stop seeking constant
            approval. You stop making decisions based on what other people might think.
            And instead, you start building the life you actually want.
            The next time you catch yourself worrying about someone else&apos;s
            opinion, remember this:
          </p>

          <blockquote>
            Most people are far too busy worrying about themselves to spend much
            time thinking about you.
          </blockquote>

          <p>Now get back to building your own life.</p>
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

          <div
            className="article-next-card"
            onClick={() => navigate("/articles/the-7-stages-of-weight-loss")}
          >

            <span>Next Article</span>

            <h3>The 7 Stages of Weight Loss</h3>

            <p>
              Learn what actually happens during a weight loss journey...
            </p>

            <span className="next-arrow">
              Read Article →
            </span>

          </div>
      </article>
    </main>
  );
}

export default Video16Article;