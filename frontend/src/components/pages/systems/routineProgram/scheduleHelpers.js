import { timeToMinutes } from "./timeHelpers";

export function getSortTime(time, wakeTime) {
  if (!time) return 99999;

  let minutes = timeToMinutes(time);
  const wakeMinutes = timeToMinutes(wakeTime);

  if (minutes < wakeMinutes) {
    minutes += 1440;
  }

  return minutes;
}

export function getStartTimeMinutes(scheduleItem, wakeTime) {
  if (scheduleItem.sortTime !== undefined) {
    return scheduleItem.sortTime;
  }

  if (scheduleItem.rawStart) {
    return getSortTime(scheduleItem.rawStart, wakeTime);
  }

  const firstTime = scheduleItem.time;

  if (!firstTime) return 99999;

  const match = firstTime.match(/\d{1,2}:\d{2}/);

  if (!match) return 99999;

  return getSortTime(match[0], wakeTime);
}

export function sortSchedule(schedule, wakeTime) {
  return [...schedule].sort((a, b) => {
    return (
      getStartTimeMinutes(a, wakeTime) -
      getStartTimeMinutes(b, wakeTime)
    );
  });
}