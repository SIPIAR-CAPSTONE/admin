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
import supabase from "@/supabase/config";

function PopupAlert({ alert, responders }) {
  const { toast } = useToast();
  const fullName = `${alert?.USER?.first_name} ${alert?.USER?.last_name}`;
  const timeRequested = getTimeGap(alert.date);
  const dateRequested = getDateString(alert.date);

  const status =
    alert.status === "Completed"
      ? "Completed"
      : alert.status === "On Going"
      ? "Responder Going"
      : "No Responder";

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const openConfirmationDialog = () => setIsLogoutDialogOpen(true);

  const [editMode, setEditMode] = useState(false);

  const [selectedResponder, setSelectedResponder] = useState({
    id: alert?.responder_id,
    name: alert?.RESPONDER
      ? `${alert?.RESPONDER?.first_name} ${alert?.RESPONDER?.last_name}`
      : "None",
  });

  const handleSelectChange = (selectedResponderId) => {
    const selected = responders.find(
      (responder) => responder?.responder_id === selectedResponderId
    );
    if (selected) {
      setSelectedResponder({
        id: selected?.responder_id,
        name: `${selected.USER.first_name} ${selected.USER.last_name}`,
      });
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedResponder.id) return;

      const { data, error: fetchREsponderError } = await supabase
        .from("RESPONDER")
        .select("user_id")
        .eq("responder_id", selectedResponder.id)
        .single();

      if (fetchREsponderError) {
        toast({
          title: "Error fetching responder",
          description: fetchREsponderError.message,
          duration: 1000,
          variant: "destructive",
        });
        return;
      }
      const userId = data.user_id;

      const { error } = await supabase
        .from("BROADCAST")
        .update({ responder_id: userId })
        .eq("broadcast_id", alert.broadcast_id);

      if (!error) {
        toast({
          title: "Assigned Successfully",
          description: "Successfully assigned responder.",
          duration: 1000,
        });
      } else {
        toast({
          title: "Assigning Unsuccessful",
          description: "Responder not assigned.",
          duration: 1000,
          variant: "destructive",
        });
        return;
      }

      const { error: updateResponderError } = await supabase
        .from("RESPONDER")
        .update({ is_available: false })
        .eq("responder_id", selectedResponder.id);

      if (updateResponderError) {
        toast({
          title: "Error updating responder availability",
          description: updateResponderError.message,
          duration: 1000,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Error updating responder availability",
        description: error.message,
        duration: 1000,
        variant: "destructive",
      });
    } finally {
      setEditMode(false);
    }
  };

  return (
    <Popup>
      <div className="space-y-2.5 w-80 pe-4">
        <div className="mb-4 text-2xl font-bold">{alert.address}</div>
        <PopupField
          value={fullName}
          label="Bystander"
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
                {selectedResponder.name}
              </SelectTrigger>
              <SelectContent>
                {responders.map((responder) => {
                  return (
                    <SelectItem
                      key={responder?.responder_id}
                      value={responder?.responder_id}
                      disabled={!responder?.is_available}
                    >
                      <div className="space-x-4">
                        <span aria-label="responder name">{`${responder?.USER.first_name} ${responder?.USER.last_name}`}</span>
                        <Badge
                          aria-label="responder availability status"
                          className={
                            responder?.is_available
                              ? "bg-green-500 dark:bg-green-600 dark:text-white"
                              : "bg-red-500 dark:bg-red-600 dark:text-white"
                          }
                        >
                          {`${
                            responder?.is_available
                              ? "Available"
                              : "Not Available"
                          }`}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
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
