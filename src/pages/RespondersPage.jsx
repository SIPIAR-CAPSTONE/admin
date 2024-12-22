import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/Responder/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge, BadgeCheck, Plus } from "lucide-react";
import supabase from "@/supabase/config";
import ResponderFormDialog from "@/components/Responder/ResponderFormDialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { z } from "zod";

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

const createResponderFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string(),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .regex(/^[0-9]+$/, { message: "Phone number must be numeric" })
    .regex(/^(09)/, { message: "Phone number must start with 09" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, {
      message: "Password must contain at least one special character",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .max(35, { message: "Password must not exceed 35 characters" }),
});

export default function RespondersPage() {
  const [responderData, setResponderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createResponderLoading, setCreateResponderLoading] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const openFormDialog = () => setFormIsOpen(true);

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

  function createRespondersButton() {
    return (
      <Button
        size="sm"
        onClick={openFormDialog}
        className="bg-green-500 me-2 dark:text-white hover:bg-green-600 cursor-pointer dark:bg-green-600 dark:hover:bg-green-500 "
      >
        <Plus className="text-xl " />
        Responder
      </Button>
    );
  }

  const createResponderAccount = async (values) => {
    try {
      setCreateResponderLoading(true);

      //TODO: query
      console.log(values);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCreateResponderLoading(false);
    }
  };

  return (
    <div>
      <TopBar
        breadcrumbsData={breadCrumbs}
        renderTrailer={createRespondersButton}
      />
      <ResponderFormDialog
        title="Create New Responder"
        open={formIsOpen}
        setOpen={setFormIsOpen}
        onSubmit={createResponderAccount}
        loading={createResponderLoading}
        defaultValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          phoneNumber: "",
          email: "",
          password: "",
        }}
        formSchema={createResponderFormSchema}
      />
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
