import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/Bystander/column";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge, BadgeCheck, Plus } from "lucide-react";
import supabase from "@/supabase/config";
import BystanderFormDialog from "@/components/Bystander/BystanderFormDialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { z } from "zod";

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

const createBystanderFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string(),
  birthday: z.coerce.date(),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .regex(/^[0-9]+$/, { message: "Phone number must be numeric" })
    .regex(/^(09)/, { message: "Phone number must start with 09" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  houseNumber: z.string(),
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

export default function BystandersPage() {
  const [bystanderData, setBystanderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createBystanderLoading, setCreateBystanderLoading] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const openFormDialog = () => setFormIsOpen(true);

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
        console.error("Error fetching bystander data:", error.message);
      }

      if (data) {
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

  function createBystanderButton() {
    return (
      <Button
        size="sm"
        onClick={openFormDialog}
        className="bg-green-500 me-2 dark:text-white hover:bg-green-600 cursor-pointer dark:bg-green-600 dark:hover:bg-green-500"
      >
        <Plus className="text-xl" />
        Bystander
      </Button>
    );
  }

  const createBystanderAccount = async (values) => {
    try {
      setCreateBystanderLoading(true);

      //TODO: query
      console.log(values);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCreateBystanderLoading(false);
    }
  };

  return (
    <div>
      <TopBar
        breadcrumbsData={breadCrumbs}
        renderTrailer={createBystanderButton}
      />
      <BystanderFormDialog
        title="Create New Bystander"
        open={formIsOpen}
        setOpen={setFormIsOpen}
        onSubmit={createBystanderAccount}
        loading={createBystanderLoading}
        defaultValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          birthday: "",
          phoneNumber: "",
          barangay: "",
          street: "",
          houseNumber: "",
          email: "",
          password: "",
        }}
        formSchema={createBystanderFormSchema}
      />
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
