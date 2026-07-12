import { useState } from "react";

import { generateDailyPlan } from "./routineProgram/routineLogic";

function Routine() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const defaultDate = tomorrow.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: defaultDate,
    wakeTime: "07:30",
    bedTime: "23:00",
    goal: "",
    priority1: "",
    priority2: "",
    priority3: "",
    includeBreakfast: true,
    includeLunch: true,
    includeDinner: true,
    includeWorkout: true,
    includeDeepWork: true,
    includeBreaks: true,
    includeWindDown: true,
  });

  const [commitments, setCommitments] = useState([
    { title: "Work", start: "", end: "" },
  ]);

  const [dailyPlan, setDailyPlan] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCommitmentChange(index, field, value) {
    const updatedCommitments = [...commitments];
    updatedCommitments[index][field] = value;
    setCommitments(updatedCommitments);
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
        breaks: formData.includeBreaks,
        windDown: formData.includeWindDown,
        },
    });

    setDailyPlan(plan);
    }

  return (
    <main className="routine-page">
      <section className="routine-hero">
        <p className="eyebrow">The Routine</p>
        <h1>Build your day in under 2 minutes.</h1>
        <p>
          Create a simple Daily Plan that tells you what to do today instead of
          guessing your way through it.
        </p>
      </section>

      <section className="routine-layout">
        <form className="routine-form" onSubmit={handleGenerateDailyPlan}>
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
          </label>

          <h2>Today's Goal</h2>

          <label>
            One main goal
            <input
              type="text"
              name="goal"
              placeholder="Finish Round 3 edits"
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

              <input
                type="time"
                value={commitment.start}
                onChange={(e) =>
                  handleCommitmentChange(index, "start", e.target.value)
                }
              />

              <input
                type="time"
                value={commitment.end}
                onChange={(e) =>
                  handleCommitmentChange(index, "end", e.target.value)
                }
              />

              {commitments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCommitment(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addCommitment}>
            Add Commitment
          </button>

          <h2>Include</h2>

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
                name="includeBreaks"
                checked={formData.includeBreaks}
                onChange={handleChange}
              />
              Breaks
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

          <button className="generate-button" type="submit">
            Generate Daily Plan
          </button>
        </form>

        {dailyPlan?.error && (
          <p className="routine-error">{dailyPlan.error}</p>
        )}

        {dailyPlan && !dailyPlan.error && (
          <section className="daily-plan-preview">
            <h2>Daily Plan</h2>
            <p>{dailyPlan.date}</p>

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

            <h3>Schedule</h3>

            <div className="schedule-list">
              {dailyPlan.schedule.map((item, index) => (
                <div className="schedule-item" key={index}>
                  <strong>{item.time}</strong>
                  <span>{item.title}</span>
                  {item.note && <p>{item.note}</p>}
                </div>
              ))}
            </div>

            {dailyPlan.warnings?.length > 0 && (
              <>
                <h3>Planner Notes</h3>
                <ul>
                  {dailyPlan.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </>
            )}

            <h3>Reflection</h3>
            <p>Today's Biggest Win: ____________________</p>
            <p>Tomorrow's Goal: ____________________</p>

            <blockquote>
              Small actions repeated daily become extraordinary results.
            </blockquote>
          </section>
        )}
      </section>
    </main>
  );
}

export default Routine;