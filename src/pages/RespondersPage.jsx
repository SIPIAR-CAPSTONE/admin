import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/Responder/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge, BadgeCheck } from "lucide-react";
import supabase from "@/supabase/config";
import { useState, useEffect } from "react";

const breadCrumbs = [{ name: "Responders", href: "/responder" }];

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

export default function RespondersPage() {
  const [responderData, setResponderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRespondersData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("RESPONDER").select(`
        *,
        USER: user_id (
          first_name,
          middle_name,
          last_name,
          suffix,
          phone_number,
          email
        )
        `);

      if (error) {
        console.error("Error fetching responder data:", error.message);
      }
      if (data) {
        const formattedData = data.map((item) => ({
          id: String(item.responder_id),
          firstName: item.USER.first_name,
          middleName: item.USER.middle_name,
          lastName: item.USER.last_name,
          suffix: item.USER.suffix,
          phoneNumber: item.USER.phone_number,
          email: item.USER.email,
          is_available: item.is_available,
        }));

        setResponderData(formattedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRespondersData();
  }, []);

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          loading={loading}
          tableName="Responders"
          columns={columns}
          data={responderData}
          searchColumn="email"
          filterTitle="Available"
          filterColumn="is_available"
          filterOptions={filters.filterOptions}
          func={fetchRespondersData}
          statePropKeys={[
            "id",
            "firstName",
            "middleName",
            "lastName",
            "suffix",
            "phoneNumber",
            "email",
            "is_available",
          ]}
        />
      </div>
    </div>
  );
}
