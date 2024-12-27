import { useEffect } from "react";
import supabase from "@/supabase/config";
import moment from "moment";

const useInactiveUsersCleanup = () => {
  useEffect(() => {
    const markInactiveUsers = async () => {
      const THRESHOLD_MINUTES = 1;
      const now = moment();
      const thresholdTime = now.subtract(THRESHOLD_MINUTES, "minutes");

      const { error } = await supabase
        .from("USER ACTIVITY")
        .update({ status: "inactive" })
        .lt("last_active", thresholdTime.toISOString())
        .eq("status", "active");

      if (error) {
        console.error("Error marking inactive users:", error);
      }
    };

    markInactiveUsers(); // Initial call

    const now = new Date();
    const delay = 60000 - (now % 60000); // Calculate the delay to next full minute
    const intervalId = setInterval(() => {
      markInactiveUsers();
    }, delay);

    return () => clearInterval(intervalId);
  }, []);
};

export default useInactiveUsersCleanup;
