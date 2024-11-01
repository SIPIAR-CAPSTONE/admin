import Header from "@/components/Header/Header";
import { columns } from "@/components/VerificationRequest/column";
import { DataTable } from "@/components/DataTable/DataTable";

export default function VerifiedUserPage() {
  //!todo: change this to supabase fetch
  const data = [
    {
      id: "728ed52f",
      firstName: "John",
      lastName: "Doe",
      email: "a@example.com",
      verifiedDate: "2023-07-25T00:00:00.000Z",
    },
    {
      id: "42f51c34",
      firstName: "Jane",
      lastName: "Smith",
      email: "b@example.com",
      verifiedDate: "2022-01-15T00:00:00.000Z",
    },

    {
      id: "91a23e45",
      firstName: "Bob",
      lastName: "Johnson",
      email: "c@example.com",
      verifiedDate: "2021-06-20T00:00:00.000Z",
    },

    {
      id: "13d67e89",
      firstName: "Alice",
      lastName: "Williams",
      email: "d@example.com",
      verifiedDate: "2023-03-01T00:00:00.000Z",
    },

    {
      id: "46b82c11",
      firstName: "Mike",
      lastName: "Davis",
      email: "e@example.com",
      verifiedDate: "2022-09-10T00:00:00.000Z",
    },

    {
      id: "85f34a29",
      firstName: "Emily",
      lastName: "Taylor",
      email: "f@example.com",
      verifiedDate: "2021-11-25T00:00:00.000Z",
    },
  ];

  return (
    <div>
      <Header title="Verified User" />
      <div className="px-4 py-10 mx-auto max-w-screen-2xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
