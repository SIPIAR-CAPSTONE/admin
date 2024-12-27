import { useEffect, useState } from "react";
import supabase from "@/supabase/config";
import moment from "moment";

const useActiveUsers = (interval = 20) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalActiveUsers = users?.length;
  let intervalId;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("get active users ", moment().format("mm:ss"));
      const { data, error } = await supabase
        .from("USER ACTIVITY")
        .select(
          `
        *,
        USER:user_id(
          first_name,
          middle_name,
          last_name,
          phone_number,
          email
        )
        `
        )
        .eq("status", "active");

      if (error) {
        console.error("Error fetching active users:", error);
        return;
      }

      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  //if user is not active in 10 seconds, mark them inactive
  const markInactiveUsers = async () => {
    const THRESHOLD_MINUTES = 0.1665; //10 seconds
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

  //every 20 seconds get active users and mark inactive users
  useEffect(() => {
    // Initial call
    fetchUsers();
    markInactiveUsers();

    intervalId = setInterval(() => {
      markInactiveUsers();
      fetchUsers();
    }, interval * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const channels = supabase
      .channel("active-users-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "USER ACTIVITY" },
        (payload) => {
          console.log("Real-time active user update received:", payload);
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return { users, totalActiveUsers, loading };
};

export default useActiveUsers;
