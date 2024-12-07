import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/IncidentHistory/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const data = {
  breadcrumbs: [
    {
      name: "Incident History",
      href: "",
    },
  ],
  tempTableData: [
    {
      id: "728ed52f",
      location: "123 Main St",
      barangay: "Barangay 123",
      date: "2023-07-25T00:00:00.000Z",
      condition: "stable",
      isActive: "No",
    },
    {
      id: "42f51c34",
      location: "456 Oak Ave",
      date: "2022-01-15T00:00:00.000Z",
      barangay: "Barangay 5",
      condition: "unstable",
      isActive: "No",
    },
    {
      id: "91a23e45",
      location: "789 Elm St",
      date: "2021-06-20T00:00:00.000Z",
      barangay: "indahag",
      condition: "stable",
      isActive: "No",
    },
    {
      id: "91a23e41",
      location: "789 Elm St",
      date: "2021-06-20T00:00:00.000Z",
      barangay: "indahag",
      condition: "unstable",
      isActive: "Yes",
    },
    {
      id: "81a23e45",
      location: "789 Elm St",
      date: "2021-06-20T00:00:00.000Z",
      barangay: "indahag",
      condition: "stable",
      isActive: "Yes",
    },
  ],
  filterOptions: [
    {
      label: "Stable",
      value: "stable",
      icon: ThumbsUp,
    },
    {
      label: "Unstable",
      value: "unstable",
      icon: ThumbsDown,
    },
  ],
};

export default function IncidentHistoryPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Incident History"
          columns={columns}
          data={data.tempTableData}
          searchColumn="location"
          filterTitle="Condition"
          filterColumn="condition"
          filterOptions={data.filterOptions}
        />
      </div>
    </div>
  );
}
