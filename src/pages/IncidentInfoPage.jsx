import { useState } from "react";
import {
  BookUser,
  ClipboardList,
  EllipsisVertical,
  OctagonAlert,
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
import { cn, downloadExcel, getDateString, getTimeString } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { getResponseTimeDuration } from "@/components/Dashboard/dashboard.helper";

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
  const {
    id,
    location,
    landmark,
    emergencyType,
    date,
    barangay,
    remarks,
    phoneNumber,
    condition,
    email,
    responderName,
    responseTime,
    bystanderName,
  } = state;
  const { toast } = useToast();

  const reportDateSubmitted = getDateString(date);
  const reportTimeSubmitted = getTimeString(date);

  const incidentRequestDate = date;
  const responseTimeDate = responseTime;

  const duration =
    !responseTimeDate || responseTimeDate === "-"
      ? "-"
      : getResponseTimeDuration(incidentRequestDate, responseTimeDate, true);

  const handleDownloadReport = () => {
    const jsonData = [
      {
        id,
        location,
        landmark,
        bystanderName,
        emergencyType,
        date: reportDateSubmitted,
        time: reportTimeSubmitted,
        barangay,
        remarks,
        phoneNumber,
        condition,
      },
    ];
    console.log(jsonData);
    const timestamp = moment().format("YYYY-MM-DD");
    const fileName = `Incident-Report_${timestamp}_${id}`;

    downloadExcel(jsonData, fileName);
  };

  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const openDownloadDialog = () => setIsDownloadDialogOpen(true);

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
            <InfoCardField label="Bystander Name" value={bystanderName} />
            <InfoCardField label="Responder Name" value={responderName} />
            <InfoCardField label="Incident Date" value={reportDateSubmitted} />
            <InfoCardField label="Incident Time" value={reportTimeSubmitted} />
            <InfoCardField label="Response Time" value={duration} />
            <InfoCardField label="Contact Number" value={phoneNumber} />
            <InfoCardField label="Emergency Type" value={emergencyType} />
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
          isOpen={isDownloadDialogOpen}
          setOpen={setIsDownloadDialogOpen}
          title="Download Incident Report"
          description="Are you sure you want to download this incident report?"
          onConfirm={handleDownloadReport}
        />
      </div>
    </>
  );
}

function ConditionCard({ condition, className }) {
  return (
    <div
      className={cn(
        "w-32 h-20 px-2 py-3 text-center border rounded-md shadow border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600",
        className
      )}
    >
      <span className="block text-sm text-neutral-600 dark:text-neutral-300">
        condition
      </span>
      {condition === "Stable" ? (
        <span className="block text-lg font-bold text-green-500">STABLE</span>
      ) : condition === "Unstable" ? (
        <span className="block text-lg font-bold text-red-500">UNSTABLE</span>
      ) : (
        <span className="block text-lg font-bold text-gray-500"> N/A </span>
      )}
    </div>
  );
}
