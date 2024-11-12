import { BadgeCheck, CircleUserRound, MapPinHouse } from "lucide-react";

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
  const { id } = state;

  const bystander = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    suffix: "Jr.",
    birthday: "2003-01-15T00:00:00.000Z",
    phoneNumber: "09123456789",
    city: "Cagayan de Oro City",
    barangay: "Barangay 123",
    street: "Main Street",
    houseNumber: "456",
    isVerified: true,
    verificationDate: "2023-07-25T00:00:00.000Z",
  };
  const birthDate = getDate(bystander.birthday);
  const verificationDate = getDateString(bystander.verificationDate);

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <H1>Bystander Info</H1>

        <div className="grid gap-6 pt-6 md:grid-cols-2">
          <InfoCard LabelIcon={BadgeCheck} label="Verification Status">
            <InfoCardField
              label="Status"
              value={bystander.isVerified ? "Verified" : "Not Verified"}
            />
            <InfoCardField label="Date Verified" value={verificationDate} />
          </InfoCard>
          <InfoCard
            LabelIcon={CircleUserRound}
            label="Personal Information"
            className="md:row-span-2"
            contentClassName="grid-cols-1"
          >
            <InfoCardField label="First Name" value={bystander.firstName} />
            <InfoCardField label="Middle Name" value={bystander.middleName} />
            <InfoCardField label="Last Name" value={bystander.lastName} />
            <InfoCardField label="Suffix" value={bystander.suffix} />
            <InfoCardField label="Birthday" value={birthDate} />
            <InfoCardField label="Phone Number" value={bystander.phoneNumber} />
          </InfoCard>
          <InfoCard LabelIcon={MapPinHouse} label="Address Information">
            <InfoCardField label="City" value="Cagayan de Oro City" />
            <InfoCardField label="Barangay" value={bystander.barangay} />
            <InfoCardField label="Street" value={bystander.street} />
            <InfoCardField label="House Number" value={bystander.houseNumber} />
          </InfoCard>
        </div>
      </div>
    </>
  );
}
