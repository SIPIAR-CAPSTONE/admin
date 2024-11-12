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
