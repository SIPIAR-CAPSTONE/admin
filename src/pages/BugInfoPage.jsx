import { useState } from "react";

import TopBar from "@/components/TopBar/TopBar";
import { EllipsisVertical, Info, Image } from "lucide-react";
import H1 from "@/components/ui/H1";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import InfoCard from "@/components/InfoCard/InfoCard";
import InfoCardField from "@/components/InfoCard/InfoCardField";
import IdImage from "@/components/InfoCard/IdImage";
import { useLocation } from "react-router-dom";
import { getDateString } from "@/lib/utils";

const data = {
  breadcrumbs: [
    {
      name: "Bug Report",
      href: "..",
    },
    {
      name: "Bug Info",
      href: "",
    },
  ],
};

export default function BugInfoPage() {
  const { state } = useLocation();
  const { id } = state;

  const bugInfo = {
    id: "728ed52f",
    issueType: "Performance Issue",
    issueDescription:
      "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
    email: "a@example.com",
    date: "2023-07-25T00:00:00.000Z",
    image:
      "https://imgs.search.brave.com/CcUiKNSCXN9KP7n6QiO5m0L5JqFdSQfvZCq2R1yX6kw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjYz/NjEzMDQ2L3Bob3Rv/L3BpcGV0dGUtZHJv/cHBpbmctYS1zYW1w/bGUtaW50by1hLXRl/c3QtdHViZS1jbG9z/ZXVwLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1kN09uMllE/aldrWFljNDRYS2Jf/MXdGZ2hraVp1cjY3/Ym82VGZkNHlNS1A0/PQ",
  };
  const dateReported = getDateString(bugInfo.date);

  const handleAccountDelete = () => console.log("deleted");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openConfirmationDialog = () => setIsDeleteDialogOpen(true);

  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} addBackButton />
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between gap-2 pb-6">
          <H1 className="pb-0">Bug Report Info</H1>
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
          <InfoCard LabelIcon={Info} label="Report Details">
            <InfoCardField label="Issue Type" value={bugInfo.issueType} />
            <InfoCardField
              label="Issue Description"
              value={bugInfo.issueDescription}
            />
            <InfoCardField label="User Email" value={bugInfo.email} />
            <InfoCardField label="Date Reported" value={dateReported} />
          </InfoCard>
          <InfoCard LabelIcon={Image} label="Report Image">
            <IdImage src={bugInfo.image} />
          </InfoCard>
        </div>
        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="Delete Bug Report"
          description="Permanently delete this bug report? You can't undo this action."
          confirmLabel="Delete"
          onConfirm={handleAccountDelete}
          variant="destructive"
        />
      </div>
    </div>
  );
}
