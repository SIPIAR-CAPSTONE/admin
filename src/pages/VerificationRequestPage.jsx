import Header from "@/components/Header/Header";
import { columns } from "@/components/VerificationRequest/column";
import { DataTable } from "@/components/DataTable/DataTable";

export default function VerificationRequestPage() {
  //!todo: change this to supabase fetch
  const data = [
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
  ];

  return (
    <div>
      <Header title="Verification Request" />
      <div className="px-4 py-10 mx-auto max-w-screen-2xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
