import { Popup } from "react-leaflet";
import PopupField from "@/components/Broadcast/PopupField";
import { Ambulance, Calendar, Clock, User } from "lucide-react";
import { cn, getDateString, getTimeGap } from "@/lib/utils";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

function PopupAlert({ alert, responders }) {
  const fullName = `${alert.first_name} ${alert.last_name}`;
  const timeRequested = getTimeGap(alert.time);
  const dateRequested = getDateString(alert.time);
  const status =
    alert.status === "pending" ? "No Responder" : "Responder going";
  const assignedResponderName =
    responders.find((responder) => responder.id === alert.assignedResponderId)
      ?.name || "None";

  const setAssignedResponder = (selectedResponderId) => {
    console.log("change assigned responder in database", selectedResponderId);
    // then refetch and render
  };

  return (
    <Popup>
      <div className="space-y-2.5 w-80 pe-4">
        <div className="mb-4 text-2xl font-bold">{alert.address}</div>
        <PopupField
          value={fullName}
          label="User"
          Icon={User}
          iconColor="#FFCF67"
          iconBgColor="#FFF0D4"
        />
        <PopupField
          value={timeRequested}
          label="Time requested"
          Icon={Clock}
          iconColor="#72A6D2"
          iconBgColor="#DBE7FD"
        />
        <PopupField
          value={dateRequested}
          label="Date requested"
          Icon={Calendar}
          iconColor="#B85E60"
          iconBgColor="#FED8CD"
        />
        <PopupField
          value={status}
          label="Status"
          Icon={Ambulance}
          iconColor="#54B0A2"
          iconBgColor="#D0FEF5"
        />
        <div className="pt-4">
          <span className="block text-xs mb-1.5 font-semibold">
            Assigned Responder:
          </span>
          <Select
            defaultValue={alert.assignedResponderId}
            onValueChange={setAssignedResponder}
          >
            <SelectTrigger
              className={cn(
                "w-full p-2 border rounded text-start",
                assignedResponderName === "None" && "text-red-500"
              )}
            >
              {assignedResponderName}
            </SelectTrigger>
            <SelectContent>
              {responders.map((responder) => (
                <SelectItem
                  key={responder.id}
                  value={responder.id}
                  disabled={responder.status === "unavailable"}
                >
                  <div className="space-x-4">
                    <span aria-label="responder name">{responder.name}</span>
                    <Badge
                      aria-label="responder availability status"
                      className={
                        responder.status === "available"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {responder.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Popup>
  );
}

export default PopupAlert;
