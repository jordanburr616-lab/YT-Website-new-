export function roundToNearestFive(num) {
  return Math.round(num / 5) * 5;
}

export function getGoalMax(currentMax, goal) {
  if (goal === "Lose Weight") return currentMax;
  if (goal === "Maintain") return Math.round((currentMax * 1.025) / 5) * 5;

  return Math.round((currentMax * 1.05) / 5) * 5;
}

export function getSplit(daysPerWeek) {
  if (Number(daysPerWeek) === 3) return "3 Day Full Body";
  if (Number(daysPerWeek) === 4) return "4 Day Upper Lower";
  if (Number(daysPerWeek) === 5) return "5 Day Build Split";
  if (Number(daysPerWeek) === 6) return "6 Day PPL";

  return "Invalid Split";
}

export function getWorkoutWeight(max, percent) {
  if (!max || !percent) return "";

  return roundToNearestFive(Number(max) * percent);
}