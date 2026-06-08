import { getWorkoutWeight } from "./buildLogic.js";
import {
  getAccessoryPhase,
  trimWorkout,
  getExperienceModifiers,
  adjustSets,
} from "./workoutHelpers.js";
import { getAccessExercises, isFullGym } from "./accessMaps.js";
import { getGoalModifiers } from "./goalModifiers.js";

export function generateFourDayBuild({
  squatMax,
  benchMax,
  deadliftMax,
  squatGoal,
  benchGoal,
  deadliftGoal,
  workoutLength,
  access = "fullGym",
  goal,
  experience,
}) {
  const plan = [];

  const goalMod = getGoalModifiers(goal);
  const expMod = getExperienceModifiers(experience);

  const weeklyProgression = [
    { week: 1, percent: 0.70, sets: 4, reps: 6 },
    { week: 2, percent: 0.75, sets: 4, reps: 5 },
    { week: 3, percent: 0.80, sets: 5, reps: 4 },
    { week: 4, percent: 0.825, sets: 5, reps: 4 },
    { week: 5, percent: 0.85, sets: 5, reps: 3 },
    { week: 6, percent: 0.875, sets: 4, reps: 3 },
    { week: 8, percent: 0.90, sets: 3, reps: 2 },
    { week: 9, percent: 0.95, sets: 3, reps: 1 },
  ];

  for (let week = 1; week <= 10; week++) {
    if (week === 7) {
      plan.push(createCurrentMaxTestDay(7, 1, "Squat", squatMax, workoutLength, access));
      plan.push(createCurrentMaxTestDay(7, 2, "Bench", benchMax, workoutLength, access));
      plan.push(createRestDay(7, 3));
      plan.push(createCurrentMaxTestDay(7, 4, "Deadlift", deadliftMax, workoutLength, access));
      plan.push(createRecoveryDay(7, 5, "Recovery Accessories"));
      plan.push(createRestDay(7, 6));
      plan.push(createRestDay(7, 7));
      continue;
    }

    if (week === 10) {
      plan.push(createPRDay(10, 1, "Squat", squatMax, squatGoal, workoutLength, access));
      plan.push(createPRDay(10, 2, "Bench", benchMax, benchGoal, workoutLength, access));
      plan.push(createRestDay(10, 3));
      plan.push(createPRDay(10, 4, "Deadlift", deadliftMax, deadliftGoal, workoutLength, access));
      plan.push(createRecoveryDay(10, 5, "Recovery Accessories"));
      plan.push(createRestDay(10, 6));
      plan.push(createRestDay(10, 7));
      continue;
    }

    const phase = weeklyProgression.find((p) => p.week === week);

    if (!phase) continue;

    plan.push(
      createLowerHeavyDay(
        phase.week,
        1,
        squatMax,
        deadliftMax,
        phase.percent,
        phase.sets,
        phase.reps,
        workoutLength,
        access,
        goalMod,
        expMod
      )
    );

    plan.push(
      createUpperHeavyDay(
        phase.week,
        2,
        benchMax,
        phase.percent,
        phase.sets,
        phase.reps,
        workoutLength,
        access,
        goalMod,
        expMod
      )
    );

    plan.push(createRestDay(phase.week, 3));

    plan.push(
      createLowerAccessoryDay(
        phase.week,
        4,
        workoutLength,
        access,
        goalMod,
        expMod
      )
    );

    plan.push(
      createUpperAccessoryDay(
        phase.week,
        5,
        workoutLength,
        access,
        goalMod,
        expMod
      )
    );

    plan.push(createRestDay(phase.week, 6));
    plan.push(createRestDay(phase.week, 7));
  }

  console.log("Generating 4 Day Build");

  return plan;
}

function createRestDay(week, day) {
  return {
    week,
    day,
    title: "Rest / Recovery",
    exercises: [
      {
        name: "Rest Day",
        sets: "",
        reps: "",
        weight: "",
        notes: "Walk, stretch, mobility, or light cardio only.",
      },
    ],
  };
}

function createRecoveryDay(week, day, title) {
  return {
    week,
    day,
    title,
    exercises: [
      {
        name: "Light Mobility",
        sets: 1,
        reps: "10 min",
        weight: "",
        notes: "Do not train to failure.",
      },
      {
        name: "Easy Accessories",
        sets: 2,
        reps: 12,
        weight: "",
        notes: "Keep this light. Testing week is for max attempts.",
      },
    ],
  };
}

function createCurrentMaxTestDay(week, day, liftName, currentMax, workoutLength, access) {
  if (!isFullGym(access)) {
    return {
      week,
      day,
      title: `Progress Test - ${liftName}`,
      exercises: [
        {
          name: `${liftName} Rep Test`,
          sets: 1,
          reps: "AMRAP",
          weight: "",
          notes: "Use the hardest clean variation you can perform safely. Stop before form breaks.",
        },
      ],
    };
  }

  return {
    week,
    day,
    title: `Current Max Test - ${liftName}`,
    exercises: [
      ...getMaxWarmups(liftName, currentMax),
      {
        name: `${liftName} Current Max Attempt`,
        sets: 1,
        reps: 1,
        weight: currentMax,
        notes: "Match the max you entered into the system.",
      },
    ],
  };
}

function createPRDay(week, day, liftName, currentMax, goalMax, workoutLength, access) {
  if (!isFullGym(access)) {
    return {
      week,
      day,
      title: `Progress Test - ${liftName}`,
      exercises: [
        {
          name: `${liftName} Rep PR Test`,
          sets: 1,
          reps: "AMRAP",
          weight: "",
          notes: "Beat your previous clean rep count or use a harder variation.",
        },
      ],
    };
  }

  return {
    week,
    day,
    title: `PR Test - ${liftName}`,
    exercises: [
      ...getMaxWarmups(liftName, currentMax),
      {
        name: `${liftName} Current Max Attempt`,
        sets: 1,
        reps: 1,
        weight: currentMax,
        notes: "Only continue if this moved clean.",
      },
      {
        name: `${liftName} PR Attempt`,
        sets: 1,
        reps: 1,
        weight: goalMax,
        notes: "Only attempt if warmups and current max moved clean.",
      },
    ],
  };
}

function getMaxWarmups(liftName, max) {
  return [
    { name: `${liftName} Warmup`, sets: 1, reps: 5, weight: getWorkoutWeight(max, 0.5) },
    { name: `${liftName} Warmup`, sets: 1, reps: 3, weight: getWorkoutWeight(max, 0.7) },
    { name: `${liftName} Warmup`, sets: 1, reps: 2, weight: getWorkoutWeight(max, 0.8) },
    { name: `${liftName} Warmup`, sets: 1, reps: 1, weight: getWorkoutWeight(max, 0.9) },
    { name: `${liftName} Warmup`, sets: 1, reps: 1, weight: getWorkoutWeight(max, 0.95) },
  ];
}

function createLowerHeavyDay(
  week,
  day,
  squatMax,
  deadliftMax,
  percent,
  sets,
  reps,
  workoutLength,
  access,
  goalMod,
  expMod
) {
  const ex = getAccessExercises(access);
  const volumeMultiplier = expMod.volumeMultiplier;

  const squatWeight = isFullGym(access) ? getWorkoutWeight(squatMax, percent) : "";
  const deadliftWeight = isFullGym(access) ? getWorkoutWeight(deadliftMax, percent) : "";

  const exercises = [
    { name: ex.squat, sets: adjustSets(sets, volumeMultiplier), reps, weight: squatWeight },
    { name: ex.deadlift, sets: adjustSets(Math.max(2, sets - 1), volumeMultiplier), reps, weight: deadliftWeight },
    { name: ex.quad, sets: adjustSets(3, volumeMultiplier), reps: 10, weight: "" },
    { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
    { name: "Calf Raises", sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
    { name: "Core Work", sets: adjustSets(3, volumeMultiplier), reps: 15, weight: "" },
  ];

  return {
    week,
    day,
    title: "Lower Heavy",
    exercises: trimWorkout(exercises, workoutLength),
  };
}

function createUpperHeavyDay(
  week,
  day,
  benchMax,
  percent,
  sets,
  reps,
  workoutLength,
  access,
  goalMod,
  expMod
) {
  const ex = getAccessExercises(access);
  const volumeMultiplier = expMod.volumeMultiplier;

  const benchWeight = isFullGym(access) ? getWorkoutWeight(benchMax, percent) : "";

  const exercises = [
    { name: ex.bench, sets: adjustSets(sets, volumeMultiplier), reps, weight: benchWeight },
    { name: ex.row, sets: adjustSets(3, volumeMultiplier), reps: 8, weight: "" },
    { name: ex.press, sets: adjustSets(3, volumeMultiplier), reps: 10, weight: "" },
    { name: ex.triceps, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
    { name: ex.curl, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
    { name: ex.raise, sets: adjustSets(3, volumeMultiplier), reps: 15, weight: "" },
  ];

  return {
    week,
    day,
    title: "Upper Heavy",
    exercises: trimWorkout(exercises, workoutLength),
  };
}

function createLowerAccessoryDay(
  week,
  day,
  workoutLength,
  access,
  goalMod,
  expMod
) {
  const ex = getAccessExercises(access);
  const phase = getAccessoryPhase(week);

  let exercises = [
    { name: ex.quad, ...phase.main, weight: "" },
    { name: ex.hamstring, ...phase.secondary, weight: "" },
    { name: ex.lunge, ...phase.secondary, weight: "" },
    { name: "Calf Raises", ...phase.isolation, weight: "" },
    { name: "Core Work", ...phase.isolation, weight: "" },
    { name: ex.squat, ...phase.secondary, weight: "" },
  ];

  exercises = exercises.map((exercise) => ({
    ...exercise,
    sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
  }));

  return {
    week,
    day,
    title: "Lower Accessory",
    exercises: trimWorkout(exercises, workoutLength),
  };
}

function createUpperAccessoryDay(
  week,
  day,
  workoutLength,
  access,
  goalMod,
  expMod
) {
  const ex = getAccessExercises(access);
  const phase = getAccessoryPhase(week);

  let exercises = [
    { name: ex.row, ...phase.main, weight: "" },
    { name: ex.press, ...phase.secondary, weight: "" },
    { name: ex.curl, ...phase.secondary, weight: "" },
    { name: ex.triceps, ...phase.isolation, weight: "" },
    { name: ex.raise, ...phase.isolation, weight: "" },
    { name: ex.bench, ...phase.secondary, weight: "" },
  ];

  exercises = exercises.map((exercise) => ({
    ...exercise,
    sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
  }));

  return {
    week,
    day,
    title: "Upper Accessory",
    exercises: trimWorkout(exercises, workoutLength),
  };
}