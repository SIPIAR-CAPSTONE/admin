import {
  BadgeCheck,
  CircleUserRound,
  MapPinHouse,
} from "lucide-react";

import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { useLocation } from "react-router-dom";
import { getDate, getDateString } from "@/lib/utils";

const data = {
  breadcrumbs: [
    {
      name: "Bystanders",
      href: "..",
    },
    {
      name: "Bystander Info",
      href: "",
    },
  ],
};

export default function BystanderInfoPage() {
  const { state } = useLocation();
  const {
    firstName,
    middleName,
    lastName,
    suffix,
    birthDate,
    phoneNumber,
    barangay,
    street,
    houseNumber,
    isVerified,
    verifiedDate,
  } = state;
  const birthDateParse = getDate(birthDate);
  const verificationDate = verifiedDate ? getDateString(verifiedDate) : "N/A";
 

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1>Bystander Info</H1>
        </div>
        <div className="grid gap-6 pt-6 md:grid-cols-2">
          <InfoCard LabelIcon={BadgeCheck} label="Verification Status">
            <InfoCardField
              label="Status"
              value={isVerified ? "Verified" : "Not Verified"}
            />
            <InfoCardField label="Date Verified" value={verificationDate} />
          </InfoCard>
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
            <InfoCardField label="Birthday" value={birthDateParse} />
            <InfoCardField label="Phone Number" value={phoneNumber} />
          </InfoCard>
          <InfoCard LabelIcon={MapPinHouse} label="Address Information">
            <InfoCardField label="City" value="Cagayan de Oro City" />
            <InfoCardField label="Barangay" value={barangay} />
            <InfoCardField label="Street" value={street} />
            <InfoCardField label="House Number" value={houseNumber} />
          </InfoCard>
        </div>
      </div>
    </>
  );
}
