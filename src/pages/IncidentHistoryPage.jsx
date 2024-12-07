import TopBar from '@/components/TopBar/TopBar'
import { columns } from '@/components/IncidentHistory/column'
import { DataTable } from '@/components/DataTable/DataTable'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import supabase from '@/supabase/config'

const filterOptions = [
  {
    label: 'Stable',
    value: 'stable',
    icon: ThumbsUp,
  },
  {
    label: 'Unstable',
    value: 'not stable',
    icon: ThumbsDown,
  },
]

const breadCrumbs = [{ name: 'Incident History', href: '' }]

export default function IncidentHistoryPage() {
  const [incidentHistory, setIncidentHistory] = useState([])

  const fetchIncidentHistory = async () => {
    const { data, error } = await supabase
      .from('broadcast')
      .select(
        `
        broadcast_id,
        address,
        barangay,
        landmark,
        created_at,
        incident_history (
            incident_id,
            emergency_type,
            condition,
            remarks,
            is_created
        ),
        bystander:user_id (
            first_name,
            last_name,
            phone_number
        ),
        responder:responder_id (
            email
        )
    `,
      )

    if (error) {
      console.error('Error fetching bug reports:', error)
    } else {
      console.log('data fetching', JSON.stringify(data), 2)
      const formattedData = data.map((item) => {
        const incident = item.incident_history?.[0] || {}

        return {
          broadcastId: item.broadcast_id,
          id: incident.incident_id || item.broadcast_id,
          reporterName: item.bystander
            ? `${item.bystander.first_name} ${item.bystander.last_name}`
            : 'Unknown Reporter',
          emergencyType: incident.emergency_type || 'N/A',
          date: item.created_at || 'N/A',
          phoneNumber: item.bystander?.phone_number || 'N/A',
          condition: incident.condition || 'N/A',
          barangay: item.barangay || 'N/A',
          landmark: item.landmark || 'N/A',
          location: item.address || 'N/A',
          remarks: incident.remarks || 'N/A',
          email: item.responder?.email || 'N/A'
        }
      })

      setIncidentHistory(formattedData)
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
            'email'
          ]}
        />
      </div>
    </div>
  )
}
