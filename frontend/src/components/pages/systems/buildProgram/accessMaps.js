export const ACCESS = {
  FULL_GYM: "fullGym",
  DUMBBELLS: "dumbbells",
  BODYWEIGHT: "bodyweight",
};

export const exerciseByAccess = {
  fullGym: {
    squat: "Squat",
    bench: "Bench Press",
    deadlift: "Deadlift",
    row: "Barbell Row",
    press: "Shoulder Press",
    quad: "Leg Extension",
    hamstring: "Seated Ham Curl",
    lunge: "Walking Lunges",
    curl: "Barbell Curl",
    triceps: "Tricep Pushdown",
    raise: "Lateral Raises",
  },

  dumbbells: {
    squat: "Goblet Squat",
    bench: "DB Floor Press",
    deadlift: "DB Romanian Deadlift",
    row: "DB Row",
    press: "DB Shoulder Press",
    quad: "DB Split Squat",
    hamstring: "DB RDL",
    lunge: "DB Walking Lunges",
    curl: "DB Curl",
    triceps: "DB Skullcrusher",
    raise: "DB Lateral Raises",
  },

  bodyweight: {
    squat: "Tempo Squat",
    bench: "Pushups",
    deadlift: "Single-Leg Hip Hinge",
    row: "Backpack Row",
    press: "Pike Pushups",
    quad: "Walking Lunges",
    hamstring: "Glute Bridge",
    lunge: "Reverse Lunges",
    curl: "Backpack Curl",
    triceps: "Close-Grip Pushups",
    raise: "Arm Raises",
  },
};

export function getAccessExercises(access) {
  return exerciseByAccess[access] || exerciseByAccess.fullGym;
}

export function isFullGym(access) {
  return access === ACCESS.FULL_GYM;
}