import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/IncidentHistory/column";
import { DataTable } from "@/components/DataTable/DataTable";

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
      date: "2023-07-25T00:00:00.000Z",
      condition: "stable",
      assessment:
        "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
    },
    {
      id: "42f51c34",
      location: "456 Oak Ave",
      date: "2022-01-15T00:00:00.000Z",
      condition: "unstable",
      assessment:
        "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
    },
    {
      id: "91a23e45",
      location: "789 Elm St",
      date: "2021-06-20T00:00:00.000Z",
      condition: "stable",
      assessment:
        "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
    },
  ],
};

export default function IncidentHistoryPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 py-10 mx-auto max-w-screen-2xl">
        <DataTable
          tableName="Incident History"
          columns={columns}
          data={data.tempTableData}
          searchColumn="location"
        />
      </div>
    </div>
  );
}
