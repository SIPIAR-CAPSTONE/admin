import TopBar from '@/components/TopBar/TopBar'
import { columns } from '@/components/IncidentHistory/column'
import { DataTable } from '@/components/DataTable/DataTable'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import supabase from '@/supabase/config'

const filterOptions = [
  {
    label: 'Stable',
    value: 'Stable',
    icon: ThumbsUp,
  },
  {
    label: 'Unstable',
    value: 'Unstable',
    icon: ThumbsDown,
  },
]

const breadCrumbs = [{ name: 'Incident History', href: '' }]

export default function IncidentHistoryPage() {
  const [incidentHistory, setIncidentHistory] = useState([])

  const fetchIncidentHistory = async () => {
    const { data, error } = await supabase.from('BROADCAST')
    .select(`
      *,
      USER:user_id (
        *
      ),
      RESPONDER:responder_id(
        *
      )`
    )

    if (error) {
      console.error('Error fetching bug reports:', error)
    } else {
      // console.log('data fetching', JSON.stringify(data), 2)
      console.log('data fetching', data)

      const formattedData = data.map((item) => ({
        broadcastId: item?.broadcast_id || 'N/A',
        id: item?.broadcast_id || 'N/A',
        reporterName: item.USER
          ? `${item?.USER?.first_name || ''} ${item?.USER?.last_name || ''}`.trim()
          : 'Unknown Reporter',
        emergencyType: item?.emergency_type || 'N/A',
        date: item?.date || 'N/A',
        phoneNumber: item?.USER?.phone_number || 'N/A',
        condition: item?.condition || 'N/A',
        barangay: item?.barangay || 'N/A',
        landmark: item?.landmark || 'N/A',
        location: item?.address || 'N/A',
        remarks: item?.remarks || 'N/A',
        email: item?.RESPONDER?.email || 'N/A',
        status: item?.status
      }));
      

      setIncidentHistory(formattedData)
      console.log('state -data', incidentHistory);
      console.log('formatted data', formattedData)
    }
  }

  useEffect(() => {
    fetchIncidentHistory()
  }, [])

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Incident History"
          columns={columns}
          data={incidentHistory}
          searchColumn="location"
          filterTitle="Condition"
          filterColumn="condition"
          filterOptions={filterOptions}
          func={fetchIncidentHistory}
          statePropKeys={[
            'id',
            'reporterName',
            'emergencyType',
            'date',
            'phoneNumber',
            'condition',
            'barangay',
            'landmark',
            'location',
            'remarks',
            'broadcastId',
            'email',
            'status'
          ]}
        />
      </div>
    </div>
  )
}
