import { useState } from "react";
import {
  BookUser,
  ClipboardList,
  EllipsisVertical,
  OctagonAlert,
  SquareActivity,
} from "lucide-react";

import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import TopBar from "@/components/TopBar/TopBar";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import H1 from "@/components/ui/H1";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useLocation } from "react-router-dom";
import { getDateString } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const data = {
  breadcrumbs: [
    {
      name: "Incident History",
      href: "..",
    },
    {
      name: "Incident Info",
      href: "",
    },
  ],
};

export default function IncidentInfoPage() {
  const { state } = useLocation();
  const { id } = state;
  const { toast } = useToast();

  const info = {
    location: "123 Main St",
    date: "2023-07-25T00:00:00.000Z",
    bystander: "John Doe",
    responderId: "728ed52f",
    patientName: "Jane Doe",
    age: "25",
    address: "456 Oak Ave",
    sex: "Female",
    heartRate: "75",
    bloodPressure: "120/80",
    medicalHistory: "Hypertension, Diabetes Type 2.",
    medication: "Metformin",
    assessment:
      "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
    condition: "stable",
  };
  const reportSubmitted = getDateString(info.date);

  const handleReportDelete = () => {
    console.log("deleted");

    toast({
      title: "Deleted Successfully",
      description: "Successfully deleted incident report.",
      duration: 1000,
    });
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openConfirmationDialog = () => setIsDeleteDialogOpen(true);

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1 className="pb-0">Incident Report</H1>
          <Menubar className="p-0 border-none shadow-none dark:bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="py-1 px-1.5 dark:bg-transparent dark:text-white hover:dark:bg-neutral-700">
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
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard LabelIcon={OctagonAlert} label="Incident Details">
            <InfoCardField label="Location" value={info.location} />
            <InfoCardField label="Date" value={reportSubmitted} />
            <InfoCardField label="Bystander" value={info.bystander} />
            <InfoCardField label="Responder ID" value={info.responderId} />
          </InfoCard>
          <InfoCard LabelIcon={BookUser} label="Patient Information">
            <InfoCardField label="Patient Name" value={info.patientName} />
            <InfoCardField label="Age" value={info.age} />
            <InfoCardField label="Address" value={info.address} />
            <InfoCardField label="Sex" value={info.sex} />
          </InfoCard>
          <InfoCard LabelIcon={SquareActivity} label="Medical Information">
            <InfoCardField label="Heart Rate" value={`${info.heartRate} bpm`} />
            <InfoCardField
              label="Blood Pressure"
              value={`${info.bloodPressure} mmHg`}
            />
            <InfoCardField
              label="Medical History"
              value={info.medicalHistory}
            />
            <InfoCardField label="Medication" value={info.medication} />
          </InfoCard>
          <InfoCard LabelIcon={ClipboardList} label="Assessment">
            <InfoCardField
              label="Assessment"
              value={info.assessment}
              className="h-40"
            />
            <div className="w-32 h-20 px-2 py-3 mx-auto text-center border rounded-md shadow border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600">
              <span className="block text-sm text-neutral-600 dark:text-neutral-300">
                condition
              </span>
              {info.condition === "stable" ? (
                <span className="block text-lg font-bold text-green-500">
                  STABLE
                </span>
              ) : (
                <span className="block text-lg font-bold text-red-500">
                  UNSTABLE
                </span>
              )}
            </div>
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
      </div>
    </>
  );
}
