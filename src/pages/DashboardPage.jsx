import { Timer, OctagonAlert, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import moment from 'moment'

import AnalyticsCard from '@/components/Dashboard/AnalyticCard'
import TopBar from '@/components/TopBar/TopBar'
import IncidentOverviewGraph from '@/components/Dashboard/IncidentOverviewChart'
import H1 from '@/components/ui/H1'
import { PeakTimeIncidentChart } from '@/components/Dashboard/PeakTimeIncidentChart'
import { Button } from '@/components/ui/button'
import {
  formatMinutesTime,
  getAverageResponseTimeInMinutes,
  getResponseTimeDuration,
  organizeAnalyticsData,
} from '@/components/Dashboard/dashboard.helper'
import { downloadExcel } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import supabase from '@/supabase/config'
import AnalyticsCardSkeleton from '@/components/Skeletons/AnalyticsCardSkeleton'
import useActiveUsers from '@/hooks/useActiveUser'

const data = {
  breadcrumbs: [
    {
      name: 'Dashboard',
      href: 'dashboard',
    },
  ],
}

export default function DashboardPage() {
  const { totalActiveUsers, loading: activeUsersLoading } = useActiveUsers(10)

  const [isConfirmationDialogOpen, setConfirmationIsDialogOpen] = useState(
    false,
  )
  const openConfirmationDialog = () => setConfirmationIsDialogOpen(true)
  const [loading, setLoading] = useState(false)
  const [topSummary, setTopSummary] = useState([])

  const [incidentOverviewChartData, setIncidentOverviewChartData] = useState([])

  const [peakTimeChartData, setPeakTimeChartData] = useState([
    {
      timeBlock: '12 AM - 3 AM',
      incidents: 0,
      fill: 'var(--color-twelveAmToThreeAm)',
    },
    {
      timeBlock: '3 AM - 6 AM',
      incidents: 0,
      fill: 'var(--color-threeAmToSixAm)',
    },
    {
      timeBlock: '6 AM - 9 AM',
      incidents: 0,
      fill: 'var(--color-sixAmToNineAm)',
    },
    {
      timeBlock: '9 AM - 12 PM',
      incidents: 0,
      fill: 'var(--color-nineAmToTwelvePm)',
    },
    {
      timeBlock: '12 PM - 3 PM',
      incidents: 0,
      fill: 'var(--color-twelvePmToThreePm)',
    },
    {
      timeBlock: '3 PM - 6 PM',
      incidents: 0,
      fill: 'var(--color-threePmToSixPm)',
    },
    {
      timeBlock: '6 PM - 9 PM',
      incidents: 0,
      fill: 'var(--color-sixPmToNinePm)',
    },
    {
      timeBlock: '9 PM - 12 AM',
      incidents: 0,
      fill: 'var(--color-ninePmToTwelveAm)',
    },
  ])

  const fetchTotalIncidents = async () => {
    try {
      setLoading(true)

      const { data: peakMonth } = await supabase
        .from('BROADCAST')
        .select('*')
        .not('date', 'is', null)

      console.log('PEAK MONTH: ', peakMonth)

      const currentDayIncidents = peakMonth.filter(
        (record) => new Date(record.date).getDay() === moment().day(),
      ).length

      const currentMonthIncidents = peakMonth.filter(
        (record) =>
          new Date(record.date).getMonth() === moment().month() &&
          new Date(record.date).getFullYear() === moment().year(),
      ).length

      const previousIncidents = peakMonth.filter(
        (record) => new Date(record.date).getMonth() !== moment().month(),
      ).length

      //remove not yet responded incidents
      const respondedIncidents = peakMonth.filter(
        (record) => record.response_time !== null,
      )
      //get response time for each incidents
      const incidentsResponseTime = respondedIncidents.map((record) =>
        getResponseTimeDuration(record.date, record.response_time),
      )
      const averageResponseTime = getAverageResponseTimeInMinutes(
        incidentsResponseTime,
      )
      const averageResponseTimeFormatted = formatMinutesTime(
        averageResponseTime,
      )

      setTopSummary([
        {
          id: 1,
          title: 'Active Users',
          value: totalActiveUsers,
          icon: Users,
        },
        {
          id: 2,
          title: 'Todays Incidents',
          value: currentDayIncidents,
          description: 'Total incidents today',
          icon: OctagonAlert,
        },
        {
          id: 3,
          title: 'Overall Total Incidents',
          value: previousIncidents + currentMonthIncidents,
          valuePostfix: '',
          increase: currentMonthIncidents,
          description: 'added this month',
          icon: OctagonAlert,
        },
        {
          id: 4,
          title: 'Average Response Time',
          value: averageResponseTimeFormatted,
          icon: Timer,
        },
      ])

      const counts = {}

      // Calculate counts for the last 12 months
      for (let i = 0; i < 12; i++) {
        const startOfMonth = moment().subtract(i, 'months').startOf('month')
        const endOfMonth = moment().subtract(i, 'months').endOf('month')
        const monthName = startOfMonth.format('MMM') // Get the month name (e.g., Jan, Feb)

        counts[monthName] = peakMonth.filter((record) =>
          moment(record.date).isBetween(startOfMonth, endOfMonth, null, '[]'),
        ).length
      }

      // Convert counts to chart data in chronological order
      const incidentOverviewChartData = Object.entries(counts)
        .reverse() // Ensure the order is chronological (oldest to newest)
        .map(([month, incidents]) => ({ month, incidents }))

      setIncidentOverviewChartData(incidentOverviewChartData)

      const { data, error } = await supabase
        .from('BROADCAST')
        .select('date')
        .not('date', 'is', null)

      if (error) {
        console.error('Error fetching data:', error)
        return
      } else {
        console.log('date data', data)
      }

      const countsTime = {
        '12 AM - 3 AM': 0,
        '3 AM - 6 AM': 0,
        '6 AM - 9 AM': 0,
        '9 AM - 12 PM': 0,
        '12 PM - 3 PM': 0,
        '3 PM - 6 PM': 0,
        '6 PM - 9 PM': 0,
        '9 PM - 12 AM': 0,
      }

      data.forEach((record) => {
        console.log('Record date:', record.date)
        const recordDate = moment(record.date)

        // Check if the record date is within the last 12 months
        if (recordDate.isAfter(moment().subtract(12, 'months'))) {
          const hour = new Date(record.date).getHours()
          if (hour >= 0 && hour < 3) countsTime['12 AM - 3 AM']++
          else if (hour >= 3 && hour < 6) countsTime['3 AM - 6 AM']++
          else if (hour >= 6 && hour < 9) countsTime['6 AM - 9 AM']++
          else if (hour >= 9 && hour < 12) countsTime['9 AM - 12 PM']++
          else if (hour >= 12 && hour < 15) countsTime['12 PM - 3 PM']++
          else if (hour >= 15 && hour < 18) countsTime['3 PM - 6 PM']++
          else if (hour >= 18 && hour < 21) countsTime['6 PM - 9 PM']++
          else if (hour >= 21 && hour < 24) countsTime['9 PM - 12 AM']++
        } else {
          console.log('Date not within the last 12 months:', record.date)
        }
      })

      const updatedData = peakTimeChartData.map((block) => ({
        ...block,
        incidents: countsTime[block.timeBlock],
      }))

      setPeakTimeChartData(updatedData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTotalIncidents()

    const channels = supabase
      .channel('broadcast-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'BROADCAST' },
        async () => {
          fetchTotalIncidents()
        },
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }
  }, [])

  const updateTopSummaryActiveUsers = () => {
    if (activeUsersLoading || loading) return

    setTopSummary((prevTopSummary) => {
      let newTopSummary = [...prevTopSummary]
      newTopSummary[0] = {
        id: 1,
        title: 'Active Users',
        value: totalActiveUsers,
        icon: Users,
      }

      return newTopSummary
    })
  }

  useEffect(() => {
    if ((!activeUsersLoading, !loading)) {
      updateTopSummaryActiveUsers()
    }
  }, [activeUsersLoading, loading])

  const handleDownload = () => {
    const formattedAnalyticData = organizeAnalyticsData(
      topSummary,
      incidentOverviewChartData,
      peakTimeChartData,
    )

    const timestamp = moment().format('YYYY-MM-DD')
    const fileName = `Analytics-Report_${timestamp}`
    downloadExcel(formattedAnalyticData, fileName)
  }

  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pt-2 pb-4 mx-auto space-y-4 2xl:pt-4 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          <H1>Analytics Dashboard</H1>
          <Button onClick={openConfirmationDialog}>Download</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading
            ? topSummaryPlaceholder.map((item) => (
                <AnalyticsCardSkeleton
                  key={item.id}
                  title={item.title}
                  valuePostfix={item.valuePostfix}
                  Icon={item.icon}
                />
              ))
            : topSummary.map((item) => (
                <AnalyticsCard
                  key={item.id}
                  title={item.title}
                  value={item.value}
                  valuePostfix={item.valuePostfix}
                  increase={item.increase}
                  increasePostfix={item.increasePostfix}
                  description={item.description}
                  Icon={item.icon}
                />
              ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <IncidentOverviewGraph
            chartData={incidentOverviewChartData}
            className="md:col-span-4"
            loading={loading}
          />
          <PeakTimeIncidentChart
            chartData={peakTimeChartData}
            className="md:col-span-3"
            loading={loading}
          />
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        setOpen={setConfirmationIsDialogOpen}
        title="Download Analytics Report?"
        description="Are you sure you want to download the analytics report?"
        onConfirm={handleDownload}
      />
    </div>
  )
}

const topSummaryPlaceholder = [
  {
    id: 1,
    title: 'Active Users',
    value: null,
    icon: Users,
  },
  {
    id: 2,
    title: 'Todays Incidents',
    value: null,
    description: 'Total incidents today',
    icon: OctagonAlert,
  },
  {
    id: 3,
    title: 'Overall Total Incidents',
    value: null,
    valuePostfix: '',
    increase: null,
    description: 'added this month',
    icon: OctagonAlert,
  },
  {
    id: 4,
    title: 'Average Response Time',
    value: null,
    icon: Timer,
  },
]
