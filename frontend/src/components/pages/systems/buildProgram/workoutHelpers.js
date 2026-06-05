export function getHeavyBlock(week) {
  if ([1, 4, 8].includes(week)) return "A";
  if ([2, 5, 9].includes(week)) return "B";
  return "C";
}

export function getAccessoryBlock(week) {
  if ([1, 4, 7].includes(week)) return "A";
  if ([2, 5, 8].includes(week)) return "B";
  if ([3, 6, 9].includes(week)) return "C";

  return "RECOVERY";
}

export function getExerciseLimit(workoutLength) {
  if (Number(workoutLength) === 45) return 3;
  if (Number(workoutLength) === 60) return 4;
  if (Number(workoutLength) === 75) return 5;
  if (Number(workoutLength) === 90) return 6;

  return 4;
}

export function trimWorkout(exercises, workoutLength) {
  return exercises.slice(0, getExerciseLimit(workoutLength));
}

export function getAccessoryPhase(week) {
  if (week <= 3) {
    return {
      main: { sets: 3, reps: 12 },
      secondary: { sets: 3, reps: 10 },
      isolation: { sets: 3, reps: 15 },
    };
  }

  if (week <= 6) {
    return {
      main: { sets: 4, reps: 10 },
      secondary: { sets: 4, reps: 8 },
      isolation: { sets: 4, reps: 12 },
    };
  }

  if (week === 7) {
    return {
      main: { sets: 2, reps: 10 },
      secondary: { sets: 2, reps: 8 },
      isolation: { sets: 2, reps: 12 },
    };
  }

  return {
    main: { sets: 3, reps: 8 },
    secondary: { sets: 3, reps: 6 },
    isolation: { sets: 3, reps: 10 },
  };
}