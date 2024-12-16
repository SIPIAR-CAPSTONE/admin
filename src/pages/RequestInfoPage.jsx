import { useEffect, useState } from "react";
import { CircleUserRound, MapPinHouse, IdCard } from "lucide-react";
import TopBar from "@/components/TopBar/TopBar";
import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import IdImage from "@/components/InfoCard/IdImage";
import H1 from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { getDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/supabase/config";

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
  const {
    id,
    bystanderId,
    firstName,
    middleName,
    lastName,
    suffix,
    birthDate,
    phoneNumber,
    city,
    barangay,
    street,
    houseNumber,
    email,
  } = state;

  const { toast } = useToast();

  const formattedBirthDate = getDate(birthDate);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const openAcceptDialog = () => setIsAcceptDialogOpen(true);
  const openRejectDialog = () => setIsRejectDialogOpen(true);
  const navigate = useNavigate();

  const [blobUrls, setBlobUrls] = useState({ frontImage: "", backImage: "" });
  const [imageLoading, setImageLoading] = useState(false);
  const frontImagePath = `verification_request/${email}/verification_id_front`;
  const backImagePath = `verification_request/${email}/verification_id_back`;

  // Reusable function to fetch images
  const fetchImage = async (path) => {
    const currentTimestamp = new Date().getTime();
    const { data, error } = await supabase.storage
      .from("bystander")
      .download(`${path}?bust=${currentTimestamp}`);
    if (error) {
      throw new Error(error.message);
    }

    return URL.createObjectURL(data);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImageLoading(true);

        const [frontImage, backImage] = await Promise.all([
          fetchImage(frontImagePath),
          fetchImage(backImagePath),
        ]);

        setBlobUrls({ frontImage, backImage });
      } catch (error) {
        console.log("Error fetching images", error.message);
      } finally {
        setImageLoading(false);
      }
    };

    fetchImages();

    // Cleanup object URLs
    return () => {
      blobUrls.frontImage && URL.revokeObjectURL(blobUrls.frontImage);
      blobUrls.backImage && URL.revokeObjectURL(blobUrls.backImage);
    };
  }, [id, email]);

  const dbCleanerNavigator = async () => {
    await supabase.from("VERIFICATION REQUEST").delete().eq("request_id", id);

    await supabase.storage
      .from("bystander")
      .remove([frontImagePath, backImagePath]);

    navigate("/verification-request");
  };

  const handleAcceptVerification = async () => {
    const { error } = await supabase
      .from("BYSTANDER")
      .update({ is_verified: true })
      .eq("user_id", bystanderId);

    if (!error) {
      dbCleanerNavigator();
      toast({
        title: "Verified Successfully",
        description: "Successfully verified user account.",
      });
    }
  };
  const handleRejectVerification = async () => {
    dbCleanerNavigator();
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
            <InfoCardField label="First Name" value={firstName} />
            <InfoCardField label="Middle Name" value={middleName} />
            <InfoCardField label="Last Name" value={lastName} />
            <InfoCardField label="Suffix" value={suffix} />
            <InfoCardField label="Birthday" value={formattedBirthDate} />
            <InfoCardField label="Phone Number" value={phoneNumber} />
          </InfoCard>
          <InfoCard
            LabelIcon={IdCard}
            label="ID Verification"
            className="md:row-span-2"
            contentClassName="grid-cols-1"
          >
            <IdImage label="Front" src={blobUrls.frontImage} loading={imageLoading} />
            <IdImage label="Back" src={blobUrls.backImage} loading={imageLoading} />
          </InfoCard>
          <InfoCard LabelIcon={MapPinHouse} label="Address Information">
            <InfoCardField label="City" value={city} />
            <InfoCardField label="Barangay" value={barangay} />
            <InfoCardField label="Street" value={street} />
            <InfoCardField label="House #" value={houseNumber} />
          </InfoCard>
        </div>

        <ConfirmationDialog
          isOpen={isAcceptDialogOpen}
          setOpen={setIsAcceptDialogOpen}
          title="Accept Verification Request"
          description="Are you sure you want to accept this verification request?"
          onConfirm={handleAcceptVerification}
        />
        <ConfirmationDialog
          isOpen={isRejectDialogOpen}
          setOpen={setIsRejectDialogOpen}
          title="Reject Verification Request"
          description="Are you sure you want to reject this verification request?"
          onConfirm={handleRejectVerification}
          variant="destructive"
        />
      </div>
    </>
  );
}
