import { getWorkoutWeight } from "./buildLogic.js";
import { getGoalModifiers } from "./goalModifiers.js";
import { getAccessExercises, isFullGym } from "./accessMaps.js";
import {
  getHeavyBlock,
  getAccessoryBlock,
  getAccessoryPhase,
  trimWorkout,
  getExperienceModifiers,
  adjustSets,
} from "./workoutHelpers.js";

const weeklyProgression = [
  { week: 1, percent: 0.7, sets: 4, reps: 6 },
  { week: 2, percent: 0.75, sets: 4, reps: 5 },
  { week: 3, percent: 0.8, sets: 5, reps: 4 },
  { week: 4, percent: 0.825, sets: 5, reps: 4 },
  { week: 5, percent: 0.85, sets: 5, reps: 3 },
  { week: 6, percent: 0.875, sets: 4, reps: 3 },
  { week: 8, percent: 0.875, sets: 4, reps: 2 },
  { week: 9, percent: 0.9, sets: 3, reps: 2 },
];

export function generateSixDayBuild({
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

  console.log("ACCESS RECEIVED:", access);
  console.log("IS FULL GYM:", isFullGym(access));

  weeklyProgression.forEach((weekPlan) => {
    const { week, percent, sets, reps } = weekPlan;

    plan.push(createLegDay(week, 1, squatMax, percent, sets, reps, workoutLength, access, goalMod, expMod));
    plan.push(createPullAccessoryDay(week, 2, workoutLength, access, goalMod, expMod));
    plan.push(createPushDay(week, 3, benchMax, percent, sets, reps, workoutLength, access, goalMod, expMod));
    plan.push(createRestDay(week, 4));
    plan.push(createLegAccessoryDay(week, 5, workoutLength, access, goalMod, expMod));
    plan.push(createPullDay(week, 6, deadliftMax, percent, sets, reps, workoutLength, access, goalMod, expMod));
    plan.push(createPushAccessoryDay(week, 7, workoutLength, access, goalMod, expMod));

    if (week === 6) {
      plan.push(createCurrentMaxTestDay(7, 1, "Squat", squatMax, workoutLength, access, goalMod, expMod));
      plan.push(createRecoveryAccessoryDay(7, 2, "Pull Recovery", workoutLength, access, goalMod, expMod));
      plan.push(createCurrentMaxTestDay(7, 3, "Bench", benchMax, workoutLength, access, goalMod, expMod));
      plan.push(createRestDay(7, 4, workoutLength));
      plan.push(createRecoveryAccessoryDay(7, 5, "Leg Recovery", workoutLength, access, goalMod, expMod));
      plan.push(createCurrentMaxTestDay(7, 6, "Deadlift", deadliftMax, workoutLength, access, goalMod, expMod));
      plan.push(createRecoveryAccessoryDay(7, 7, "Push Recovery", workoutLength, access, goalMod, expMod));
    }
  });

  plan.push(createPRDay(10, 1, "Squat", squatMax, squatGoal, workoutLength, access, goalMod, expMod));
  plan.push(createRecoveryAccessoryDay(10, 2, "Pull Recovery", workoutLength, access, goalMod, expMod));
  plan.push(createPRDay(10, 3, "Bench", benchMax, benchGoal, workoutLength, access, goalMod, expMod));
  plan.push(createRestDay(10, 4));
  plan.push(createRecoveryAccessoryDay(10, 5, "Leg Recovery", workoutLength, access, goalMod, expMod));
  plan.push(createPRDay(10, 6, "Deadlift", deadliftMax, deadliftGoal, workoutLength, access, goalMod, expMod));
  plan.push(createRecoveryAccessoryDay(10, 7, "Push Recovery", workoutLength, access, goalMod, expMod));

  return plan;
}

export function createLegDay(week, day, squatMax, percent, sets, reps, workoutLength, access, goalMod, expMod) {
  const block = getHeavyBlock(week);
  const ex = getAccessExercises(access);
  const volumeMultiplier = expMod.volumeMultiplier;

  const mainWeight = isFullGym(access)
    ? getWorkoutWeight(squatMax, percent)
    : "";

  const legBlocks = {
    A: [
      {
        name: ex.squat,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.quad, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
      { name: "Calf Raises", sets: adjustSets(4, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
      { name: ex.lunge, sets: adjustSets(3, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
    ],

    B: [
      {
        name: ex.squat,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.lunge, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.quad, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
      { name: "Calf Raises", sets: adjustSets(4, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
    ],

    C: [
      {
        name: ex.squat,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.quad, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: "Calf Raises", sets: adjustSets(4, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
      { name: ex.lunge, sets: adjustSets(4, volumeMultiplier), reps: week <= 6 ? 12 : 10, weight: "" },
    ],
  };

  return {
    week,
    day,
    title: `Legs - Heavy Squat Block ${block}`,
    exercises: trimWorkout(legBlocks[block] || legBlocks.A, workoutLength),
  };
}

export function createPushDay(week, day, benchMax, percent, sets, reps, workoutLength, access, goalMod, expMod) {
  const block = getHeavyBlock(week);
  const ex = getAccessExercises(access);
  const volumeMultiplier = expMod.volumeMultiplier;

  const mainWeight = isFullGym(access)
    ? getWorkoutWeight(benchMax, percent)
    : "";

  const pushBlocks = {
    A: [
      {
        name: ex.bench,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.press, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.triceps, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.raise, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
      { name: "Pushups", sets: adjustSets(3, volumeMultiplier), reps: "AMRAP", weight: "" },
    ],

    B: [
      {
        name: ex.bench,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.press, sets: adjustSets(3, volumeMultiplier), reps: week <= 6 ? 8 : 6, weight: "" },
      { name: ex.triceps, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.raise, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
      { name: "Pushups", sets: adjustSets(3, volumeMultiplier), reps: "AMRAP", weight: "" },
    ],

    C: [
      {
        name: ex.bench,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.press, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.triceps, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.raise, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
      { name: "Pushups", sets: adjustSets(3, volumeMultiplier), reps: "AMRAP", weight: "" },
    ],
  };

  return {
    week,
    day,
    title: `Push - Heavy Bench Block ${block}`,
    exercises: trimWorkout(pushBlocks[block] || pushBlocks.A, workoutLength),
  };
}

export function createPullDay(week, day, deadliftMax, percent, sets, reps, workoutLength, access, goalMod, expMod) {
  const block = getHeavyBlock(week);
  const ex = getAccessExercises(access);
  const volumeMultiplier = expMod.volumeMultiplier;

  const mainWeight = isFullGym(access)
    ? getWorkoutWeight(deadliftMax, percent)
    : "";

  const pullBlocks = {
    A: [
      {
        name: ex.deadlift,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.row, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.curl, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: "Shrugs", sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
    ],

    B: [
      {
        name: ex.deadlift,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.row, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.curl, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: "Shrugs", sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
    ],

    C: [
      {
        name: ex.deadlift,
        sets: adjustSets(sets, volumeMultiplier),
        reps,
        weight: mainWeight,
        notes: !isFullGym(access)
          ? "Use a challenging variation or load."
          : "",
      },
      { name: ex.row, sets: adjustSets(4, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: ex.curl, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 12 : 10, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 10 : 8, weight: "" },
      { name: "Shrugs", sets: adjustSets(3, volumeMultiplier), reps: week <= 3 ? 15 : 12, weight: "" },
    ],
  };

  return {
    week,
    day,
    title: `Pull - Heavy Deadlift Block ${block}`,
    exercises: trimWorkout(pullBlocks[block] || pullBlocks.A, workoutLength),
  };
}

export function createCurrentMaxTestDay(week, day, liftName, currentMax, workoutLength, access, goalMod, expMod) {
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

export function createPRDay(week, day, liftName, currentMax, goalMax, workoutLength, access, goalMod, expMod) {
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

export function createRecoveryAccessoryDay(week, day, title) {
  return {
    week,
    day,
    title,
    exercises: [
      { name: "Light Mobility", sets: 1, reps: "10 min", weight: "", notes: "Do not train to failure." },
      { name: "Easy Accessories", sets: 2, reps: 12, weight: "", notes: "Keep this light. Week 10 is for PR testing." },
    ],
  };
}

export function createRestDay(week, day) {
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

export function createLegAccessoryDay(week, day, workoutLength, access, goalMod, expMod) {
  const block = getAccessoryBlock(week);
  const phase = getAccessoryPhase(week);
  const ex = getAccessExercises(access);

  const legBlocks = {
    A: [
      { name: ex.quad, ...phase.main, weight: "" },
      { name: ex.lunge, ...phase.secondary, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: "Calf Raises", ...phase.isolation, weight: "" },
      { name: ex.squat, ...phase.main, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
      
    ],

    B: [
      { name: ex.squat, ...phase.main, weight: "" },
      { name: ex.lunge, ...phase.secondary, weight: "" },
      { name: "Calf Raises", ...phase.isolation, weight: "" },
      { name: ex.quad, ...phase.secondary, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],

    C: [
      { name: ex.quad, ...phase.main, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: "Calf Raises", ...phase.isolation, weight: "" },
      { name: ex.lunge, ...phase.secondary, weight: "" },
      { name: ex.squat, ...phase.main, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],
  };

  let finalExercises = legBlocks[block] || legBlocks.A;

  finalExercises = finalExercises
    .map((exercise) => applyGoalReps(exercise, goalMod))
    .map((exercise) => ({
      ...exercise,
      sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
    }));

  finalExercises = addConditioningIfNeeded(finalExercises, goalMod);

  return {
    week,
    day,
    title: `Leg Accessory - Block ${block}`,
    exercises: trimWorkout(finalExercises, workoutLength),
  };
}

export function createPullAccessoryDay(week, day, workoutLength, access, goalMod, expMod) {
  const block = getAccessoryBlock(week);
  const phase = getAccessoryPhase(week);
  const ex = getAccessExercises(access);

  const pullBlocks = {
    A: [
      {
        name: ex.deadlift,
        ...phase.main,
        weight: "",
        notes: "Keep this lighter than your main pull day.",
      },
      { name: ex.row, ...phase.main, weight: "" },
      { name: ex.curl, ...phase.secondary, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: "Shrugs", ...phase.isolation, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],

    B: [
      { name: ex.row, ...phase.main, weight: "" },
      { name: ex.curl, ...phase.secondary, weight: "" },
      { name: ex.deadlift, ...phase.secondary, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: "Shrugs", ...phase.isolation, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],

    C: [
      { name: ex.hamstring, ...phase.main, weight: "" },
      { name: ex.row, ...phase.main, weight: "" },
      { name: ex.curl, ...phase.secondary, weight: "" },
      { name: ex.deadlift, ...phase.secondary, weight: "" },
      { name: "Shrugs", ...phase.isolation, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],
  };

  let finalExercises = pullBlocks[block] || pullBlocks.A;

  finalExercises = finalExercises
    .map((exercise) => applyGoalReps(exercise, goalMod))
    .map((exercise) => ({
      ...exercise,
      sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
    }));

  finalExercises = addConditioningIfNeeded(finalExercises, goalMod);

  return {
    week,
    day,
    title: `Pull Accessory - Block ${block}`,
    exercises: trimWorkout(finalExercises, workoutLength),
  };
}

export function createPushAccessoryDay(week, day, workoutLength, access, goalMod, expMod) {
  const block = getAccessoryBlock(week);
  const phase = getAccessoryPhase(week);
  const ex = getAccessExercises(access);

  const pushBlocks = {
    A: [
      { name: ex.bench, ...phase.main, weight: "" },
      { name: ex.press, ...phase.secondary, weight: "" },
      { name: ex.raise, ...phase.isolation, weight: "" },
      { name: ex.triceps, ...phase.secondary, weight: "" },
      { name: "Pushups", ...phase.main, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],

    B: [
      { name: ex.press, ...phase.main, weight: "" },
      { name: ex.triceps, ...phase.secondary, weight: "" },
      { name: ex.raise, ...phase.isolation, weight: "" },
      { name: "Pushups", ...phase.main, weight: "" },
      { name: ex.bench, ...phase.secondary, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],

    C: [
      { name: ex.bench, ...phase.main, weight: "" },
      { name: ex.raise, ...phase.isolation, weight: "" },
      { name: ex.triceps, ...phase.secondary, weight: "" },
      { name: ex.press, ...phase.secondary, weight: "" },
      { name: "Pushups", ...phase.main, weight: "" },
      { name: "Core Work", sets: 3, reps: "10-15", weight: "" },
    ],
  };

  let finalExercises = pushBlocks[block] || pushBlocks.A;

  finalExercises = finalExercises
    .map((exercise) => applyGoalReps(exercise, goalMod))
    .map((exercise) => ({
      ...exercise,
      sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
    }));

  finalExercises = addConditioningIfNeeded(finalExercises, goalMod);

  return {
    week,
    day,
    title: `Push Accessory - Block ${block}`,
    exercises: trimWorkout(finalExercises, workoutLength),
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

function applyGoalReps(exercise, goalMod) {
  return {
    ...exercise,
    reps: typeof exercise.reps === "number"
      ? exercise.reps + goalMod.accessoryRepBonus
      : exercise.reps,
  };
}

function addConditioningIfNeeded(exercises, goalMod) {
  if (!goalMod.conditioning) return exercises;

  return [
    ...exercises,
    {
      name: "Conditioning",
      sets: 1,
      reps: "15-20 min",
      weight: "",
      notes: "Walk, incline treadmill, bike, swim, or easy jog.",
    },
  ];
}