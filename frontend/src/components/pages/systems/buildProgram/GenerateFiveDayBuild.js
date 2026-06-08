import {
  createLegDay,
  createPullAccessoryDay,
  createPushDay,
  createRestDay,
  createLegAccessoryDay,
  createPullDay,
  createPushAccessoryDay,
  createCurrentMaxTestDay,
  createRecoveryAccessoryDay,
  createPRDay,
} from "./GenerateSixDayBuild.js";

import { getGoalModifiers } from "./goalModifiers.js";
import { getExperienceModifiers } from "./workoutHelpers.js";

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

function buildWorkoutQueue({
  squatMax,
  benchMax,
  deadliftMax,
  workoutLength,
  access,
  goalMod,
  expMod,
}) {
  const queue = [];

  weeklyProgression.forEach(({ week, percent, sets, reps }) => {
    if (week === 7 || week === 10) return;

    queue.push((scheduledWeek, day) =>
      createLegDay(scheduledWeek, day, squatMax, percent, sets, reps, workoutLength, access, goalMod, expMod)
    );

    queue.push((scheduledWeek, day) =>
      createPullAccessoryDay(scheduledWeek, day, workoutLength, access, goalMod, expMod)
    );

    queue.push((scheduledWeek, day) =>
      createPushDay(scheduledWeek, day, benchMax, percent, sets, reps, workoutLength, access, goalMod, expMod)
    );

    queue.push((scheduledWeek, day) =>
      createLegAccessoryDay(scheduledWeek, day, workoutLength, access, goalMod, expMod)
    );

    queue.push((scheduledWeek, day) =>
      createPullDay(scheduledWeek, day, deadliftMax, percent, sets, reps, workoutLength, access, goalMod, expMod)
    );

    queue.push((scheduledWeek, day) =>
      createPushAccessoryDay(scheduledWeek, day, workoutLength, access, goalMod, expMod)
    );
  });

  return queue;
}

export function generateFiveDayBuild({
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

  const workoutQueue = buildWorkoutQueue({
    squatMax,
    benchMax,
    deadliftMax,
    workoutLength,
    access,
    goalMod,
    expMod,
  });

  for (let week = 1; week <= 10; week++) {
    if (week === 7) {
        plan.push(createRestDay(7, 1));
        plan.push(createCurrentMaxTestDay(7, 2, "Squat", squatMax, workoutLength, access, goalMod, expMod));
        plan.push(createRecoveryAccessoryDay(7, 3, "Pull Recovery"));
        plan.push(createRestDay(7, 4));
        plan.push(createCurrentMaxTestDay(7, 5, "Bench", benchMax, workoutLength, access, goalMod, expMod));
        plan.push(createRecoveryAccessoryDay(7, 6, "Push Recovery"));
        plan.push(createCurrentMaxTestDay(7, 7, "Deadlift", deadliftMax, workoutLength, access, goalMod, expMod));
        continue;
        }

    if (week === 10) {
        plan.push(createRestDay(10, 1));
        plan.push(createPRDay(10, 2, "Squat", squatMax, squatGoal, workoutLength, access, goalMod, expMod));
        plan.push(createRecoveryAccessoryDay(10, 3, "Pull Recovery"));
        plan.push(createRestDay(10, 4));
        plan.push(createPRDay(10, 5, "Bench", benchMax, benchGoal, workoutLength, access, goalMod, expMod));
        plan.push(createRecoveryAccessoryDay(10, 6, "Push Recovery"));
        plan.push(createPRDay(10, 7, "Deadlift", deadliftMax, deadliftGoal, workoutLength, access, goalMod, expMod));
        continue;
        }

    const trainingDays = [1, 2, 3, 5, 6];

    for (let day = 1; day <= 7; day++) {
      if (!trainingDays.includes(day)) {
        plan.push(createRestDay(week, day));
        continue;
      }

      const nextWorkout = workoutQueue.shift();

      if (nextWorkout) {
        plan.push(nextWorkout(week, day));
      } else {
        plan.push(createRestDay(week, day));
      }
    }
  }

  return plan;
}