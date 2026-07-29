import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { trackEvent } from "../../../utils/analytics";
import { usePageView } from "../../../hooks/usePageView";

import { generateDailyPlan } from "./routineProgram/routineLogic";
import { timeToMinutes } from "./routineProgram/timeHelpers";

const STORAGE_KEY = "routinePlanner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  function createTimeOptions() {
    const options = [];

    for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
      const hours24 = Math.floor(minutes / 60);
      const mins = minutes % 60;

      const value = `${String(hours24).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}`;

      const period = hours24 >= 12 ? "PM" : "AM";
      const hours12 = hours24 % 12 || 12;

      const label = `${hours12}:${String(mins).padStart(2, "0")} ${period}`;

      options.push({
        value,
        label,
      });
    }

    return options;
  }

  const TIME_OPTIONS = createTimeOptions();
  

function Routine() {

  const navigate = useNavigate();

  function handleBack() {
    trackEvent("routine_back_clicked", {
      page: window.location.pathname,
      metadata: {
        destination: "/systems",
      },
    });

    navigate("/systems");
  }

  usePageView("routine");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const defaultDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  const defaultFormData = {
    date: defaultDate,
    wakeTime: "07:30",
    bedTime: "23:30",
    goal: "",
    priority1: "",
    priority2: "",
    priority3: "",
    includeBreakfast: true,
    includeLunch: true,
    includeDinner: true,
    includeWorkout: true,
    includeDeepWork: true,
    includeWindDown: true,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [commitments, setCommitments] = useState([
    { title: "Work", start: "", end: "" },
  ]);
  const [dailyPlan, setDailyPlan] = useState(null);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const data = JSON.parse(saved);

        if (data.formData) {
          setFormData((prev) => ({ ...prev, ...data.formData }));
        }

        if (Array.isArray(data.commitments)) {
          setCommitments(data.commitments);
        }
      }
    } catch (error) {
      console.error("Could not load saved routine:", error);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ formData, commitments })
      );
    } catch (error) {
      console.error("Could not save routine:", error);
    }
  }, [formData, commitments, hasLoadedStorage]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCommitmentChange(index, field, value) {
    setCommitments((prev) =>
      prev.map((commitment, i) =>
        i === index ? { ...commitment, [field]: value } : commitment
      )
    );
  }

  function addCommitment() {
    setCommitments((prev) => [
      ...prev,
      { title: "", start: "", end: "" },
    ]);
  }

  function removeCommitment(index) {
    setCommitments((prev) => prev.filter((_, i) => i !== index));
  }

  function clearDay() {
    trackEvent("routine_cleared", {
      page: window.location.pathname,
    });

    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
    setCommitments([{ title: "Work", start: "", end: "" }]);
    setDailyPlan(null);
    setEmail("");
    setSignupStatus("");
  }

  function handlePrint() {
    trackEvent("routine_print_clicked", {
      page: window.location.pathname,
      metadata: {
        schedule_item_count: dailyPlan?.schedule?.length || 0,
      },
    });

    window.print();
  }

  function handleGenerateDailyPlan(e) {
    e.preventDefault();

    const plan = generateDailyPlan({
      date: formData.date,
      wakeTime: formData.wakeTime,
      bedTime: formData.bedTime,
      goal: formData.goal,
      priorities: [
        formData.priority1,
        formData.priority2,
        formData.priority3,
      ],
      commitments,
      includes: {
        breakfast: formData.includeBreakfast,
        lunch: formData.includeLunch,
        dinner: formData.includeDinner,
        workout: formData.includeWorkout,
        deepWork: formData.includeDeepWork,
        windDown: formData.includeWindDown,
      },
    });

    setDailyPlan(plan);

    if (plan.error) {
      trackEvent("routine_generate_failed", {
        page: window.location.pathname,
        metadata: {
          reason: "invalid_schedule",
        },
      });

      return;
    }

    trackEvent(dailyPlan ? "routine_updated" : "routine_generated", {
      page: window.location.pathname,
      metadata: {
        breakfast: formData.includeBreakfast,
        lunch: formData.includeLunch,
        dinner: formData.includeDinner,
        workout: formData.includeWorkout,
        deep_work: formData.includeDeepWork,
        wind_down: formData.includeWindDown,
        commitment_count: commitments.filter(
          (commitment) =>
            commitment.title?.trim() &&
            commitment.start &&
            commitment.end
        ).length,
        priority_count: [
          formData.priority1,
          formData.priority2,
          formData.priority3,
        ].filter((priority) => priority.trim()).length,
      },
    });
  }

  function formatPlanDate(dateString) {
    if (!dateString) return "";

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${dateString}T00:00:00`));
  }

  function formatDuration(minutes) {
    if (!minutes) return "0 min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr${hours === 1 ? "" : "s"}`;

    return `${hours} hr ${remainingMinutes} min`;
  }

  function getItemDuration(item) {
    if (
      typeof item.sortTime !== "number" ||
      typeof item.sortEnd !== "number"
    ) {
      return 0;
    }

    return Math.max(0, item.sortEnd - item.sortTime);
  }

  const wakeMinutes = timeToMinutes(formData.wakeTime);
  const bedMinutes = timeToMinutes(formData.bedTime);

  let awakeMinutes = bedMinutes - wakeMinutes;

  if (awakeMinutes <= 0) {
    awakeMinutes += 1440;
  }

  const sleepMinutes = 1440 - awakeMinutes;
  const hasSleepWarning = sleepMinutes < 390 || sleepMinutes > 480;

  const summary = dailyPlan
    ? dailyPlan.schedule.reduce(
        (totals, item) => {
          const duration = getItemDuration(item);

          if (item.title === "Deep Work Session") {
            totals.deepWork += duration;
          }

          if (item.title === "Workout") {
            totals.workout += duration;
          }

          if (
            commitments.some(
              (commitment) =>
                commitment.title?.trim() &&
                commitment.title.trim() === item.title &&
                commitment.start === item.rawStart &&
                commitment.end === item.rawEnd
            )
          ) {
            totals.commitments += duration;
          }

          return totals;
        },
        {
          sleep: sleepMinutes,
          deepWork: 0,
          workout: 0,
          commitments: 0,
        }
      )
    : null;

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
            source: "routine",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Signup failed");
        }

        trackEvent("email_signup", {
          page: window.location.pathname,
          metadata: {
            location: "routine_results",
            form: "routine_newsletter",
          },
        });

        setSignupStatus("Thank you for signing up!");
        setEmail("");
      } catch (error) {
        console.error(error);
        setSignupStatus("Something went wrong. Try again.");
      }
    }

  return (
    <main className="routine-page">
      <button
        type="button"
        className="routine-back no-print"
        onClick={handleBack}
      >
        ← Back to Systems
      </button>

      <section className="routine-hero no-print">
        <h1>The Routine</h1>
        <p className="routine-subtitle">
          Build your day in under 2 minutes
        </p>
      </section>

      <section className="routine-layout">
        <form
          className="routine-form no-print"
          onSubmit={handleGenerateDailyPlan}
        >
          <h2>Your Day</h2>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>

          <label>
            Wake Up Time
            <input
              type="time"
              name="wakeTime"
              value={formData.wakeTime}
              onChange={handleChange}
            />
          </label>

          <label>
            Bedtime
            <input
              type="time"
              name="bedTime"
              value={formData.bedTime}
              onChange={handleChange}
            />

            {hasSleepWarning && (
              <div className="sleep-warning">
                <strong>Check your sleep window.</strong>
                <p>
                  This schedule allows approximately{" "}
                  {(sleepMinutes / 60).toFixed(1)} hours of sleep. Sleep is
                  crucial for productivity, recovery, and focus. Aim for 6.5 to
                  8 hours each night.
                </p>
              </div>
            )}
          </label>

          <h2>Today's Goal</h2>

          <label>
            One main goal
            <input
              type="text"
              name="goal"
              placeholder=""
              value={formData.goal}
              onChange={handleChange}
            />
          </label>

          <h2>Top 3 Priorities</h2>

          <input
            type="text"
            name="priority1"
            placeholder="Priority 1"
            value={formData.priority1}
            onChange={handleChange}
          />

          <input
            type="text"
            name="priority2"
            placeholder="Priority 2"
            value={formData.priority2}
            onChange={handleChange}
          />

          <input
            type="text"
            name="priority3"
            placeholder="Priority 3"
            value={formData.priority3}
            onChange={handleChange}
          />

          <h2>Fixed Commitments</h2>

          {commitments.map((commitment, index) => (
            <div className="commitment-row" key={index}>
              <input
                type="text"
                placeholder="Work, class, appointment..."
                value={commitment.title}
                onChange={(e) =>
                  handleCommitmentChange(index, "title", e.target.value)
                }
              />

              <select
                value={commitment.start}
                onChange={(e) =>
                  handleCommitmentChange(index, "start", e.target.value)
                }
                aria-label={`${commitment.title || "Commitment"} start time`}
              >
                <option value="">Start time</option>

                {TIME_OPTIONS.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>

              <select
                value={commitment.end}
                onChange={(e) =>
                  handleCommitmentChange(index, "end", e.target.value)
                }
                aria-label={`${commitment.title || "Commitment"} end time`}
              >
                <option value="">End time</option>

                {TIME_OPTIONS.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>

              <button type="button" onClick={() => removeCommitment(index)}>
                Remove
              </button>
            </div>
          ))}

          {commitments.length === 0 && (
            <p className="commitment-empty">No fixed commitments added.</p>
          )}

          <button type="button" onClick={addCommitment}>
            Add Commitment
          </button>

          <h2>Include</h2>

          <p className="routine-section-description">
            Deep Work blocks are focused sessions used to make progress on your
            daily goal or top priorities, excluding workouts and fixed
            commitments.
          </p>

          <div className="routine-checks">
            <label>
              <input
                type="checkbox"
                name="includeBreakfast"
                checked={formData.includeBreakfast}
                onChange={handleChange}
              />
              Breakfast
            </label>

            <label>
              <input
                type="checkbox"
                name="includeLunch"
                checked={formData.includeLunch}
                onChange={handleChange}
              />
              Lunch
            </label>

            <label>
              <input
                type="checkbox"
                name="includeDinner"
                checked={formData.includeDinner}
                onChange={handleChange}
              />
              Dinner
            </label>

            <label>
              <input
                type="checkbox"
                name="includeWorkout"
                checked={formData.includeWorkout}
                onChange={handleChange}
              />
              Workout
            </label>

            <label>
              <input
                type="checkbox"
                name="includeDeepWork"
                checked={formData.includeDeepWork}
                onChange={handleChange}
              />
              Deep Work
            </label>

            <label>
              <input
                type="checkbox"
                name="includeWindDown"
                checked={formData.includeWindDown}
                onChange={handleChange}
              />
              Wind Down
            </label>
          </div>

          <div className="routine-actions">
            <button className="generate-button" type="submit">
              {dailyPlan ? "Update Plan" : "Generate Daily Plan"}
            </button>

            <button type="button" className="clear-button" onClick={clearDay}>
              Clear Day
            </button>
          </div>
        </form>

        {dailyPlan?.error && (
          <p className="routine-error">{dailyPlan.error}</p>
        )}

        <section
          className={`daily-plan-preview ${
            !dailyPlan || dailyPlan.error ? "daily-plan-empty" : ""
          }`}
        >
          {!dailyPlan || dailyPlan.error ? (
            <div className="plan-placeholder">
              <div className="placeholder-icon">✓</div>

              <h2>Your Daily Plan</h2>

              <p>Complete the form and generate your schedule.</p>

              <div className="placeholder-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <>
              <div className="plan-heading-row">
                <div>
                  <h2>Daily Plan</h2>
                  <p className="plan-date">
                    {formatPlanDate(dailyPlan.date)}
                  </p>
                </div>

                <button
                  type="button"
                  className="print-button no-print"
                  onClick={handlePrint}
                >
                  Print Plan
                </button>
              </div>

              <h3>Today's Goal</h3>
              <p>{dailyPlan.goal || "No goal entered."}</p>

              <h3>Today's Priorities</h3>

              <ul>
                {dailyPlan.priorities.length > 0 ? (
                  dailyPlan.priorities.map((priority, index) => (
                    <li key={index}>{priority}</li>
                  ))
                ) : (
                  <li>No priorities entered.</li>
                )}
              </ul>

              <h3>Daily Summary</h3>

              <div className="routine-summary">
                <div className="summary-item">
                  <span>Sleep</span>
                  <strong>{formatDuration(summary.sleep)}</strong>
                </div>

                <div className="summary-item">
                  <span>Deep Work</span>
                  <strong>{formatDuration(summary.deepWork)}</strong>
                </div>

                <div className="summary-item">
                  <span>Workout</span>
                  <strong>{formatDuration(summary.workout)}</strong>
                </div>

                <div className="summary-item">
                  <span>Commitments</span>
                  <strong>{formatDuration(summary.commitments)}</strong>
                </div>
              </div>

              <h3>Schedule</h3>

              <div className="schedule-list">
                {dailyPlan.schedule.map((item, index) => {
                  const nextItem = dailyPlan.schedule[index + 1];

                  const breakMinutes =
                    typeof item.sortEnd === "number" &&
                    typeof nextItem?.sortTime === "number"
                      ? nextItem.sortTime - item.sortEnd
                      : 0;

                  const showReset =
                    item.title === "Deep Work Session" &&
                    nextItem?.title === "Deep Work Session" &&
                    breakMinutes >= 15 &&
                    breakMinutes <= 30;

                  return (
                    <div key={`${item.title}-${item.sortTime ?? index}`}>
                      <div className="schedule-item">
                        <strong>{item.time}</strong>
                        <span>{item.title}</span>
                      </div>

                      {showReset && (
                        <div className="schedule-reset">
                          <span>{breakMinutes}-minute reset</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {dailyPlan.warnings?.length > 0 && (
                <div className="planner-notes">
                  <h3>Planner Notes</h3>

                  <ul>
                    {dailyPlan.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      </section>
      {dailyPlan && !dailyPlan.error && (
        <section className="routine-newsletter no-print">
          <h2>Your Plan Is Only the Beginning</h2>

          <p>
            Get new systems, videos, and practical self-improvement updates sent
            directly to you.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSignupSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Join</button>
          </form>

          {signupStatus && (
            <p className="routine-newsletter-status">
              {signupStatus}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

export default Routine;