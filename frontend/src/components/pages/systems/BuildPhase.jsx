import { useState, useEffect } from "react";
import { getSplit, getGoalMax } from "./buildProgram/buildLogic";
import { generateThreeDayBuild } from "./buildProgram/GenerateThreeDayBuild";
import { generateFourDayBuild } from "./buildProgram/GenerateFourDayBuild";
import { generateFiveDayBuild } from "./buildProgram/GenerateFiveDayBuild";
import { generateSixDayBuild } from "./buildProgram/GenerateSixDayBuild";
import * as XLSX from "xlsx";
import { trackEvent } from "../../../utils/analytics";
import { usePageView } from "../../../hooks/usePageView";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function BuildPhase() {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageView("build-phase");

  const [buildData, setBuildData] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  const [form, setForm] = useState({
    experience: "Beginner",
    goal: "Build Muscle",
    daysPerWeek: 6,

    squat: "",
    bench: "",
    deadlift: "",

    workoutLength: 60,
    access: "fullGym",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBack() {
    navigate("/systems");
  }

  function handleGenerate() {

    if (!form.squat || !form.bench || !form.deadlift) {
      setError(
        "Please enter your squat, bench, and deadlift 1RM before generating a build."
      );

      trackEvent("build_generate_failed", {
        page: window.location.pathname,
        metadata: {
          reason: "missing_1rm",
        },
      });

      return;
    }

    const squatMax = Number(form.squat);
    const benchMax = Number(form.bench);
    const deadliftMax = Number(form.deadlift);

    if (squatMax <= 0 || benchMax <= 0 || deadliftMax <= 0) {
      setError("Your 1RM numbers must be greater than 0.");

      trackEvent("build_generate_failed", {
        page: window.location.pathname,
        metadata: {
          reason: "invalid_1rm",
        },
      });

      return;
    }

    setError("");

    const squatGoal = getGoalMax(squatMax, form.goal);
    const benchGoal = getGoalMax(benchMax, form.goal);
    const deadliftGoal = getGoalMax(deadliftMax, form.goal);

    const split = getSplit(form.daysPerWeek);

    let workoutPlan;

    const generatorInput = {
      squatMax,
      benchMax,
      deadliftMax,
      squatGoal,
      benchGoal,
      deadliftGoal,
      workoutLength: Number(form.workoutLength),
      access: form.access,
      goal: form.goal,
      experience: form.experience,
    };

    switch (Number(form.daysPerWeek)) {
      case 3:
        workoutPlan = generateThreeDayBuild(generatorInput);
        break;

      case 4:
        workoutPlan = generateFourDayBuild(generatorInput);
        break;

      case 5:
        workoutPlan = generateFiveDayBuild(generatorInput);
        break;

      case 6:
      default:
        workoutPlan = generateSixDayBuild(generatorInput);
        break;
    }

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

    trackEvent("build_generated", {
      page: window.location.pathname,
      metadata: {
        experience: form.experience,
        goal: form.goal,
        days_per_week: Number(form.daysPerWeek),
        workout_length: Number(form.workoutLength),
        access: form.access,
      },
    });
  }

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
          source: "ten_week_build",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      trackEvent("email_signup", {
        page: window.location.pathname,
        metadata: {
          location: "ten_week_build_results",
          form: "build_newsletter",
        },
      });

      setSignupStatus("Thank you for signing up!");
      setEmail("");
    } catch (err) {
      setSignupStatus("Something went wrong. Try again.");
      console.error(err);
    }
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

    trackEvent("build_excel_downloaded", {
      page: window.location.pathname,
      metadata: {
        goal: buildData.goal,
        days_per_week: Number(buildData.daysPerWeek),
        access: buildData.access,
      },
    });
  }

  return (
    <div className="build-page page-shell">
      <div className="build-container">
        <button className="build-back" onClick={handleBack}>
          ← Back to Systems
        </button>

        <section className="build-hero">
          <p className="reset-eyebrow">10 WEEK PROGRAM</p>
          <h1>The 10 Week Build</h1>
          <p>
            Enter your current maxes and generate a custom strength program built
            toward new PRs.
          </p>
        </section>

        <div className="build-card">
          <div className="build-form">
            <h2>Build Your Plan</h2>

            <div className="build-grid">
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
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={6}>6 Days</option>
                </select>
              </label>

              <label>
                Workout Length
                <select name="workoutLength" value={form.workoutLength} onChange={handleChange}>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={75}>75 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </label>

              <label>
                Squat 1RM
                <input name="squat" type="number" value={form.squat} onChange={handleChange} placeholder="ex: 315" />
              </label>

              <label>
                Bench 1RM
                <input name="bench" type="number" value={form.bench} onChange={handleChange} placeholder="ex: 225" />
              </label>

              <label>
                Deadlift 1RM
                <input name="deadlift" type="number" value={form.deadlift} onChange={handleChange} placeholder="ex: 405" />
              </label>

              <label>
                Access
                <select name="access" value={form.access} onChange={handleChange}>
                  <option value="fullGym">Full Gym</option>
                  <option value="dumbbells">Dumbbells</option>
                  <option value="bodyweight">Home / Bodyweight</option>
                </select>
              </label>
            </div>

            {error && (
              <div className="build-error">
                {error}
              </div>
            )}

            <button className="build-generate" onClick={handleGenerate}>
              Generate My Build
            </button>
          </div>

          {buildData && (
            <div className="build-results">
              <p className="reset-eyebrow">YOUR TARGETS</p>
              <h2>Strength Targets</h2>

              <div className="build-targets">
                <div>
                  <span>Squat</span>
                  <strong>{buildData.squatMax} → {buildData.squatGoal}</strong>
                </div>

                <div>
                  <span>Bench</span>
                  <strong>{buildData.benchMax} → {buildData.benchGoal}</strong>
                </div>

                <div>
                  <span>Deadlift</span>
                  <strong>{buildData.deadliftMax} → {buildData.deadliftGoal}</strong>
                </div>
              </div>

              <p className="build-split">
                Recommended Split: <strong>{buildData.split}</strong>
              </p>

              <button
                className="build-download"
                onClick={() => exportToExcel(buildData)}
              >
                Download Excel Plan
              </button>

              <section className="build-newsletter">
                <h3>Your Build Is Only The Beginning</h3>

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

                {signupStatus && (
                  <p className="build-newsletter-status">{signupStatus}</p>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuildPhase;