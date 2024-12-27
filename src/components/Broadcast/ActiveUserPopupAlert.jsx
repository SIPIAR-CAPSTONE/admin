import { Popup } from "react-leaflet";
import PopupField from "@/components/Broadcast/PopupField";
import { Mail, Phone, User } from "lucide-react";
import { memo } from "react";
import { capitalize } from "@/lib/utils";

function ActiveUserPopupAlert({ user }) {
  const fullName = `${user?.USER?.first_name} ${user?.USER?.middle_name} ${user?.USER?.last_name}`;
  const phone = user?.USER?.phone_number;
  const email = user?.USER?.email;
  const role = capitalize(user?.role);

  return (
    <Popup>
      <div className="space-y-2.5 w-80 pe-4">
        <div className="mb-4 overflow-hidden text-xl font-semibold line-clamp-2">
          {fullName}
        </div>
        <PopupField
          value={role}
          label="Role"
          Icon={User}
          iconColor="#FFCF67"
          iconBgColor="#FFF0D4"
        />
        <PopupField
          value={phone}
          label="Phone Number"
          Icon={Phone}
          iconColor="#72A6D2"
          iconBgColor="#DBE7FD"
        />
        <PopupField
          value={email}
          label="Email"
          Icon={Mail}
          iconColor="#B85E60"
          iconBgColor="#FED8CD"
        />
      </div>
    </Popup>
  );
}

export default memo(ActiveUserPopupAlert);
