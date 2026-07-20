export const MINUTES_PER_DAY = 1440;

export function timeToMinutes(time) {
  if (!time || typeof time !== "string") {
    return 0;
  }

  const [hours, minutes] = time.split(":").map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return 0;
  }

  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes) {
  const normalizedMinutes =
    ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) %
    MINUTES_PER_DAY;

  const hours = Math.floor(normalizedMinutes / 60);
  const minutes = normalizedMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export function addMinutes(time, minutesToAdd) {
  return minutesToTime(timeToMinutes(time) + minutesToAdd);
}

export function formatTime(time) {
  if (!time) return "";

  const [hourString, minute = "00"] = time.split(":");
  const hour = Number(hourString);

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minute} ${suffix}`;
}