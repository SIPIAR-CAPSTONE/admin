import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/Bystander/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge, BadgeCheck } from "lucide-react";
import supabase from "@/supabase/config";
import { useEffect, useState } from "react";

const breadCrumbs = [{ name: "Bystanders", href: "/bystander" }];

const filters = {
  filterOptions: [
    {
      label: "Yes",
      value: true,
      icon: BadgeCheck,
    },
    {
      label: "No",
      value: false,
      icon: Badge,
    },
  ],
};

export default function BystandersPage() {
  const [bystanderData, setBystanderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBystanderData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("BYSTANDER").select(`
        *,
        USER:user_id (
          *,
          "VERIFICATION REQUEST"!user_id (
            request_date
          )
        )
      `);
      if (error) {
        console.error("Error fetching bystander data:", error);
      } else {
        console.log("data", data);

        const formattedData = data.map((item) => ({
          id: String(item.bystander_id),
          firstName: item.USER.first_name,
          middleName: item.USER.middle_name,
          lastName: item.USER.last_name,
          suffix: item.USER.suffix,
          birthDate: item.USER.birth_date,
          phoneNumber: item.USER.phone_number,
          barangay: item.USER.barangay,
          street: item.USER.street,
          houseNumber: item.USER.house_number,
          email: item.USER.email,
          isVerified: item.is_verified,
          verifiedDate:
            item.USER["VERIFICATION REQUEST"] &&
            item.USER["VERIFICATION REQUEST"].length > 0
              ? item.USER["VERIFICATION REQUEST"][0].request_date
              : null,
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
          tableName="Bystanders"
          columns={columns}
          data={bystanderData}
          searchColumn="email"
          filterTitle="Verified"
          filterColumn="isVerified"
          filterOptions={filters.filterOptions}
          func={fetchBystanderData}
          statePropKeys={[
            "id",
            "firstName",
            "middleName",
            "lastName",
            "suffix",
            "birthDate",
            "phoneNumber",
            "barangay",
            "street",
            "houseNumber",
            "isVerified",
            "verifiedDate",
          ]}
        />
      </div>
    </div>
  );
}
