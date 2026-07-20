import {
  getSortTime,
  sortSchedule,
} from "./scheduleHelpers";
import { addMinutes, formatTime, timeToMinutes, minutesToTime } from "./timeHelpers";

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
  let startMinutes = timeToMinutes(start);
  let endMinutes = timeToMinutes(end);

  if (endMinutes <= startMinutes) {
    endMinutes += 1440;
  }

  return endMinutes - startMinutes;
}

function normalizeTimeForDay(time, wakeTime) {
  let minutes = timeToMinutes(time);
  const wakeMinutes = timeToMinutes(wakeTime);

  if (minutes < wakeMinutes) {
    minutes += 1440;
  }

  return minutes;
}

function overlapsRange(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getEventEnd(item, defaultDuration = 30) {
  if (item.sortEnd !== undefined) return item.sortEnd;
  if (item.sortTime !== undefined) return item.sortTime + defaultDuration;

  return timeToMinutes(addMinutes(item.rawStart, defaultDuration));
}

function moveAfterScheduleConflict(start, durationMinutes, schedule, bufferMinutes = RULES.buffer) {
  let currentStart = start;
  let moved = true;

  while (moved) {
    moved = false;
    const currentEnd = addMinutes(currentStart, durationMinutes);

    const conflict = schedule.find((item) => {
      if (item.sortTime === undefined) return false;

      const itemEnd = getEventEnd(item);

      return overlapsRange(
        getSortTime(currentStart, schedule[0].rawStart),
        getSortTime(currentEnd, schedule[0].rawStart),
        item.sortTime,
        itemEnd
      );
    });

    if (conflict) {
      currentStart = minutesToTime(getEventEnd(conflict) + bufferMinutes);
      moved = true;
    }
  }

  return currentStart;
}

function fitsBeforeBed(
  start,
  durationMinutes,
  wakeTime,
  bedTime
) {
  const startMinutes = normalizeTimeForDay(start, wakeTime);

  let bedMinutes = normalizeTimeForDay(bedTime, wakeTime);

  if (bedMinutes <= timeToMinutes(wakeTime)) {
    bedMinutes += 1440;
  }

  const endMinutes = startMinutes + durationMinutes;

  return endMinutes <= bedMinutes;
}

function getSleepDurationMinutes(wakeTime, bedTime) {
  const awakeMinutes = getDurationMinutes(
    wakeTime,
    bedTime
  );

  return 1440 - awakeMinutes;
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

function getLunchTime(commitments, wakeTime) {
  const work = getWorkCommitment(commitments);

  if (!work) return "12:00";

  const workStart = timeToMinutes(work.start);
  const workEnd = timeToMinutes(work.end);

  // If work starts after lunch window, eat before work
  if (workStart >= timeToMinutes("15:00")) {
    return "12:00";
  }

  // If work overlaps lunch window, eat after work
  if (
    workStart <= timeToMinutes("13:30") &&
    workEnd >= timeToMinutes("11:30")
  ) {
    return addMinutes(work.end, RULES.buffer);
  }

  return "12:00";
}

function createWarning(message) {
  return message;
}

function fillProductiveGaps(schedule, includes) {

  if (!includes.deepWork) {
    return schedule;
  }

  const updatedSchedule = [...schedule];

  const MAX_ADDITIONAL_BLOCKS = 6;
  const MAX_TOTAL_DEEP_WORK_MINUTES = 360;
  const MINIMUM_GAP = 45;

  let blocksAdded = 0;

  while (blocksAdded < MAX_ADDITIONAL_BLOCKS) {
    const sortedSchedule = [...updatedSchedule].sort(
      (a, b) => a.sortTime - b.sortTime
    );

    const usableGaps = [];

    for (
      let index = 0;
      index < sortedSchedule.length - 1;
      index++
    ) {
      const currentItem = sortedSchedule[index];
      const nextItem = sortedSchedule[index + 1];

      if (
        currentItem.sortTime === undefined ||
        nextItem.sortTime === undefined
      ) {
        continue;
      }

      const currentEnd =
        currentItem.sortEnd ??
        currentItem.sortTime;

      const gapStart =
        currentEnd + RULES.buffer;

      const gapEnd =
        nextItem.sortTime - RULES.buffer;

      const availableMinutes =
        gapEnd - gapStart;

      if (availableMinutes >= MINIMUM_GAP) {
        usableGaps.push({
          start: gapStart,
          end: gapEnd,
          duration: availableMinutes,
        });
      }
    }

    if (usableGaps.length === 0) {
      break;
    }

    usableGaps.sort(
      (a, b) => b.duration - a.duration
    );

    const bestGap = usableGaps[0];

    let blockDuration;

    if (bestGap.duration >= 120) {
      blockDuration = 90;
    } else if (bestGap.duration >= 75) {
      blockDuration = 60;
    } else {
      blockDuration = 45;
    }

    const startTime =
      minutesToTime(bestGap.start);

    const endTime =
      minutesToTime(
        bestGap.start + blockDuration
      );


    const title = "Deep Work Session";

    const note =
      `${blockDuration} minutes. Use this block to make progress on your daily goal or top priorities.`;

    updatedSchedule.push({
      rawStart: startTime,
      rawEnd: endTime,
      sortTime: bestGap.start,
      sortEnd:
        bestGap.start + blockDuration,
      time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      title,
      note,
    });

    blocksAdded += 1;
  }

  return updatedSchedule;
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

  const sleepDurationMinutes =
    getSleepDurationMinutes(wakeTime, bedTime);

  if (
    sleepDurationMinutes < 390 ||
    sleepDurationMinutes > 480
  ) {
    const sleepHours = (
      sleepDurationMinutes / 60
    ).toFixed(1);

    warnings.push(
      `Your selected schedule allows approximately ${sleepHours} hours of sleep. Sleep is crucial for productivity, recovery, and focus. Aim for 6.5 to 8 hours each night.`
    );
  }

  const invalidCommitment = commitments.find((item) => {
    if (!item.title || !item.start || !item.end) return false;

    const wake = timeToMinutes(wakeTime);
    let bed = timeToMinutes(bedTime);

    if (bed <= wake) {
      bed += 1440;
    }

    const start = normalizeTimeForDay(item.start, wakeTime);
    const end = normalizeTimeForDay(item.end, wakeTime);

    return start < wake || end > bed || end <= start;
  });

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
    sortTime: getSortTime(wakeTime, wakeTime),
    time: formatTime(wakeTime),
    title: "Wake Up",
  });

  if (includes.breakfast) {
    const breakfastTime = addMinutes(wakeTime, 30);

    schedule.push({
      rawStart: breakfastTime,
      rawEnd: addMinutes(breakfastTime, RULES.meals.breakfast),
      sortTime: getSortTime(breakfastTime, wakeTime),
      time: formatTime(breakfastTime),
      title: "Breakfast",
    });
  }

  commitments.filter(isValidCommitment).forEach((item) => {
    schedule.push({
      rawStart: item.start,
      rawEnd: item.end,
      sortTime: getSortTime(item.start, wakeTime),
      sortEnd: getSortTime(item.end, wakeTime),
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

    if (fitsBeforeBed(
        deepWorkStart,
        deepWorkDuration,
        wakeTime,
        bedTime
      )) {
      const deepWorkEnd = addMinutes(deepWorkStart, deepWorkDuration);

      schedule.push({
        rawStart: deepWorkStart,
        rawEnd: deepWorkEnd,
        sortTime: getSortTime(deepWorkStart, wakeTime),
        sortEnd: getSortTime(deepWorkEnd, wakeTime),
        time: `${formatTime(deepWorkStart)} - ${formatTime(deepWorkEnd)}`,
        title: "Deep Work Session",
        note: `${deepWorkDuration} minutes of focused work before distractions take over.`,
      });

    } else {
      warnings.push(
        createWarning("Deep Work could not fit into this schedule.")
      );
    }
  }

  if (includes.lunch) {
    let lunchTime = getLunchTime(commitments, wakeTime);

    lunchTime = moveAfterScheduleConflict(
      lunchTime,
      RULES.meals.lunch,
      schedule
    );

    if (fitsBeforeBed(
      lunchTime,
      RULES.meals.lunch,
      wakeTime,
      bedTime
    )) {
      schedule.push({
        rawStart: lunchTime,
        rawEnd: addMinutes(lunchTime, RULES.meals.lunch),
        sortTime: getSortTime(lunchTime, wakeTime),
        sortEnd: getSortTime(addMinutes(lunchTime, RULES.meals.lunch), wakeTime),
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

    if (fitsBeforeBed(
      workoutTime,
      workoutDuration,
      wakeTime,
      bedTime
    )) {
      const workoutEnd = addMinutes(workoutTime, workoutDuration);

      schedule.push({
        rawStart: workoutTime,
        rawEnd: workoutEnd,
        sortTime: getSortTime(workoutTime, wakeTime),
        sortEnd: getSortTime(workoutEnd, wakeTime),
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

    if (fitsBeforeBed(
      dinnerTime,
      RULES.meals.dinner,
      wakeTime,
      bedTime
    )) {
      schedule.push({
        rawStart: dinnerTime,
        rawEnd: addMinutes(dinnerTime, RULES.meals.dinner),
        sortTime: getSortTime(dinnerTime, wakeTime),
        sortEnd: getSortTime(addMinutes(dinnerTime, RULES.meals.dinner), wakeTime),
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
    let windDownTime = addMinutes(bedTime, -RULES.windDown);

    windDownTime = moveAfterScheduleConflict(
      windDownTime,
      RULES.windDown,
      schedule,
      0
    );

    if (fitsBeforeBed(
      windDownTime,
      RULES.windDown,
      wakeTime,
      bedTime
    )) {
      schedule.push({
        rawStart: windDownTime,
        rawEnd: bedTime,
        sortTime: getSortTime(windDownTime, wakeTime),
        sortEnd: getSortTime(bedTime, wakeTime),
        time: `${formatTime(windDownTime)} - ${formatTime(bedTime)}`,
        title: "Wind Down",
        note: "No chaos before sleep. Set tomorrow up clean.",
      });
    } else {
      warnings.push("Wind Down could not fit before bedtime.");
    }
  }

  schedule.push({
    rawStart: bedTime,
    rawEnd: bedTime,
    sortTime: getSortTime(bedTime, wakeTime),
    time: formatTime(bedTime),
    title: "Sleep",
  });

  const finalSchedule = fillProductiveGaps(
    schedule,
    includes
  );

  return {
    date,
    goal,
    priorities: priorities.filter(Boolean),
    schedule: sortSchedule(finalSchedule, wakeTime),
    warnings,
    quote: "Small actions repeated daily become extraordinary results.",
  };
}