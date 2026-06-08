import { getWorkoutWeight } from "./buildLogic.js";
import {
  getAccessoryPhase,
  trimWorkout,
  getExperienceModifiers,
  adjustSets,
} from "./workoutHelpers.js";
import { getAccessExercises, isFullGym } from "./accessMaps.js";
import { getGoalModifiers } from "./goalModifiers.js";

export function generateThreeDayBuild({
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

    const goalMod = getGoalModifiers(goal);
    const expMod = getExperienceModifiers(experience);

    for (let week = 1; week <= 10; week++) {

    if (week === 7) {
        plan.push(createCurrentMaxTestDay(7, 1, "Squat", squatMax, access));
        plan.push(createRestDay(7, 2));
        plan.push(createCurrentMaxTestDay(7, 3, "Bench", benchMax, access));
        plan.push(createRestDay(7, 4));
        plan.push(createCurrentMaxTestDay(7, 5, "Deadlift", deadliftMax, access));
        plan.push(createRestDay(7, 6));
        plan.push(createRestDay(7, 7));
        continue;
    }

    if (week === 10) {
        plan.push(createPRDay(10, 1, "Squat", squatMax, squatGoal, access));
        plan.push(createRestDay(10, 2));
        plan.push(createPRDay(10, 3, "Bench", benchMax, benchGoal, access));
        plan.push(createRestDay(10, 4));
        plan.push(createPRDay(10, 5, "Deadlift", deadliftMax, deadliftGoal, access));
        plan.push(createRestDay(10, 6));
        plan.push(createRestDay(10, 7));
        continue;
    }
    const phase = weeklyProgression.find((p) => p.week === week);

    if (!phase) continue;

    const isCompoundWeek = week % 2 !== 0;

    if (isCompoundWeek) {
        plan.push(
        createFullBodyCompoundDay(
            week,
            1,
            squatMax,
            benchMax,
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

        plan.push(createRestDay(week, 2));

        plan.push(
        createFullBodyAccessoryDay(
            week,
            3,
            workoutLength,
            access,
            goalMod,
            expMod
        )
        );

        plan.push(createRestDay(week, 4));

        plan.push(
        createFullBodyCompoundDay(
            week,
            5,
            squatMax,
            benchMax,
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

        plan.push(createRestDay(week, 6));
        plan.push(createRestDay(week, 7));
    } else {
        plan.push(
        createFullBodyAccessoryDay(
            week,
            1,
            workoutLength,
            access,
            goalMod,
            expMod
        )
        );

        plan.push(createRestDay(week, 2));

        plan.push(
        createFullBodyCompoundDay(
            week,
            3,
            squatMax,
            benchMax,
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

        plan.push(createRestDay(week, 4));

        plan.push(
        createFullBodyAccessoryDay(
            week,
            5,
            workoutLength,
            access,
            goalMod,
            expMod
        )
        );

        plan.push(createRestDay(week, 6));
        plan.push(createRestDay(week, 7));
    }
    }

  console.log("Generating 3 Day Build");

  return plan;
}

function getFullBodyBlock(week, day) {
  const index = (week + day) % 3;

  if (index === 0) return "A";
  if (index === 1) return "B";
  return "C";
}

function createFullBodyCompoundDay(
  week,
  day,
  squatMax,
  benchMax,
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
  const block = getFullBodyBlock(week, day);

  const squatWeight = isFullGym(access) ? getWorkoutWeight(squatMax, percent) : "";
  const benchWeight = isFullGym(access) ? getWorkoutWeight(benchMax, percent) : "";
  const deadliftWeight = isFullGym(access) ? getWorkoutWeight(deadliftMax, percent) : "";

  const blocks = {
    A: [
      { name: ex.squat, sets: adjustSets(sets, volumeMultiplier), reps, weight: squatWeight },
      { name: ex.bench, sets: adjustSets(sets, volumeMultiplier), reps, weight: benchWeight },
      { name: ex.deadlift, sets: adjustSets(Math.max(2, sets - 1), volumeMultiplier), reps, weight: deadliftWeight },
      { name: ex.row, sets: adjustSets(3, volumeMultiplier), reps: 10, weight: "" },
      { name: ex.press, sets: adjustSets(3, volumeMultiplier), reps: 10, weight: "" },
      { name: "Core Work", sets: adjustSets(3, volumeMultiplier), reps: 15, weight: "" },
    ],

    B: [
      { name: ex.bench, sets: adjustSets(sets, volumeMultiplier), reps, weight: benchWeight },
      { name: ex.deadlift, sets: adjustSets(Math.max(2, sets - 1), volumeMultiplier), reps, weight: deadliftWeight },
      { name: ex.squat, sets: adjustSets(sets, volumeMultiplier), reps, weight: squatWeight },
      { name: ex.raise, sets: adjustSets(3, volumeMultiplier), reps: 15, weight: "" },
      { name: ex.triceps, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
      { name: ex.hamstring, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
    ],

    C: [
      { name: ex.deadlift, sets: adjustSets(Math.max(2, sets - 1), volumeMultiplier), reps, weight: deadliftWeight },
      { name: ex.squat, sets: adjustSets(sets, volumeMultiplier), reps, weight: squatWeight },
      { name: ex.bench, sets: adjustSets(sets, volumeMultiplier), reps, weight: benchWeight },
      { name: ex.curl, sets: adjustSets(3, volumeMultiplier), reps: 12, weight: "" },
      { name: ex.lunge, sets: adjustSets(3, volumeMultiplier), reps: 10, weight: "" },
      { name: "Core Work", sets: adjustSets(3, volumeMultiplier), reps: 15, weight: "" },
    ],
  };

  return {
    week,
    day,
    title: `Full Body Compound - Block ${block}`,
    exercises: trimWorkout(blocks[block], workoutLength),
  };
}

function createFullBodyAccessoryDay(
  week,
  day,
  workoutLength,
  access,
  goalMod,
  expMod
) {
  const ex = getAccessExercises(access);
  const phase = getAccessoryPhase(week);
  const block = getFullBodyBlock(week, day);

  const blocks = {
    A: [
      { name: ex.quad, ...phase.main, weight: "" },
      { name: ex.row, ...phase.main, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: ex.raise, ...phase.isolation, weight: "" },
      { name: ex.curl, ...phase.secondary, weight: "" },
      { name: "Core Work", ...phase.isolation, weight: "" },
    ],

    B: [
      { name: ex.row, ...phase.main, weight: "" },
      { name: ex.lunge, ...phase.main, weight: "" },
      { name: ex.triceps, ...phase.secondary, weight: "" },
      { name: ex.hamstring, ...phase.secondary, weight: "" },
      { name: ex.raise, ...phase.isolation, weight: "" },
      { name: "Calf Raises", ...phase.isolation, weight: "" },
    ],

    C: [
      { name: ex.hamstring, ...phase.main, weight: "" },
      { name: ex.press, ...phase.main, weight: "" },
      { name: ex.quad, ...phase.secondary, weight: "" },
      { name: ex.curl, ...phase.secondary, weight: "" },
      { name: ex.triceps, ...phase.secondary, weight: "" },
      { name: "Core Work", ...phase.isolation, weight: "" },
    ],
  };

  let exercises = blocks[block];

  exercises = exercises
    .map((exercise) => ({
      ...exercise,
      reps:
        typeof exercise.reps === "number"
          ? exercise.reps + goalMod.accessoryRepBonus
          : exercise.reps,
    }))
    .map((exercise) => ({
      ...exercise,
      sets: adjustSets(exercise.sets, expMod.volumeMultiplier),
    }));

  return {
    week,
    day,
    title: `Full Body Accessory - Block ${block}`,
    exercises: trimWorkout(exercises, workoutLength),
  };
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

function createCurrentMaxTestDay(week, day, liftName, currentMax, access) {
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

function createPRDay(week, day, liftName, currentMax, goalMax, access) {
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