import { useState } from "react";
import { getTrainingMax, getSplit } from "./build/buildLogic";
import { fiveDayBuildSplit } from "./build/buildSplit";

function BuildPhase({ onBack }) {

  const [buildData, setBuildData] = useState(null);

  const [form, setForm] = useState({
    experience: "Beginner",
    goal: "Build Muscle",
    daysPerWeek: 5,
    cardio: "No",

    squat: "",
    bench: "",
    deadlift: "",

    workoutLength: 60,
    access: "Full Gym",
    injuries: "None",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleGenerate() {
    const squatTM = getTrainingMax(form.squat);
    const benchTM = getTrainingMax(form.bench);
    const deadliftTM = getTrainingMax(form.deadlift);

    const split = getSplit(form.daysPerWeek);

    const workoutPlan =
      split === "5 Day Build Split" ? fiveDayBuildSplit : null;

    const newBuildData = {
      ...form,
      squatTM,
      benchTM,
      deadliftTM,
      split,
      workoutPlan,
    };

    setBuildData(newBuildData);

    console.log("Build data:", newBuildData);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#afb1b3ff",
        padding: "120px 24px",
      }}
    >
      <button onClick={onBack}>← Back</button>

      <h1>The 10 Week Build</h1>

      <p>
        Enter your current training info and generate a custom 10-week lifting
        program.
      </p>

      <div>
        <h2>Settings</h2>

        <label>
          Experience
          <select name="experience" value={form.experience} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label>
          Goal
          <select name="goal" value={form.goal} onChange={handleChange}>
            <option>Build Muscle</option>
            <option>Lose Weight</option>
            <option>Maintain</option>
          </select>
        </label>

        <label>
          Days Per Week
          <select name="daysPerWeek" value={form.daysPerWeek} onChange={handleChange}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </label>

        <label>
          Squat 5RM
          <input name="squat" type="number" value={form.squat} onChange={handleChange} />
        </label>

        <label>
          Bench 5RM
          <input name="bench" type="number" value={form.bench} onChange={handleChange} />
        </label>

        <label>
          Deadlift 5RM
          <input name="deadlift" type="number" value={form.deadlift} onChange={handleChange} />
        </label>

        <label>
          Cardio?
          <select
            name="cardio"
            value={form.cardio}
            onChange={handleChange}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </label>

        <label>
          Workout Length
          <select
            name="workoutLength"
            value={form.workoutLength}
            onChange={handleChange}
          >
            <option value={45}>45 Minutes</option>
            <option value={60}>60 Minutes</option>
            <option value={75}>75 Minutes</option>
            <option value={90}>90 Minutes</option>
          </select>
        </label>

        <label>
          Access
          <select
            name="access"
            value={form.access}
            onChange={handleChange}
          >
            <option>Home</option>
            <option>Dumbbells</option>
            <option>Full Gym</option>
          </select>
        </label>

        <label>
          Injuries
          <select
            name="injuries"
            value={form.injuries}
            onChange={handleChange}
          >
            <option>None</option>
            <option>Shoulder</option>
            <option>Back</option>
            <option>Legs</option>
          </select>
        </label>

        <button onClick={handleGenerate}>
          Generate My Build
        </button>

        {buildData && (
          <div>
            <h2>Your Training Maxes</h2>
            <p>Squat TM: {buildData.squatTM}</p>
            <p>Bench TM: {buildData.benchTM}</p>
            <p>Deadlift TM: {buildData.deadliftTM}</p>
            <p>Recommended Split: {buildData.split}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildPhase;