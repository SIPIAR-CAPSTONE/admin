import Header from "@/components/Header/Header";
import { columns } from "@/components/IncidentHistory/column";
import { DataTable } from "@/components/DataTable/DataTable";

export default function IncidentHistoryPage() {
  //!todo: change this to supabase fetch
  const data = [
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
  ];

  return (
    <div>
      <Header title="Incident History" />
      <div className="px-4 py-10 mx-auto max-w-screen-2xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
