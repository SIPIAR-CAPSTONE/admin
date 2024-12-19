import moment from 'moment'
import TableHeadButton from '@/components/DataTable/TableHeadButton'
import { Badge } from '@/components/ui/badge'
import { capitalize, cn, exactMatchFilter } from '@/lib/utils'

export const columns = [
  {
    accessorKey: 'location',
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Location"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      return <div>{row.getValue('location')}</div>
    },
  },
  {
    accessorKey: 'barangay',
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Barangay"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      return <div>{row.getValue('barangay')}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Date"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const date = moment(row.getValue('date')).format('YYYY-MM-DD')
      return <div>{date}</div>
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Active Status"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <Badge
          className={cn(
            'rounded-md',
            status === 'Completed'
              ? 'bg-blue-500 dark:bg-blue-600 dark:text-white'
              : status === 'On Going'
              ? 'bg-green-500  dark:bg-green-600 dark:text-white'
              : 'bg-red-500  dark:bg-red-600 dark:text-white',
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'condition',
    accessorKey: 'condition',
    filterFn: exactMatchFilter,
    header: ({ column }) => {
      return (
        <TableHeadButton
          label="Condition"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const condition = capitalize(row.getValue('condition'))
      return (
        <Badge
          className={cn(
            'rounded-md',
            condition === 'Stable'
              ? 'bg-green-500  dark:bg-green-600 dark:text-white'
              : 'bg-red-500  dark:bg-red-600 dark:text-white',
          )}
        >
          {condition}
        </Badge>
      )
    },
  },
]
