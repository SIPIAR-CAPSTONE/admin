import {
  BadgeCheck,
  CircleUserRound,
  EllipsisVertical,
} from "lucide-react";

import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import TopBar from "@/components/TopBar/TopBar";
import H1 from "@/components/ui/H1";
import { useLocation } from "react-router-dom";
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
import ResponderFormDialog from "@/components/Responder/ResponderFormDialog";
import { Label } from "recharts";
import { cn } from "@/lib/utils";
import { z } from "zod";

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

const editResponderFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string(),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .regex(/^[0-9]+$/, { message: "Phone number must be numeric" })
    .regex(/^(09)/, { message: "Phone number must start with 09" }),
});

export default function ResponderInfoPage() {
  const { state } = useLocation();
  const {
    id,
    firstName,
    middleName,
    lastName,
    suffix,
    phoneNumber,
    email,
    is_available,
  } = state;
  const { role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const openDeleteDialog = () => setDeleteDialogIsOpen(true);

  const [formIsOpen, setFormIsOpen] = useState(false);
  const openFormDialog = () => setFormIsOpen(true);

  const editResponderAccount = async (values) => {
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

  const handleDeleteResponder = async () => {
    console.log("delete bystander");
  };

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1>Responder Info</H1>
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
        <ResponderFormDialog
          title="Edit Responder Information"
          open={formIsOpen}
          setOpen={setFormIsOpen}
          loading={loading}
          onSubmit={editResponderAccount}
          defaultValues={{
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix,
            phoneNumber: phoneNumber,
            is_available: is_available,
          }}
          formSchema={editResponderFormSchema}
        />
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

        <ConfirmationDialog
          isOpen={deleteDialogIsOpen}
          setOpen={setDeleteDialogIsOpen}
          title="Delete Responder Account"
          description="This action cannot be undone. Are you sure you want to delete this responder?"
          onConfirm={handleDeleteResponder}
          variant="destructive"
        />
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
