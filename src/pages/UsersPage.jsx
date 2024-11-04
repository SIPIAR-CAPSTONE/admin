import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/User/column";
import { DataTable } from "@/components/DataTable/DataTable";

const data = {
  breadcrumbs: [
    {
      name: "Users",
      href: "users",
    },
  ],
  tempTableData: [
    {
      id: "728ed52f",
      firstName: "John",
      lastName: "Doe",
      email: "a@example.com",
      isVerified: true,
    },
    {
      id: "42f51c34",
      firstName: "Jane",
      lastName: "Smith",
      email: "b@example.com",
      isVerified: true,
    },

    {
      id: "91a23e45",
      firstName: "Bob",
      lastName: "Johnson",
      email: "c@example.com",
      isVerified: false,
    },

    {
      id: "13d67e89",
      firstName: "Alice",
      lastName: "Williams",
      email: "d@example.com",
      isVerified: true,
    },

    {
      id: "46b82c11",
      firstName: "Mike",
      lastName: "Davis",
      email: "e@example.com",
      isVerified: false,
    },

    {
      id: "85f34a29",
      firstName: "Emily",
      lastName: "Taylor",
      email: "f@example.com",
      isVerified: false,
    },
  ],
};

export default function UsersPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Users"
          columns={columns}
          data={data.tempTableData}
        />
      </div>
    </div>
  );
}
