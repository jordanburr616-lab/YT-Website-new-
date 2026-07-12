import { timeToMinutes } from "./timeHelpers";

export function getStartTimeMinutes(scheduleItem) {
  const firstTime = scheduleItem.rawStart || scheduleItem.time;

  if (!firstTime) return 99999;

  const match = firstTime.match(/\d{1,2}:\d{2}/);
  if (!match) return 99999;

  return timeToMinutes(match[0]);
}

export function sortSchedule(schedule) {
  return [...schedule].sort((a, b) => {
    return (a.sortTime ?? timeToMinutes(a.rawStart)) -
      (b.sortTime ?? timeToMinutes(b.rawStart));
  });
}