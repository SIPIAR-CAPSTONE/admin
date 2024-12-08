import { clsx } from "clsx";
import moment from "moment";
import { convertDistance, getPreciseDistance } from "geolib";
import * as XLSX from "xlsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDateString(date) {
  //! also singapore time
  return moment(date).format("MMMM Do YYYY");
}

export function getDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function getTime(date) {
  return moment(date).format("HH:mm:ss");
}

export function getTimeString(date) {
  return moment(date).format("h:mm A");
}

//* get the time gap between the given date and the current date
export const getTimeGap = (datetimeCreated) => {
  if (!datetimeCreated) return " ";

  return moment(datetimeCreated).fromNow();
};

//* the distance between user device location and the given selected location coordinate
export function getDistanceGap(userCoordinate, selectedCoordinate) {
  //handle empty or falsy coordiantes
  if (
    isInvalidCoordinate(userCoordinate) ||
    isInvalidCoordinate(selectedCoordinate)
  ) {
    return " - ";
  }

  const gapDistance = getPreciseDistance(userCoordinate, selectedCoordinate);
  const distanceLength = String(gapDistance).length;
  const formattedGapDistance =
    distanceLength > 2
      ? `${convertDistance(gapDistance, "km").toFixed(1)} km`
      : `${gapDistance} m`;

  return formattedGapDistance;
}

//check if user or selected coordinates are empty or falsy
const isInvalidCoordinate = (coordinate) => {
  return (
    !coordinate ||
    !coordinate.longitude ||
    !coordinate.latitude ||
    (typeof coordinate === "object" && Object.keys(coordinate).length === 0)
  );
};

// filter data table with exact match
export const exactMatchFilter = (row, columnId, filterValue) => {
  if (!filterValue || filterValue.length === 0) return true; // No filter set
  return filterValue.includes(row.getValue(columnId));
};

export const downloadExcel = (data, fileName) => {
  const formattedData = [];

  data.forEach((record, index) => {
    // Add each key-value pair as a new row
    Object.keys(record).forEach((key) => {
      formattedData.push({ Field: key, Value: record[key] });
    });
    // Add an empty row to separate records, if not the last record
    if (index < data.length - 1) {
      formattedData.push({});
    }
  });

  // Convert the vertically formatted data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Adjust column width based on data
  worksheet["!cols"] = [
    { wch: 40 }, // Field column width
    { wch: 30 }, // Value column width
  ];

  // Apply bold styling to 'Field' column headers for visual distinction
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let row = range.s.r; row <= range.e.r; row++) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
    if (cell) {
      cell.s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "D3D3D3" } }, // Light gray background
        alignment: { horizontal: "left" },
      };
    }
  }

  // Create a new workbook, append the worksheet, and save the file
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "DataSheet");
  const fileNameWithExtension = `${fileName}.xlsx`;
  XLSX.writeFile(workbook, fileNameWithExtension);
};

export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
