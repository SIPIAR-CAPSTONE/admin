import {
  BadgeCheck,
  CircleUserRound,
  EllipsisVertical,
  MapPinHouse,
} from "lucide-react";

import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { useLocation } from "react-router-dom";
import { getDate, getDateString } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { useState } from "react";
import BystanderFormDialog from "@/components/Bystander/BystanderFormDialog";
import { z } from "zod";

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

const editBystanderFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string(),
  birthday: z.coerce.date(),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .regex(/^[0-9]+$/, { message: "Phone number must be numeric" })
    .regex(/^(09)/, { message: "Phone number must start with 09" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  houseNumber: z.string(),
});

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
  const { role } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const openDeleteDialog = () => setDeleteDialogIsOpen(true);

  const [formIsOpen, setFormIsOpen] = useState(false);
  const openFormDialog = () => setFormIsOpen(true);

  const editBystanderAccount = async (values) => {
    try {
      setLoading(true);

      //TODO: query
      console.log(values);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBystander = async () => {
    console.log("delete bystander");
  };

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1>Bystander Info</H1>
          {role === "verifier" && (
            <Menubar className="p-0 border-none shadow-none dark:bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="py-1 cursor-pointer px-1.5 dark:bg-transparent hover:bg-neutral-100 transition-colors dark:text-white hover:dark:bg-neutral-700">
                  <EllipsisVertical />
                </MenubarTrigger>
                <MenubarContent className="dark:bg-neutral-700">
                  <MenubarItem onClick={openFormDialog}>Edit</MenubarItem>
                  <MenubarItem
                    className="text-red-500"
                    onClick={openDeleteDialog}
                  >
                    Delete
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
        <BystanderFormDialog
          title="Edit Bystander Information"
          open={formIsOpen}
          setOpen={setFormIsOpen}
          onSubmit={editBystanderAccount}
          loading={loading}
          defaultValues={{
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix,
            birthday: birthDate,
            phoneNumber: phoneNumber,
            barangay: barangay,
            street: street,
            houseNumber: houseNumber,
          }}
          formSchema={editBystanderFormSchema}
        />
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

        <ConfirmationDialog
          isOpen={deleteDialogIsOpen}
          setOpen={setDeleteDialogIsOpen}
          title="Delete Bystander Account"
          description="This action cannot be undone. Are you sure you want to delete this bystander?"
          onConfirm={handleDeleteBystander}
          variant="destructive"
        />
      </div>
    </>
  );
}
