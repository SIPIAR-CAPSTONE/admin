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
    const { data, error } = await supabase.from('verification_request').select()

    if (error) {
      console.error('Error fetching bystander data:', error)
    } else {
      console.log('data verif page', data)

      const formattedData = data.map((item) => ({
        id: String(item.request_id),
        bystanderId: String(item.bystander_id),
        firstName: item.first_name,
        middleName: item.middle_name,
        lastName: item.last_name,
        suffix: item.suffix,
        birthDate: item.birth_date,
        phoneNumber: item.phone_number,
        city: 'Cagayan de Oro City',
        barangay: item.barangay,
        street: item.street,
        houseNumber: item.house_number,
        email: item.email,
        request_date: item.request_date,
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
