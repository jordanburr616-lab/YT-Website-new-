import { useState, useEffect } from "react";
import { getSplit, getGoalMax } from "./buildProgram/buildLogic";
import { generateSixDayBuild } from "./buildProgram/GenerateSixDayBuild";
import * as XLSX from "xlsx";

function BuildPhase({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [buildData, setBuildData] = useState(null);

  const [form, setForm] = useState({
    experience: "Beginner",
    goal: "Build Muscle",
    daysPerWeek: 6,
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
    const squatMax = Number(form.squat);
    const benchMax = Number(form.bench);
    const deadliftMax = Number(form.deadlift);

    const squatGoal = getGoalMax(squatMax);
    const benchGoal = getGoalMax(benchMax);
    const deadliftGoal = getGoalMax(deadliftMax);

    const split = getSplit(form.daysPerWeek);

    const workoutPlan =
      split === "6 Day PPL"
        ? generateSixDayBuild({
            squatMax,
            benchMax,
            deadliftMax,
            squatGoal,
            benchGoal,
            deadliftGoal,
            workoutLength: Number(form.workoutLength),
          })
        : null;

    const newBuildData = {
      ...form,
      squatMax,
      benchMax,
      deadliftMax,
      squatGoal,
      benchGoal,
      deadliftGoal,
      split,
      workoutPlan,
    };

    setBuildData(newBuildData);
    console.log("Build data:", newBuildData);
  }

  function exportToExcel(buildData) {
    if (!buildData?.workoutPlan) return;

    const rows = [];

    rows.push({
      Week: "Starting Maxes",
      Day: "",
      Workout: "",
      Exercise: "Squat",
      Sets: "",
      Reps: "",
      Weight: buildData.squatMax,
      Notes: `Goal PR: ${buildData.squatGoal}`,
    });

    rows.push({
      Week: "Starting Maxes",
      Day: "",
      Workout: "",
      Exercise: "Bench",
      Sets: "",
      Reps: "",
      Weight: buildData.benchMax,
      Notes: `Goal PR: ${buildData.benchGoal}`,
    });

    rows.push({
      Week: "Starting Maxes",
      Day: "",
      Workout: "",
      Exercise: "Deadlift",
      Sets: "",
      Reps: "",
      Weight: buildData.deadliftMax,
      Notes: `Goal PR: ${buildData.deadliftGoal}`,
    });

    buildData.workoutPlan.forEach((day) => {
      day.exercises.forEach((exercise) => {
        rows.push({
          Week: day.week,
          Day: day.day,
          Workout: day.title,
          Exercise: exercise.name,
          Sets: exercise.sets,
          Reps: exercise.reps,
          Weight: exercise.weight || "",
          Notes: exercise.notes || "",
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "10 Week Build");
    XLSX.writeFile(workbook, "10-week-build.xlsx");
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
        Enter your current maxes and generate a custom 10-week lifting program
        built toward new PRs.
      </p>

      <div>
        <h2>Settings</h2>

        <label>
          Experience
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
          >
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
          <select
            name="daysPerWeek"
            value={form.daysPerWeek}
            onChange={handleChange}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </label>

        <label>
          Squat 1RM
          <input
            name="squat"
            type="number"
            value={form.squat}
            onChange={handleChange}
          />
        </label>

        <label>
          Bench 1RM
          <input
            name="bench"
            type="number"
            value={form.bench}
            onChange={handleChange}
          />
        </label>

        <label>
          Deadlift 1RM
          <input
            name="deadlift"
            type="number"
            value={form.deadlift}
            onChange={handleChange}
          />
        </label>

        <label>
          Cardio?
          <select name="cardio" value={form.cardio} onChange={handleChange}>
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
          <select name="access" value={form.access} onChange={handleChange}>
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

        <button onClick={handleGenerate}>Generate My Build</button>

        {buildData && (
          <div>
            <h2>Your Strength Targets</h2>

            <p>
              Squat: {buildData.squatMax} → {buildData.squatGoal}
            </p>

            <p>
              Bench: {buildData.benchMax} → {buildData.benchGoal}
            </p>

            <p>
              Deadlift: {buildData.deadliftMax} → {buildData.deadliftGoal}
            </p>

            <p>Recommended Split: {buildData.split}</p>

            <button onClick={() => exportToExcel(buildData)}>
              Download Excel Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildPhase;