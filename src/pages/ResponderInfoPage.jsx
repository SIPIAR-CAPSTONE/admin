import {
  BadgeCheck,
  CircleUserRound,
} from "lucide-react";

import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { useLocation } from "react-router-dom";
import { Label } from "recharts";
import { cn } from "@/lib/utils";

const data = {
  breadcrumbs: [
    {
      name: "Responders",
      href: "..",
    },
    {
      name: "Responder Info",
      href: "",
    },
  ],
};

export default function ResponderInfoPage() {
  const { state } = useLocation();
  const {
    firstName,
    middleName,
    lastName,
    suffix,
    phoneNumber,
    email,
    is_available,
  } = state;
 

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1>Responder Info</H1>
        </div>
        <div className="grid gap-6 pt-6 md:grid-cols-2">
          <InfoCard
            LabelIcon={CircleUserRound}
            label="Personal Information"
            className="md:row-span-2"
            contentClassName="grid-cols-1"
          >
            <InfoCardField label="First Name" value={firstName} />
            <InfoCardField label="Middle Name" value={middleName} />
            <InfoCardField label="Last Name" value={lastName} />
            <InfoCardField label="Suffix" value={suffix} />
            <InfoCardField label="Phone Number" value={phoneNumber} />
            <InfoCardField label="Email" value={email} />
          </InfoCard>
          <InfoCard
            LabelIcon={BadgeCheck}
            label="Availability"
            className="row-span-2"
          >
            <div className="h-40 space-y-2">
              <Label className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Available
              </Label>
              <AvailabilityCard available={is_available} />
            </div>
          </InfoCard>
        </div>
      </div>
    </>
  );
}

function AvailabilityCard({ available, className }) {
  return (
    <div
      className={cn(
        "w-40 h-20 px-2 py-3 text-center border flex items-center justify-center rounded-md shadow border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600",
        className
      )}
    >
      {available === true ? (
        <span className="block text-lg font-bold text-green-500">
          AVAILABLE
        </span>
      ) : available === false ? (
        <span className="block text-lg font-bold text-red-500">
          UNAVAILABLE
        </span>
      ) : (
        <span className="block text-lg font-bold text-gray-500"> N/A </span>
      )}
    </div>
  );
}
