import { Popup } from "react-leaflet";
import PopupField from "@/components/Broadcast/PopupField";
import { Ambulance, Calendar, Clock, Pencil, Save, User } from "lucide-react";
import { cn, getDateString, getTimeGap } from "@/lib/utils";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

function PopupAlert({ alert, responders }) {
  const { toast } = useToast();
  const fullName = `${alert.first_name} ${alert.last_name}`;
  const timeRequested = getTimeGap(alert.time);
  const dateRequested = getDateString(alert.time);
  const status =
    alert.status === "pending" ? "No Responder" : "Responder going";

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const openConfirmationDialog = () => setIsLogoutDialogOpen(true);

  const [editMode, setEditMode] = useState(false);
  const assignedResponderName =
    responders.find((responder) => responder.id === alert.assignedResponderId)
      ?.name || "None";
  const [selectedResponder, setSelectedResponder] = useState(
    assignedResponderName
  );
  const handleSelectChange = (selectedResponderId) => {
    setSelectedResponder(
      responders.find((responder) => responder.id === selectedResponderId)?.name
    );
  };

  const handleSave = () => {
    //!TODO:
    console.log("change assigned responder in database", selectedResponder);

    //!TODO: adjust kung success ba or dili
    toast({
      title: "Assigned Successfully",
      description: "Successfully assigned responder.",
      duration: 1000,
    });
    setEditMode(false);
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
        <div className="pt-6">
          <span className="block text-sm mb-1.5 font-semibold">
            Assigned Responder:
          </span>
          <div className="flex items-center gap-x-1.5">
            <Select
              defaultValue={alert.assignedResponderId}
              onValueChange={handleSelectChange}
              disabled={editMode === false}
            >
              <SelectTrigger
                className={cn(
                  "w-full border p-2 rounded h-9 text-start",
                  editMode ? "border-black" : "border-neutral-300"
                )}
              >
                {selectedResponder}
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
                            ? "bg-green-500 dark:bg-green-600 dark:text-white"
                            : "bg-red-500 dark:bg-red-600 dark:text-white"
                        }
                      >
                        {responder.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ActionButton
              editMode={editMode}
              setEditMode={setEditMode}
              onSave={openConfirmationDialog}
            />
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        setOpen={setIsLogoutDialogOpen}
        title="Assign Responder"
        description="Are you sure you want to assign this responder to this emergency request?"
        onConfirm={handleSave}
        onCancel={() => setEditMode(false)}
      />
    </Popup>
  );
}

export default PopupAlert;

function ActionButton({ editMode, setEditMode, onSave }) {
  if (editMode) {
    return (
      <Button
        className="text-white bg-green-500 rounded size-9 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white"
        onClick={onSave}
      >
        <Save />
      </Button>
    );
  }

  return (
    <Button
      className="text-white bg-black rounded size-9 dark:bg-black hover:bg-neutral-800 dark:text-white dark:hover:bg-neutral-800"
      onClick={() => setEditMode(true)}
    >
      <Pencil />
    </Button>
  );
}
