import { useState } from "react";
import {
  BadgeCheck,
  CircleUserRound,
  EllipsisVertical,
  MapPinHouse,
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
import { getDate, getDateString } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const data = {
  breadcrumbs: [
    {
      name: "Users",
      href: "..",
    },
    {
      name: "User Info",
      href: "",
    },
  ],
};

export default function UserInfoPage() {
  const { state } = useLocation();
  const { id } = state;
  const { toast } = useToast();

  const user = {
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
  const birthDate = getDate(user.birthday);
  const verificationDate = getDateString(user.verificationDate);

  const handleAccountDelete = () => {
    console.log("deleted");

    toast({
      title: "Deleted Successfully",
      description: "Successfully deleted user account.",
      duration: 1000
    });
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openConfirmationDialog = () => setIsDeleteDialogOpen(true);

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1 className="pb-0">User Info</H1>
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
                  Delete Account
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard LabelIcon={BadgeCheck} label="Verification Status">
            <InfoCardField
              label="Status"
              value={user.isVerified ? "Verified" : "Not Verified"}
            />
            <InfoCardField label="Date Verified" value={verificationDate} />
          </InfoCard>
          <InfoCard
            LabelIcon={CircleUserRound}
            label="Personal Information"
            className="md:row-span-2"
            contentClassName="grid-cols-1"
          >
            <InfoCardField label="First Name" value={user.firstName} />
            <InfoCardField label="Middle Name" value={user.middleName} />
            <InfoCardField label="Last Name" value={user.lastName} />
            <InfoCardField label="Suffix" value={user.suffix} />
            <InfoCardField label="Birthday" value={birthDate} />
            <InfoCardField label="Phone Number" value={user.phoneNumber} />
          </InfoCard>
          <InfoCard LabelIcon={MapPinHouse} label="Address Information">
            <InfoCardField label="City" value="Cagayan de Oro City" />
            <InfoCardField label="Barangay" value={user.barangay} />
            <InfoCardField label="Street" value={user.street} />
            <InfoCardField label="House Number" value={user.houseNumber} />
          </InfoCard>
        </div>

        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="Delete Incident Report"
          description="Permanently delete this incident report? You can't undo this action."
          confirmLabel="Delete"
          onConfirm={handleAccountDelete}
          variant="destructive"
        />
      </div>
    </>
  );
}
