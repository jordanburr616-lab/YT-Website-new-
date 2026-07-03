import { sortSchedule } from "./scheduleHelpers";
import { addMinutes, formatTime, timeToMinutes } from "./timeHelpers";

const RULES = {
  deepWork: {
    ideal: 90,
    medium: 60,
    minimum: 30,
  },
  workout: {
    ideal: 90,
    medium: 60,
    minimum: 30,
  },
  meals: {
    breakfast: 30,
    lunch: 30,
    dinner: 30,
  },
  windDown: 45,
  buffer: 15,
};

function isValidCommitment(item) {
  return item.title && item.start && item.end && item.end > item.start;
}

function getWorkCommitment(commitments) {
  return commitments.find(
    (item) =>
      item.title.toLowerCase() === "work" &&
      isValidCommitment(item)
  );
}

function getDurationMinutes(start, end) {
  return timeToMinutes(end) - timeToMinutes(start);
}

function overlapsRange(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getEventEnd(item, defaultDuration = 30) {
  if (item.rawEnd) return item.rawEnd;
  return addMinutes(item.rawStart, defaultDuration);
}

function moveAfterScheduleConflict(start, durationMinutes, schedule, bufferMinutes = RULES.buffer) {
  let currentStart = start;
  let moved = true;

  while (moved) {
    moved = false;
    const currentEnd = addMinutes(currentStart, durationMinutes);

    const conflict = schedule.find((item) => {
      if (!item.rawStart) return false;

      const itemEnd = getEventEnd(item);

      return overlapsRange(currentStart, currentEnd, item.rawStart, itemEnd);
    });

    if (conflict) {
      currentStart = addMinutes(getEventEnd(conflict), bufferMinutes);
      moved = true;
    }
  }

  return currentStart;
}

function fitsBeforeBed(start, durationMinutes, bedTime) {
  return addMinutes(start, durationMinutes) <= bedTime;
}

function getTotalCommitmentMinutes(commitments) {
  return commitments
    .filter(isValidCommitment)
    .reduce((total, item) => {
      return total + getDurationMinutes(item.start, item.end);
    }, 0);
}

function getFlexibleDurations({ wakeTime, bedTime, commitments }) {
  const awakeMinutes = getDurationMinutes(wakeTime, bedTime);
  const commitmentMinutes = getTotalCommitmentMinutes(commitments);
  const freeMinutes = awakeMinutes - commitmentMinutes;

  if (freeMinutes >= 420) {
    return {
      deepWorkDuration: RULES.deepWork.ideal,
      workoutDuration: RULES.workout.ideal,
    };
  }

  if (freeMinutes >= 300) {
    return {
      deepWorkDuration: RULES.deepWork.medium,
      workoutDuration: RULES.workout.medium,
    };
  }

  return {
    deepWorkDuration: RULES.deepWork.minimum,
    workoutDuration: RULES.workout.minimum,
  };
}

function getLunchTime(commitments) {
  const work = getWorkCommitment(commitments);

  if (!work) return "12:00";

  const workDuration = getDurationMinutes(work.start, work.end);

  if (workDuration >= 360) {
    return "12:00";
  }

  return addMinutes(work.end, RULES.buffer);
}

function createWarning(message) {
  return message;
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
  const warnings = [];

  const invalidCommitment = commitments.find(
    (item) =>
      item.title &&
      item.start &&
      item.end &&
      (item.start < wakeTime || item.end > bedTime || item.end <= item.start)
  );

  if (invalidCommitment) {
    return {
      date,
      goal,
      priorities: priorities.filter(Boolean),
      schedule: [],
      warnings: [],
      error:
        "One of your commitments is outside your wake/sleep window or has an invalid time range.",
      quote: "",
    };
  }

  const { deepWorkDuration, workoutDuration } = getFlexibleDurations({
    wakeTime,
    bedTime,
    commitments,
  });

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
      rawEnd: addMinutes(breakfastTime, RULES.meals.breakfast),
      time: formatTime(breakfastTime),
      title: "Breakfast",
    });
  }

  commitments.filter(isValidCommitment).forEach((item) => {
    schedule.push({
      rawStart: item.start,
      rawEnd: item.end,
      time: `${formatTime(item.start)} - ${formatTime(item.end)}`,
      title: item.title,
    });
  });

  if (includes.deepWork) {
    let deepWorkStart = addMinutes(wakeTime, includes.breakfast ? 60 : 30);
    deepWorkStart = moveAfterScheduleConflict(
      deepWorkStart,
      deepWorkDuration,
      schedule
    );

    if (fitsBeforeBed(deepWorkStart, deepWorkDuration, bedTime)) {
      const deepWorkEnd = addMinutes(deepWorkStart, deepWorkDuration);

      schedule.push({
        rawStart: deepWorkStart,
        rawEnd: deepWorkEnd,
        time: `${formatTime(deepWorkStart)} - ${formatTime(deepWorkEnd)}`,
        title: "Deep Work Session",
        note: `${deepWorkDuration} minutes of focused work before distractions take over.`,
      });

      if (includes.breaks) {
        let breakStart = deepWorkEnd;

        breakStart = moveAfterScheduleConflict(
          breakStart,
          15,
          schedule
        );

        const breakEnd = addMinutes(breakStart, 15);

        if (breakEnd <= bedTime) {
          schedule.push({
            rawStart: breakStart,
            rawEnd: breakEnd,
            time: `${formatTime(breakStart)} - ${formatTime(breakEnd)}`,
            title: "Short Break",
            note: "15 minutes. Step away from the screen.",
          });
        }
      }
    } else {
      warnings.push(
        createWarning("Deep Work could not fit into this schedule.")
      );
    }
  }

  if (includes.lunch) {
    let lunchTime = getLunchTime(commitments);

    lunchTime = moveAfterScheduleConflict(
      lunchTime,
      RULES.meals.lunch,
      schedule
    );

    if (fitsBeforeBed(lunchTime, RULES.meals.lunch, bedTime)) {
      schedule.push({
        rawStart: lunchTime,
        rawEnd: addMinutes(lunchTime, RULES.meals.lunch),
        time: formatTime(lunchTime),
        title: "Lunch",
      });
    } else {
      warnings.push("Lunch could not fit into this schedule.");
    }
  }

  if (includes.workout) {
    const workCommitment = getWorkCommitment(commitments);

    let workoutTime = addMinutes(wakeTime, 240);

    if (workCommitment?.start) {
      if (workCommitment.start >= "14:00") {
        workoutTime = addMinutes(workCommitment.start, -120);
      } else {
        workoutTime = addMinutes(workCommitment.end, 30);
      }
    }

    workoutTime = moveAfterScheduleConflict(
      workoutTime,
      workoutDuration,
      schedule
    );

    if (fitsBeforeBed(workoutTime, workoutDuration, bedTime)) {
      const workoutEnd = addMinutes(workoutTime, workoutDuration);

      schedule.push({
        rawStart: workoutTime,
        rawEnd: workoutEnd,
        time: `${formatTime(workoutTime)} - ${formatTime(workoutEnd)}`,
        title: "Workout",
        note: `${workoutDuration} minutes. Move your body. Build momentum.`,
      });
    } else {
      warnings.push(
        createWarning("Workout could not fit into this schedule.")
      );
    }
  }

  if (includes.dinner) {
    let dinnerTime = "18:30";

    dinnerTime = moveAfterScheduleConflict(
      dinnerTime,
      RULES.meals.dinner,
      schedule
    );

    if (fitsBeforeBed(dinnerTime, RULES.meals.dinner, bedTime)) {
      schedule.push({
        rawStart: dinnerTime,
        rawEnd: addMinutes(dinnerTime, RULES.meals.dinner),
        time: formatTime(dinnerTime),
        title: "Dinner",
      });
    } else {
      warnings.push(
        createWarning("Dinner could not fit before bedtime.")
      );
    }
  }

  if (includes.windDown) {
    const windDownTime = addMinutes(bedTime, -RULES.windDown);

    schedule.push({
      rawStart: windDownTime,
      rawEnd: bedTime,
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
    warnings,
    quote: "Small actions repeated daily become extraordinary results.",
  };
}