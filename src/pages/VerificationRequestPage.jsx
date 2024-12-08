import TopBar from '@/components/TopBar/TopBar'
import { columns } from '@/components/VerificationRequest/column'
import { DataTable } from '@/components/DataTable/DataTable'
import supabase from '@/supabase/config'
import { useEffect, useState } from 'react'

const breadCrumbs = [
  { name: 'Verification Request', href: '/verification-request' },
]

export default function VerificationRequestPage() {
  const [bystanderData, setBystanderData] = useState([])

  const fetchBystanderData = async () => {
    const { data, error } = await supabase.from('VERIFICATION REQUEST')
    .select(`
      *,
      USER:user_id (
        *
      )`
    )

    if (error) {
      console.error('Error fetching bystander data:', error)
    } else {
      console.log('VERIFICATION - REQ', data)

      const formattedData = data.map((item) => ({
        id: String(item.request_id),
        bystanderId: String(item.user_id),
        firstName: item.USER.first_name,
        middleName: item.USER.middle_name,
        lastName: item.USER.last_name,
        suffix: item.USER.suffix,
        birthDate: item.USER.birth_date,
        phoneNumber: item.USER.phone_number,
        city: 'Cagayan de Oro City',
        barangay: item.USER.barangay,
        street: item.USER.street,
        houseNumber: item.USER.house_number,
        email: item.USER.email,
        request_date: item.USER.request_date
      }))

      setBystanderData(formattedData)
    }
  }

  useEffect(() => {
    fetchBystanderData()
  }, [])

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Verification Request"
          columns={columns}
          data={bystanderData}
          searchColumn="email"
          func={fetchBystanderData}
          statePropKeys={[
            'id',
            'bystanderId',
            'firstName',
            'middleName',
            'lastName',
            'suffix',
            'birthDate',
            'phoneNumber',
            'city',
            'barangay',
            'street',
            'houseNumber',
            'email',
            'request_date',
          ]}
        />
      </div>
    </div>
  )
}
