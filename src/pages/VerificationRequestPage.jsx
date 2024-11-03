import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/VerificationRequest/column";
import { DataTable } from "@/components/DataTable/DataTable";

const data = {
  breadcrumbs: [
    {
      name: "Verification Request",
      href: "verification-request",
    },
  ],
  tempTableData: [
    {
      id: "728ed52f",
      firstName: "John",
      lastName: "Doe",
      email: "a@example.com",
      requestDate: "2023-07-25T00:00:00.000Z",
    },
    {
      id: "728ed52f",
      firstName: "Jake",
      lastName: "Dave",
      email: "jd@example.com",
      requestDate: "2023-02-22T00:00:00.000Z",
    },
    {
      id: "728e52f",
      firstName: "Jane",
      lastName: "Doe",
      email: "j@example.com",
      requestDate: "2023-07-15T00:00:00.000Z",
    },
    {
      id: "728ed52f",
      firstName: "Bob",
      lastName: "Doe",
      email: "b@example.com",
      requestDate: "2023-07-10T00:00:00.000Z",
    },
  ],
};

export default function VerificationRequestPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 py-10 mx-auto max-w-screen-2xl">
        <DataTable
          tableName="Verification Request"
          columns={columns}
          data={data.tempTableData}
        />
      </div>
    </div>
  );
}
