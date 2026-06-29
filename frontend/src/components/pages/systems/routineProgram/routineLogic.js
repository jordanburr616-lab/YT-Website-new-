import { addMinutes, formatTime } from "./timeHelpers";
import { sortSchedule } from "./scheduleHelpers";

function getWorkCommitment(commitments) {
  return commitments.find(
    (item) =>
      item.title.toLowerCase() === "work" &&
      item.start &&
      item.end &&
      item.end > item.start
  );
}

function isValidCommitment(item) {
  return item.title && item.start && item.end && item.end > item.start;
}

export function generateDailyPlan({
  date,
  wakeTime,
  bedTime,
  goal,
  priorities = [],
  commitments = [],
  includes = {},
}) {
  const schedule = [];

  schedule.push({
    rawStart: wakeTime,
    time: formatTime(wakeTime),
    title: "Wake Up",
  });

  if (includes.breakfast) {
    const breakfastTime = addMinutes(wakeTime, 30);

    schedule.push({
      rawStart: breakfastTime,
      time: formatTime(breakfastTime),
      title: "Breakfast",
    });
  }

  if (includes.deepWork) {
    const deepWorkStart = addMinutes(wakeTime, includes.breakfast ? 60 : 30);
    const deepWorkEnd = addMinutes(deepWorkStart, 90);

    schedule.push({
      rawStart: deepWorkStart,
      time: `${formatTime(deepWorkStart)} - ${formatTime(deepWorkEnd)}`,
      title: "Deep Work Session",
      note: "90 minutes of focused work before distractions take over.",
    });

    if (includes.breaks) {
      const breakEnd = addMinutes(deepWorkEnd, 15);

      schedule.push({
        rawStart: deepWorkEnd,
        time: `${formatTime(deepWorkEnd)} - ${formatTime(breakEnd)}`,
        title: "Short Break",
        note: "15 minutes. Step away from the screen.",
      });
    }
  }

  const lunchTime = "12:00";
  const dinnerTime = "18:30";
  const windDownTime = addMinutes(bedTime, -45);

  const workCommitment = getWorkCommitment(commitments);

  let workoutTime = addMinutes(wakeTime, 240);

  if (workCommitment?.start) {
    const workStart = workCommitment.start;

    if (workStart >= "14:00") {
      workoutTime = addMinutes(workStart, -120);
    } else {
      workoutTime = addMinutes(workCommitment.end, 30);
    }
  }

  commitments.filter(isValidCommitment).forEach((item) => {
    schedule.push({
      rawStart: item.start,
      time: `${formatTime(item.start)} - ${formatTime(item.end)}`,
      title: item.title,
    });
  });

  if (includes.lunch) {
    schedule.push({
      rawStart: lunchTime,
      time: formatTime(lunchTime),
      title: "Lunch",
    });
  }

  if (includes.workout) {
    schedule.push({
      rawStart: workoutTime,
      time: formatTime(workoutTime),
      title: "Workout",
      note: "Move your body. Build momentum.",
    });
  }

  if (includes.dinner) {
    schedule.push({
      rawStart: dinnerTime,
      time: formatTime(dinnerTime),
      title: "Dinner",
    });
  }

  if (includes.windDown) {
    schedule.push({
      rawStart: windDownTime,
      time: formatTime(windDownTime),
      title: "Wind Down",
      note: "No chaos before sleep. Set tomorrow up clean.",
    });
  }

  schedule.push({
    rawStart: bedTime,
    time: formatTime(bedTime),
    title: "Sleep",
  });

  return {
    date,
    goal,
    priorities: priorities.filter(Boolean),
    schedule: sortSchedule(schedule),
    quote: "Small actions repeated daily become extraordinary results.",
  };
}