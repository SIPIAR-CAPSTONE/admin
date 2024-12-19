import moment from "moment";

export function organizeAnalyticsData(
  topSummary,
  incidentOverview,
  peakTimeIncident
) {
  const organizedData = {
    total_incidents: topSummary[0].value,
    total_incidents_increase_this_month: topSummary[0].increase,
    total_bystanders: topSummary[1].value,
    total_bystanders_increase_this_month: topSummary[1].increase,
    verified_bystanders: topSummary[2].value,
    verified_bystanders_increase_this_month: topSummary[2].increase,
    responder_average_response_time: topSummary[3].value,
    january_incidents: incidentOverview[0].incidents,
    february_incidents: incidentOverview[1].incidents,
    march_incidents: incidentOverview[2].incidents,
    april_incidents: incidentOverview[3].incidents,
    may_incidents: incidentOverview[4].incidents,
    june_incidents: incidentOverview[5].incidents,
    july_incidents: incidentOverview[6].incidents,
    august_incidents: incidentOverview[7].incidents,
    september_incidents: incidentOverview[8].incidents,
    october_incidents: incidentOverview[9].incidents,
    november_incidents: incidentOverview[10].incidents,
    december_incidents: incidentOverview[11].incidents,
    "12AM-3AM_Incidents": peakTimeIncident[0].incidents,
    "3AM-6AM_Incidents": peakTimeIncident[1].incidents,
    "6AM-9AM_Incidents": peakTimeIncident[2].incidents,
    "9AM-12PM_Incidents": peakTimeIncident[3].incidents,
    "12PM-3PM_Incidents": peakTimeIncident[4].incidents,
    "3PM-6PM_Incidents": peakTimeIncident[5].incidents,
    "6PM-9PM_Incidents": peakTimeIncident[6].incidents,
    "9PM-12AM_Incidents": peakTimeIncident[7].incidents,
  };

  return [organizedData];
}

export function getResponseTimeDuration(
  incidentRequestedTime,
  responseTime,
  format = false
) {
  const start = moment(incidentRequestedTime);
  const end = moment(responseTime);
  const duration = moment.duration(end.diff(start));

  // Calculate total hours and minutes
  const totalMinutes = duration.asMinutes();
  const totalHours = duration.asHours();

  if (format) {
    return formatDuration(totalHours, totalMinutes);
  }
  return totalMinutes;
}

function formatDuration(totalHours, totalMinutes) {
  if (totalHours >= 1) {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}.${minutes} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${Math.round(totalMinutes)} minute${totalMinutes > 1 ? "s" : ""}`;
  }
}

export function getAverageResponseTimeInMinutes(responseTimes) {
  const totalMinutes = responseTimes.reduce((total, time) => total + time, 0);
  return totalMinutes / responseTimes.length;
}

export function formatMinutesTime(durationInMinutes) {
  if (durationInMinutes >= 60) {
    const hours = (durationInMinutes / 60).toFixed(1);
    return `${hours} hours`;
  } else {
    const minutes = Math.round(durationInMinutes);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
}
