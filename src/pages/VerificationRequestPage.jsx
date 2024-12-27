import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/VerificationRequest/column";
import { DataTable } from "@/components/DataTable/DataTable";
import supabase from "@/supabase/config";
import { useEffect, useState } from "react";

const breadCrumbs = [
  { name: "Verification Request", href: "/verification-request" },
];

export default function VerificationRequestPage() {
  const [bystanderData, setBystanderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBystanderData = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("VERIFICATION REQUEST")
        .select(
          `
          *,
          USER:user_id,
          BYSTANDER:user_id (
            *,
            BYSTANDER(
              verified_date
            )
          )
          `
        );

      if (error) {
        console.error("Error fetching bystander data:", error);
      } else {
        const formattedData = data.map((item) => ({
          id: String(item.request_id),
          bystanderId: String(item.user_id),
          firstName: item.BYSTANDER.first_name,
          middleName: item.BYSTANDER.middle_name,
          lastName: item.BYSTANDER.last_name,
          suffix: item.BYSTANDER.suffix,
          birthDate: item.BYSTANDER.birth_date,
          phoneNumber: item.BYSTANDER.phone_number,
          city: "Cagayan de Oro City",
          barangay: item.BYSTANDER.barangay,
          street: item.BYSTANDER.street,
          houseNumber: item.BYSTANDER.house_number,
          email: item.BYSTANDER.email,
          requestDate: item.request_date,
        }));

        setBystanderData(formattedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBystanderData();
  }, []);

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          loading={loading}
          tableName="Verification Request"
          columns={columns}
          data={bystanderData}
          searchColumn="email"
          func={fetchBystanderData}
          statePropKeys={[
            "id",
            "bystanderId",
            "firstName",
            "middleName",
            "lastName",
            "suffix",
            "birthDate",
            "phoneNumber",
            "city",
            "barangay",
            "street",
            "houseNumber",
            "email",
          ]}
        />
      </div>
    </div>
  );
}
