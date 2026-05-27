export function roundToNearestFive(num) {
  return Math.round(num / 5) * 5;
}

export function getTrainingMax(value) {
  return roundToNearestFive(Number(value) * 0.9);
}

export function getSplit(daysPerWeek) {
  if (Number(daysPerWeek) === 3) return "3 Day Full Body";
  if (Number(daysPerWeek) === 4) return "4 Day Upper Lower";
  if (Number(daysPerWeek) === 5) return "5 Day Build Split";
  if (Number(daysPerWeek) === 6) return "6 Day PPL";

  return "Invalid Split";
}