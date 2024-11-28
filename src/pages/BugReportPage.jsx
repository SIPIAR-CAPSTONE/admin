import TopBar from '@/components/TopBar/TopBar'
import { columns } from '@/components/BugReport/column'
import { DataTable } from '@/components/DataTable/DataTable'
import { useEffect, useState } from 'react'
import supabase from '@/supabase/config'

const breadCrumbs = [{ name: 'Bug Reports', href: '/bug-reports' }]

export default function BugReportPage() {
  const [bugReports, setBugReports] = useState([])

  const fetchBugReports = async () => {
    const { data, error } = await supabase.from('bug_report').select(`
        bug_id,
        issue_type,
        issue_description,
        created_at,
        bystander:bystander_id (
          first_name,
          last_name,
          phone_number,
          email
        )
      `)

    if (error) {
      console.error('Error fetching bug reports:', error)
    } else {
      const formattedData = data.map((item) => ({
        id: String(item.bug_id),
        issueType: item.issue_type,
        issueDescription: item.issue_description,
        date: item.date,
        reporterName: `${item.bystander.first_name} ${item.bystander.last_name}`,
        phoneNumber: item.bystander.phone_number,
        email: item.bystander.email,
      }))

      setBugReports(formattedData)
    }
  }

  useEffect(() => {
    fetchBugReports()
  }, [])

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Bug Report"
          columns={columns}
          data={bugReports}
          searchColumn="issueType"
          func={fetchBugReports}
          statePropKeys={[
            'id',
            'issueDescription',
            'issueType',
            'email',
            'date',
          ]}
        />
      </div>
    </div>
  )
}
