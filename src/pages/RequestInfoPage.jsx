import { useState } from "react";
import { CircleUserRound, MapPinHouse, IdCard } from "lucide-react";
import TopBar from "@/components/TopBar/TopBar";
import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import IdImage from "@/components/InfoCard/IdImage";
import H1 from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { useLocation } from "react-router-dom";
import { getDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const data = {
  breadcrumbs: [
    {
      name: "Verification Request",
      href: "..",
    },
    {
      name: "Request Info",
      href: "",
    },
  ],
};

export default function RequestInfoPage() {
  const { state } = useLocation();
  const { id } = state;
  const { toast } = useToast();

  const user = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    suffix: "Jr.",
    birthday: "2003-04-15T00:00:00.000Z",
    phoneNumber: "09123456789",
    city: "Cagayan de Oro City",
    barangay: "Barangay 123",
    street: "Main Street",
    houseNumber: "456",
  };
  const birthDate = getDate(user.birthday);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const openAcceptDialog = () => setIsAcceptDialogOpen(true);
  const openRejectDialog = () => setIsRejectDialogOpen(true);

  const handleAcceptVerification = () => {
    console.log("accepted");

    toast({
      title: "Verified Successfully",
      description: "Successfully verified user account.",
    });
  };
  const handleRejectVerification = () => {
    console.log("rejected");

    toast({
      title: "Rejected Successfully",
      description: "Successfully rejected user account verification.",
      duration: 1000,
    });
  };

  return (
    <>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-between gap-2 pb-6 md:flex-row">
          <H1 className="pb-0">Verification Request Info</H1>
          <div className="space-x-1.5">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:text-white hover:dark:bg-green-600"
              onClick={openAcceptDialog}
            >
              Accept
            </Button>
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:text-white hover:dark:bg-red-600"
              onClick={openRejectDialog}
            >
              Reject
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard LabelIcon={CircleUserRound} label="Personal Information">
            <InfoCardField label="First Name" value={user.firstName} />
            <InfoCardField label="Middle Name" value={user.middleName} />
            <InfoCardField label="Last Name" value={user.lastName} />
            <InfoCardField label="Suffix" value={user.suffix} />
            <InfoCardField label="Birthday" value={birthDate} />
            <InfoCardField label="Phone Number" value={user.phoneNumber} />
          </InfoCard>
          <InfoCard
            LabelIcon={IdCard}
            label="ID Verification"
            className="md:row-span-2"
            contentClassName="grid-cols-1"
          >
            <IdImage
              label="Front"
              src="https://marketplace.canva.com/EAFXhyJiKhc/1/0/400w/canva-white-and-red-modern-highschool-id-card-nKwomwYJiUU.jpg"
            />
            <IdImage
              label="Back"
              src="https://t4.ftcdn.net/jpg/02/32/92/21/360_F_232922178_YCAxIU0vlGoGY2H76ZsATswNrOVbWlUv.jpg"
            />
          </InfoCard>
          <InfoCard LabelIcon={MapPinHouse} label="Address Information">
            <InfoCardField label="City" value={user.city} />
            <InfoCardField label="Barangay" value={user.barangay} />
            <InfoCardField label="Street" value={user.street} />
            <InfoCardField label="House #" value={user.houseNumber} />
          </InfoCard>
        </div>

        <ConfirmationDialog
          isOpen={isAcceptDialogOpen}
          setOpen={setIsAcceptDialogOpen}
          title="Accept Verification Request"
          description="Are you sure you want to accept this incident report?"
          onConfirm={handleAcceptVerification}
        />
        <ConfirmationDialog
          isOpen={isRejectDialogOpen}
          setOpen={setIsRejectDialogOpen}
          title="Reject Verification Request"
          description="Are you sure you want to reject this incident report?"
          onConfirm={handleRejectVerification}
          variant="destructive"
        />
      </div>
    </>
  );
}
