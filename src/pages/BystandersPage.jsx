import TopBar from '@/components/TopBar/TopBar'
import { columns } from '@/components/Bystander/column'
import { DataTable } from '@/components/DataTable/DataTable'
import { Badge, BadgeCheck } from 'lucide-react'
import supabase from '@/supabase/config'
import { useEffect, useState } from 'react'

const breadCrumbs = [{ name: 'Bystanders', href: '/bystander' }]

const filters = {
  filterOptions: [
    {
      label: 'Yes',
      value: true,
      icon: BadgeCheck,
    },
    {
      label: 'No',
      value: false,
      icon: Badge,
    },
  ],
}

export default function BystandersPage() {
  const [bystanderData, setBystanderData] = useState([])

  useEffect(() => {
    const fetchBystanderData = async () => {
      const { data, error } = await supabase.from('bystander').select(`
        *,
        verification_request:verification_request!user_id (
          created_at
        )
      `)

      if (error) {
        console.error('Error fetching bystander data:', error)
      } else {
        console.log('data', data)

        const formattedData = data.map((item) => ({
          id: String(item.id),
          firstName: item.first_name,
          middleName: item.middle_name,
          lastName: item.last_name,
          suffix: item.suffix,
          birthDate: item.birth_date,
          phoneNumber: item.phone_number,
          barangay: item.barangay,
          street: item.street,
          houseNumber: item.house_number,
          email: item.email,
          isVerified: item.isVerified,
          verifiedDate:
            item.verification_request.length > 0
              ? item.verification_request[0].created_at 
              : null,
        }))

        setBystanderData(formattedData)
      }
    }

    fetchBystanderData()

    const channel = supabase
      .channel('bystander-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bystander' },
        (payload) => {
          console.log('Change received!', payload)
          fetchBystanderData()
        },
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Bystanders"
          columns={columns}
          data={bystanderData}
          searchColumn="email"
          filterTitle="Verified"
          filterColumn="isVerified"
          filterOptions={filters.filterOptions}
          statePropKeys={[
            'id',
            'firstName',
            'middleName',
            'lastName',
            'suffix',
            'birthDate',
            'phoneNumber',
            'barangay',
            'street',
            'houseNumber',
            'isVerified',
            'verifiedDate',
          ]}
        />
      </div>
    </div>
  )
}
