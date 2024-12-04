import { useState } from 'react'
import {
  BookUser,
  ClipboardList,
  EllipsisVertical,
  OctagonAlert,
} from 'lucide-react'

import InfoCard from '@/components/InfoCard/InfoCard'
import InfoCardField from '@/components/InfoCard/InfoCardField'
import TopBar from '@/components/TopBar/TopBar'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import H1 from '@/components/ui/H1'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useLocation } from 'react-router-dom'
import { cn, downloadExcel, getDateString, getTimeString } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import moment from 'moment'
import supabase from '@/supabase/config'

const data = {
  breadcrumbs: [
    {
      name: 'Incident History',
      href: '..',
    },
    {
      name: 'Incident Info',
      href: '',
    },
  ],
}

export default function IncidentInfoPage() {
  const { state } = useLocation()
  const {
    id,
    location,
    landmark,
    reporterName,
    emergencyType,
    date,
    barangay,
    remarks,
    phoneNumber,
    condition,
    broadcastId,
  } = state
  const { toast } = useToast()

  const reportDateSubmitted = getDateString(date)
  const reportTimeSubmitted = getTimeString(date)

  const handleReportDelete = async () => {
    await supabase
      .from('broadcast')
      .delete()
      .eq('broadcast_id', broadcastId)
      .select()

    const { error } = await supabase
      .from('incident_history')
      .delete()
      .eq('incident_id', id)
      .select()

    if (error) {
      toast({
        title: 'Error Deletion',
        description: error.message,
        duration: 1000,
      })
      return
    }

    toast({
      title: 'Deleted Successfully',
      description: 'Successfully deleted incident report.',
      duration: 1000,
    })
  }

  const handleDownloadReport = () => {
    const jsonData = [
      {
        id,
        location,
        landmark,
        reporterName,
        emergencyType,
        date: reportDateSubmitted,
        time: reportTimeSubmitted,
        barangay,
        remarks,
        phoneNumber,
        condition,
      },
    ]
    const timestamp = moment().format('YYYY-MM-DD')
    const fileName = `Incident-Report_${timestamp}_${id}`

    downloadExcel(jsonData, fileName)
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const openConfirmationDialog = () => setIsDeleteDialogOpen(true)

  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const openDownloadDialog = () => setIsDownloadDialogOpen(true)

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1 className="pb-0">Incident Report</H1>
          <Menubar className="p-0 border-none shadow-none dark:bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="py-1 cursor-pointer px-1.5 dark:bg-transparent hover:bg-neutral-100 transition-colors dark:text-white hover:dark:bg-neutral-700">
                <EllipsisVertical />
              </MenubarTrigger>
              <MenubarContent className="dark:bg-neutral-700">
                <MenubarItem onClick={openDownloadDialog}>
                  Download Report
                </MenubarItem>
                <MenubarItem
                  className="text-red-500"
                  onClick={openConfirmationDialog}
                >
                  Delete Report
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard
            LabelIcon={OctagonAlert}
            label="Incident Details"
            className="row-span-2"
          >
            <InfoCardField label="Bystander Name" value={reporterName} />
            <InfoCardField label="Emergency Type" value={emergencyType} />
            <InfoCardField label="Date" value={reportDateSubmitted} />
            <InfoCardField label="Time" value={reportTimeSubmitted} />
            <InfoCardField label="Contact Number" value={phoneNumber} />
            <div className="h-40 space-y-2">
              <Label className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Patient Status
              </Label>
              <ConditionCard condition={condition} />
            </div>
          </InfoCard>
          <InfoCard LabelIcon={BookUser} label="Location Information">
            <InfoCardField label="Barangay" value={barangay} />
            <InfoCardField label="Landmark" value={landmark} />
            <InfoCardField label="Address" value={location} />
          </InfoCard>
          <InfoCard
            LabelIcon={ClipboardList}
            label="Remarks"
            contentClassName="block"
          >
            <InfoCardField label="Remarks" value={remarks} className="h-40" />
          </InfoCard>
        </div>

        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="Delete Incident Report"
          description="Permanently delete this incident report? You can't undo this action."
          confirmLabel="Delete"
          onConfirm={handleReportDelete}
          variant="destructive"
        />
        <ConfirmationDialog
          isOpen={isDownloadDialogOpen}
          setOpen={setIsDownloadDialogOpen}
          title="Download Incident Report"
          description="Are you sure you want to download this incident report?"
          onConfirm={handleDownloadReport}
        />
      </div>
    </>
  )
}

function ConditionCard({ condition, className }) {
  return (
    <div
      className={cn(
        'w-32 h-20 px-2 py-3 text-center border rounded-md shadow border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600',
        className,
      )}
    >
      <span className="block text-sm text-neutral-600 dark:text-neutral-300">
        condition
      </span>
      {condition === 'stable' ? (
        <span className="block text-lg font-bold text-green-500">STABLE</span>
      ) : (
        <span className="block text-lg font-bold text-red-500">UNSTABLE</span>
      )}
    </div>
  )
}
