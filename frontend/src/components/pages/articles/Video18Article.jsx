import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackEvent } from "../../../utils/analytics";

function Video18Article() {
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
          source: "article_18",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "article_18",
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

          <p className="article-date">July 29, 2026</p>

          <h1>How to Get Addicted to Building Muscle</h1>

          <p className="article-subtitle">
            Six mental shifts that can make building muscle feel addictive through
            turning every workout into another level.
          </p>

          <a
            className="article-video-link"
            href="https://youtu.be/0VnhSGCGbvE"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent("article_video_clicked", {
                page: window.location.pathname,
                metadata: {
                  article: "video_18",
                  video_title: "How to Get Addicted to Building Muscle",
                },
              })
            }
          >
            <span className="yt-icon">▶</span>
            Watch on YouTube
            <span className="article-link-arrow">↗</span>
          </a>
        </header>

        <section className="article-section">
          <h2>Introduction</h2>

          <p>
            Some people genuinely cannot get enough of going to the gym, while
            others struggle just to make it out of the house.
          </p>

          <p>
            It is easy to assume that the key difference between those people is discipline.
            It's easy to believe that consistent people simply have more willpower,
            motivation, or natural drive than you do.
          </p>

          <p>
            But discipline is only one small part of the equation. The bigger
            difference is how each person views the process.
          </p>

          <p>
            When training feels like a punishment, you have to force yourself
            to keep going because consistency will always feel difficult. But when training
            becomes part of your identity, each workout starts feeling like
            another opportunity to level up.
          </p>

          <p>
            These six shifts are designed to help you stop treating the gym like
            a boring task and instead view it as a game you genuinely want to
            keep playing.
          </p>
        </section>

        <section className="article-section">
          <h2>How to Use This Guide</h2>

          <p>
            Do not try to force all six shifts into your life all at the same time.
          </p>

          <p>
            Read through each section and identify which shift is currently
            missing from your current training regime.
          </p>

          <p>
            You might already enjoy challenging workouts but have no deeper
            reason to remain consistent. You might have a powerful reason to
            train but an environment that constantly pulls you away from it.
          </p>

          <p>
            Seriously become aware of your current flaws in the system. 
            Start with the shift that solves your biggest current problem, then
            gradually build the others around it.
          </p>

          <blockquote>
            The goal is not to become obsessed with the gym overnight. The goal
            is to build a relationship with training that will grow stronger over
            time.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 1: Become the Main Character</h2>

          <p>
            If you have struggled to consistently go to the gym, you may be
            playing the wrong game.
          </p>

          <p>
            You scroll through social media and see people with better
            physiques, more confidence, and years of progress ahead of you.
            Yet without realizing it, you begin comparing the first level of your
            journey to someone else&apos;s own progress.
          </p>

          <p>
            That comparison means you view yourself as a background character in someone else's story.
          </p>

          <p>
            Instead of measuring yourself against people who started years
            before you, start looking at yourself as the main character of your
            own story.
          </p>

          <p>
            Great characters are not interesting because they begin the story
            completely maxed out. They are interesting because we get to watch
            them struggle, improve, fail, adjust, and eventually grow into someone
            unrecognizable.
          </p>

          <p>
            Your starting point should never make your story embarrassing. Your
            starting point instead is what gives the story somewhere to go.
          </p>

          <blockquote>
            Stop asking how you compare to everyone else. Start asking what the
            next level of your own character looks like.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 2: Stop Chasing the Physique</h2>

          <p>
            Your ideal physique can give you direction, but it cannot be the
            sole reason to why you train.
          </p>

          <p>
            When you only focus on the final result, every passing day then makes you
            feel behind. You look in the mirror, do not see the finished version
            of yourself, and assume the work is just not paying off.
          </p>

          <p>
            Building muscle does not happen through one dramatic
            transformation. It happens through hundreds of small stages that
            rarely feel impressive while you are experiencing them.
          </p>

          <p>
            You add one repetition, your form improves slightly, you train on a
            day that you would normally stay home, you recover better. then you
            finally increase the weight.
          </p>

          <p>
            None of these moments look like the final destination, but every one
            of them moves you closer.
          </p>

          <p>
            Falling in love with the process means learning to value these small
            wins instead of only respecting yourself once the entire journey is
            complete.
          </p>

          <blockquote>
            The physique is the destination. The process is the game you have
            to enjoy playing.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 3: Every Workout Needs an Enemy</h2>

          <p>
            A video game level without enemies would become boring almost
            immediately.
          </p>

          <p>
            You would walk directly to the goal post, move on to the next
            level, and never develop any of the skills needed to defeat the
            final boss.
          </p>

          <p>
            Training works the same way because resistance is not there to stop your
            progress... it's what creates it.
          </p>

          <p>
            Every workout should have something that challenges you. It
            could be one more repetition, better technique, heavier weights, a
            shorter resting period, or simply completing a workout you were going to avoid entirely.
          </p>

          <p>
            Without a challenge, you are only repeating movements... mindlessly. With a
            challenge though, you are trying to defeat something that previously got
            the best of you.
          </p>

          <p>
            That is when training grows exciting. You are no longer going to
            the gym only to build muscle. You are returning to finish unfinished
            business.
          </p>

          <blockquote>
            Give each workout one clear enemy to defeat.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 4: Hard Means You&apos;re Winning</h2>

          <p>
            Most people treat difficulty like a warning sign.
          </p>

          <p>
            Once a workout becomes painful, a weight refuses to move, or
            progress starts slowing down, they assume something has gone wrong.
          </p>

          <p>
            But facing difficulty does not automatically mean you are failing. Often,
            it means you have finally reached something capable of making you
            stronger.
          </p>

          <p>
            A failed repetition can expose weak form. A stalled lift can
            expose poor recovery. A difficult workout can show you that your
            mindset gives up before your body actually needs to.
          </p>

          <p>
            Each attempt gives you information your previous attempts could not.
            You return with a better strategy, stronger form, more experience,
            and a clearer understanding of what needs to change.
          </p>

          <p>
            Hard things do not become addictive because they feel fun in the
            moment. They become addictive because overcoming something that
            once defeated you is one of the most rewarding feelings you can
            experience.
          </p>

          <blockquote>
            Difficulty does not mean you should just stop. Sometimes it is
            proof that you finally found the next level.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 5: Make It Impossible to Quit</h2>

          <p>
            Little do you know your environment is influencing your habits long before motivation
            ever gets a chance to.
          </p>

          <p>
            If your room is designed around gaming, scrolling, television, and
            comfort, those will naturally become the easiest actions to pursue.
          </p>

          <p>
            If going to the gym requires you to find your clothes, pack your
            bag, decide on a workout, charge your headphones, and convince
            yourself to leave the house, skipping the gym then becomes a no brainer.
          </p>

          <p>
            The solution is not to constantly fight your environment... but to redesign it.
          </p>

          <p>
            Set out your gym clothes right before bed. Pack your gym bag ahead of time. Plan
            your workout the night before. Train with someone who expects you to
            show up. Put your workout directly into your daily schedule. These are just a few things you can do
            to redesign your environment.
          </p>

          <p>
            Every piece of friction you remove makes the right decision easier.
            Every obstacle you add to your bad habits makes quitting slightly
            harder.
          </p>

          <blockquote>
            Make going to the gym the easiest path for you to take.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Shift 6: Build a Why Bigger Than Motivation</h2>

          <p>
            The first five shifts can help you enjoy training, embrace
            challenges, build your identity, and create a stronger environment.
          </p>

          <p>
            But none of them answer the most important question:
          </p>

          <blockquote>Why are you playing this game in the first place?</blockquote>

          <p>
            Motivation can feel powerful, but it's only temporary. Some days you
            will feel inspired, confident, and ready to train. While other days you
            will feel tired, distracted, and completely uninterested.
          </p>

          <p>
            So your why gives you a reason to keep pressing start... even on the rough days.
          </p>

          <p>
            Maybe you spent years feeling uncomfortable in your body. Maybe you
            want to prove to yourself that you can finally finish something.
            Maybe you want to become stronger for the people who depend on you.
            Maybe training represents the person you promised yourself you
            would become.
          </p>

          <p>
            Your reason does not have to impress anyone else. It only needs to
            mean enough to you that quitting feels more painful than continuing.
          </p>

          <blockquote>
            You do not show up because you always feel motivated. You show up
            because training supports the person you want to become.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>How to Find Your Why in 5 Steps</h2>

          <p>
            A powerful why is not found from a motivational quote or a vague statement
            about wanting to become better.
          </p>

          <p>
            It should be personal, specific, emotional, and connected to the
            identity you are trying to build.
          </p>
        </section>

        <section className="article-section">
          <h2>Step 1: Identify What You Are Tired Of</h2>

          <p>
            Strong reasons often begin with something you no longer want to
            tolerate within yourself.
          </p>

          <p>
            Think about the moments that made you want to change in the first
            place. Maybe it's feeling uncomfortable taking your shirt off. Maybe you
            hate looking at yourself in pictures. Maybe you are tired of feeling weak,
            insecure, or disappointed in your own effort.
          </p>

          <p>
            Do not use that pain to hurt your self image. Use it as evidence that
            your current situation matters enough to change.
          </p>

          <blockquote>
            What part of your current life are you no longer willing to
            accept?
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 2: Decide Who You Are Becoming</h2>

          <p>
            Avoid making your goal just about losing weight, gaining muscle, or
            reaching a certain number on the scale.
          </p>

          <p>
            Instead, describe the person those results would require you to
            become.
          </p>

          <p>
            Maybe you want to become someone who always keeps promises to himself.
            Someone who does difficult things with no validation from others. Someone who takes
            care of his body. Someone who can be relied on when life becomes
            difficult.
          </p>

          <p>
            Physical goals are easier to abandon than identities. Once training
            becomes part of who you are, skipping no longer feels like missing
            one workout. It feels like acting against the person you are
            building.
          </p>

          <blockquote>
            Do not only define the body you want. Define the person that's capable of
            building it.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 3: Connect It to Something Emotional</h2>

          <p>
            A logical reason can explain why training is useful yet an emotional
            reason is what helps you act when you do not feel like it.
          </p>

          <p>
            Your why might connect to your family, your confidence, a difficult
            period of your life, a promise you made, or the fear of wasting your own
            potential.
          </p>

          <p>
            The emotion does not need to be negative. You might train because
            you want to know what your body is capable of, compete in an
            event, inspire someone close to you, or remain healthy enough to
            enjoy a long lasting life.
          </p>

          <blockquote>
            What emotion would make this goal impossible for you to ignore?
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 4: Turn It Into One Clear Statement</h2>

          <p>
            Your why should be easy to remember even when motivation disappears.
          </p>

          <p>
            Avoid writing out an entire page that you will never read again. Reduce
            your reason to one clear statement that connects your training directly with
            your identity.
          </p>

          <p>
            One Sentence Examples:
          </p>

          <p>
            I train because I refuse to keep breaking promises to myself.
          </p>

          <p>
            I train because I want to become physically and mentally dependable
            for the people I care about.
          </p>

          <p>
            I train because building my body proves that I can build the rest of
            my life as well.
          </p>

          <blockquote>
            Your why should be short enough to remember but powerful enough to
            matter.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Step 5: Keep Your Why Visible</h2>

          <p>
            A reason you never see will slowly be forgotten.
          </p>

          <p>
            Put your statement somewhere connected to your routine. Add it to
            your phone wallpaper, notes app, gym journal, bathroom mirror, desk,
            or even the header of your workout plan.
          </p>

          <p>
            Read it before difficult workouts and revisit it whenever you feel
            consistency beginning to fall apart.
          </p>

          <p>
            Your reason will also likley change over time. You may begin training
            because you feel insecure, but it's evolved because you discovered that
            you love becoming stronger in general.
          </p>

          <p>
            Review your why every month and make sure it still reflects the
            person you are trying to become.
          </p>

          <blockquote>
            Your why should evolve as you do.
          </blockquote>
        </section>

        

        <section className="article-section">
          <h2>Build-Your-Why Exercise</h2>

          <p>
            Write your answers to these questions somewhere you can repeatedly return to:
          </p>

          <p>
            What am I tired of experiencing?</p>

          <p>
            Who am I trying to become?
          </p>

          <p>
            Why does becoming that person matter to you emotionally?
          </p>

          <p>
            Who else will benefit if I follow through?
          </p>

          <p>
            What will my life look like if I keep giving up?
          </p>

          <p>
            What will my life look like if I remain consistent for just one year?
          </p>

          <p>
            What one sentence summarizes why I train?
          </p>

          <blockquote>
            Do not search for the most impressive answer. Search for the answer
            that feels impossible to lie about.
          </blockquote>
        </section>

        <section className="article-section">
          <h2>Common Mistakes</h2>

          <p>
            - Depending on motivation instead of creating a repeatable routine.
          </p>

          <p>
            - Comparing your starting point to someone else&apos;s finished
            physique.
          </p>

          <p>
            - Training with no plan or goal in mind.
          </p>

          <p>
            - Treating difficult workouts as evidence that you are failing.
          </p>

          <p>
            - Keeping distractions visible while your gym preparation stays
            inconvenient.
          </p>

          <p>
            - Choosing a reason that sounds impressive but means nothing to you.
          </p>

          <p>
            The gym becomes addictive when these six shifts begin supporting
            one another. So that the hard work feels automatic.
          </p>
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
            Understanding these six shifts can change how you think about
            building muscle, but consistency truly depends on how your daily
            life is actually structured.
          </p>

          <p>
            The Routine helps you organize your workouts, priorities, deep work,
            meals, commitments, breaks, and recovery into one realistic daily
            plan.
          </p>

          <div
            className="article-next-card"
            onClick={() => {
              trackEvent("article_system_clicked", {
                page: window.location.pathname,
                metadata: {
                  article: "video_18",
                  system: "the_routine",
                },
              });

              navigate("/systems/routine");
            }}
          >
            <span>Free System</span>

            <h3>The Routine</h3>

            <p>
              Build a realistic daily schedule around your goals, priorities,
              commitments, training, and recovery.
            </p>

            <span className="next-arrow">Build Your Routine →</span>
          </div>
        </section>

        <div
          className="article-next-card"
          onClick={() => {
            trackEvent("article_next_clicked", {
              page: window.location.pathname,
              metadata: {
                current_article: "video_18",
                next_article: "video_17",
              },
            });

            navigate("/articles/how-to-get-out-of-a-rut");
          }}
        >
          <span>Next Article</span>

          <h3>How to Get Out of a Rut in 7 Days</h3>

          <p>
            Follow a simple seven-day framework to rebuild momentum, escape the
            cycle, and begin moving forward again.
          </p>

          <span className="next-arrow">Read Article →</span>
        </div>
      </article>
    </main>
  );
}

export default Video18Article;