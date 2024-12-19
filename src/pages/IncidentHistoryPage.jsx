import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/IncidentHistory/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/supabase/config";
import { useToast } from "@/hooks/use-toast";

const filterOptions = [
  {
    label: "Stable",
    value: "Stable",
    icon: ThumbsUp,
  },
  {
    label: "Unstable",
    value: "Unstable",
    icon: ThumbsDown,
  },
];

const breadCrumbs = [{ name: "Incident History", href: "" }];

export default function IncidentHistoryPage() {
  const [incidentHistory, setIncidentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchIncidentHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("BROADCAST").select(`
        *,
        USER:user_id (
          *
        ),
        RESPONDER:responder_id(
          *
        )`);

      if (error) {
        toast({
          title: "Error fetching incident history",
          description: error.message,
          variant: "destructive",
          duration: 1000,
        });
      } else {
        const formattedData = data.map((item) => ({
          broadcastId: item?.broadcast_id || "N/A",
          id: item?.broadcast_id || "N/A",
          bystanderName: item.USER
            ? `${item?.USER?.first_name || ""} ${
                item?.USER?.last_name || ""
              }`.trim()
            : "Bystander Reporter",
          emergencyType: item?.emergency_type || "-",
          date: item?.date || "-",
          phoneNumber: item?.USER?.phone_number || "-",
          condition: item?.condition || "N/A",
          barangay: item?.barangay || "-",
          landmark: item?.landmark || "-",
          location: item?.address || "-",
          remarks: item?.remarks || "-",
          email: item?.RESPONDER?.email || "-",
          status: item?.status,
          responseTime: item?.response_time || "-",
          responderName: item?.RESPONDER
            ? `${item?.RESPONDER?.first_name || ""} ${
                item?.RESPONDER?.last_name || ""
              }`.trim()
            : "-",
        }));

        setIncidentHistory(formattedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentHistory();
  }, []);

  return (
    <div>
      <TopBar breadcrumbsData={breadCrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          loading={loading}
          tableName="Incident History"
          columns={columns}
          data={incidentHistory}
          searchColumn="barangay"
          filterTitle="Condition"
          filterColumn="condition"
          filterOptions={filterOptions}
          func={fetchIncidentHistory}
          statePropKeys={[
            "id",
            "bystanderName",
            "emergencyType",
            "date",
            "phoneNumber",
            "condition",
            "barangay",
            "landmark",
            "location",
            "remarks",
            "status",
            "responseTime",
            "responderName",
          ]}
        />
      </div>
    </div>
  );
}
