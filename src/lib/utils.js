import { clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDateString(date) {
  return moment(date).format("MMMM Do YYYY");
}

export function getDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function getTime(date) {
  return moment(date).format("HH:mm:ss");
}

export function getTimeGap(datetimeCreated, isFormatted = true) {
  const createdDate = moment(datetimeCreated).toDate();
  const currentDate = moment().toDate();

  const MILLISECONDS_IN_A_MINUTE = 1000 * 60;
  const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
  const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
  const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_DAY * 30;

  const differenceInMillis = Math.abs(currentDate - createdDate);

  const monthsDifference = Math.floor(
    differenceInMillis / MILLISECONDS_IN_A_MONTH
  );
  const daysDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_MONTH) / MILLISECONDS_IN_A_DAY
  );
  const hoursDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR
  );
  const minutesDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE
  );

  if (isFormatted) {
    return formatTimeGap(
      monthsDifference,
      daysDifference,
      hoursDifference,
      minutesDifference
    );
  }

  return [monthsDifference, daysDifference, hoursDifference, minutesDifference];
}

const formatTimeGap = (months, days, hours, minutes) => {
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
};
