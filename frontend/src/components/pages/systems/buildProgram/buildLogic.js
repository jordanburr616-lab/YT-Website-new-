export function roundToNearestFive(num) {
  return Math.round(num / 5) * 5;
}

export function getGoalMax(max) {
  return roundToNearestFive(Number(max) * 1.05);
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