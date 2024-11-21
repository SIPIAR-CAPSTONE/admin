import { useEffect, useState } from 'react'

import TopBar from '@/components/TopBar/TopBar'
import { EllipsisVertical, Image, Info } from 'lucide-react'
import H1 from '@/components/ui/H1'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import InfoCard from '@/components/InfoCard/InfoCard'
import InfoCardField from '@/components/InfoCard/InfoCardField'
import { useLocation } from 'react-router-dom'
import { getDateString } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import IdImage from '@/components/InfoCard/IdImage'
import supabase from '@/supabase/config'

const data = {
  breadcrumbs: [
    {
      name: 'Bug Report',
      href: '..',
    },
    {
      name: 'Bug Info',
      href: '',
    },
  ],
}

export default function BugInfoPage() {
  const { state } = useLocation()
  const { id, issueDescription, issueType, email, date } = state
  const dateReported = getDateString(date)
  const { toast } = useToast()
  const [blobUrl, setBlobUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const imageDownloader = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase.storage
          .from('bug_report')
          .download(id)

        if (error) {
          toast({
            title: 'Unable to get the image ',
            description: error.name,
            duration: 1000,
            variant: 'destructive',
          })
        } else {
          const url = URL.createObjectURL(data) // Convert blob to a URL
          setBlobUrl(url) // Save the URL to state
        }
      } catch (error) {
        toast({
          title: 'Error getting the image: ',
          description: error.message,
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    imageDownloader()

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [id])

  const handleAccountDelete = async () => {
    const { error } = await supabase
      .from('bug_report')
      .delete()
      .eq('bug_id', id)
      .select()

    if(error){
      toast({
        title: 'Error Deletion',
        description: error.message,
        duration: 1000,
      })
      return;
    }

    toast({
      title: 'Deleted Successfully',
      description: 'Successfully deleted bug report.',
      duration: 1000,
    })
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const openConfirmationDialog = () => setIsDeleteDialogOpen(true)

  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1 className="pb-0">Bug Report Info</H1>
          <Menubar className="p-0 border-none shadow-none dark:bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="py-1 cursor-pointer px-1.5 dark:bg-transparent dark:text-white hover:bg-neutral-100 transition-colors hover:dark:bg-neutral-700">
                <EllipsisVertical />
              </MenubarTrigger>
              <MenubarContent className="dark:bg-neutral-700">
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

        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            LabelIcon={Info}
            label="Report Details"
            className="md:col-span-2"
            contentClassName="grid-cols-1 md:grid-cols-2"
          >
            <InfoCardField label="Issue Type" value={issueType} />
            <InfoCardField label="Issue Description" value={issueDescription} />
            <InfoCardField label="Bystander Email" value={email} />
            <InfoCardField label="Date Reported" value={dateReported} />
          </InfoCard>
          <InfoCard
            LabelIcon={Image}
            label="Report Image"
            contentClassName="grid-cols-1"
          >
            <IdImage src={blobUrl} loading={loading} />
          </InfoCard>
        </div>

        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="Delete Bug Report"
          description="Permanently delete this bug report? You can't undo this action."
          confirmLabel="Delete"
          onConfirm={handleAccountDelete}
          variant="destructive"
        />
      </div>
    </div>
  )
}
