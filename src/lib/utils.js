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
