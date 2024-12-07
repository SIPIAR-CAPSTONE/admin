import { clsx } from 'clsx'
import moment from 'moment'
import * as XLSX from 'xlsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getDateString(date) {
  //! also singapore time
  return moment(date).format('MMMM Do YYYY')
}

export function getDate(date) {
  return moment(date).format('YYYY-MM-DD')
}

export function getTime(date) {
  return moment(date).format('HH:mm:ss')
}

export function getTimeString(date) {
  return moment(date).format('h:mm A')
}

export function getTimeGap(datetimeCreated, isFormatted = true) {
  //! the timezone set in this is SINGAPORE TIME, singapore is ahead of PH 1 day
  const createdDate = moment(datetimeCreated).toDate()
  const currentDate = moment().toDate()
  const MILLISECONDS_IN_A_MINUTE = 1000 * 60
  const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60
  const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24
  const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_DAY * 30

  const differenceInMillis = Math.abs(currentDate - createdDate)

  const monthsDifference = Math.floor(
    differenceInMillis / MILLISECONDS_IN_A_MONTH,
  )
  const daysDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_MONTH) / MILLISECONDS_IN_A_DAY,
  )
  const hoursDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR,
  )
  const minutesDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE,
  )

  if (isFormatted) {
    return formatTimeGap(
      monthsDifference,
      daysDifference,
      hoursDifference,
      minutesDifference,
    )
  }

  return [monthsDifference, daysDifference, hoursDifference, minutesDifference]
}

const formatTimeGap = (months, days, hours, minutes) => {
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
}

// filter data table with exact match
export const exactMatchFilter = (row, columnId, filterValue) => {
  if (!filterValue || filterValue.length === 0) return true // No filter set
  return filterValue.includes(row.getValue(columnId))
}

export const downloadExcel = (data, fileName) => {
  const formattedData = []

  data.forEach((record, index) => {
    // Add each key-value pair as a new row
    Object.keys(record).forEach((key) => {
      formattedData.push({ Field: key, Value: record[key] })
    })
    // Add an empty row to separate records, if not the last record
    if (index < data.length - 1) {
      formattedData.push({})
    }
  })

  // Convert the vertically formatted data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData)

  // Adjust column width based on data
  worksheet['!cols'] = [
    { wch: 40 }, // Field column width
    { wch: 30 }, // Value column width
  ]

  // Apply bold styling to 'Field' column headers for visual distinction
  const range = XLSX.utils.decode_range(worksheet['!ref'])
  for (let row = range.s.r; row <= range.e.r; row++) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: 0 })]
    if (cell) {
      cell.s = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'D3D3D3' } }, // Light gray background
        alignment: { horizontal: 'left' },
      }
    }
  }

  // Create a new workbook, append the worksheet, and save the file
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DataSheet')
  const fileNameWithExtension = `${fileName}.xlsx`
  XLSX.writeFile(workbook, fileNameWithExtension)
}

export const getPagination = (page, size) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}
