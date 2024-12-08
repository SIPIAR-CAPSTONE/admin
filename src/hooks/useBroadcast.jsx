import { useEffect, useState } from "react";
import supabase from "@/supabase/config";
import { useToast } from "@/hooks/use-toast";

export default function useBroadcast() {
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(false);
  const emergencyAlertsLength = emergencyAlerts.length;
  let pollingInterval;
  const { toast } = useToast();

  const fetchResponders = async () => {
    const { data, error } = await supabase.from("RESPONDER").select(`
        *,
        USER: user_id (first_name, last_name)
      `);

    if (error) {
      toast({
        title: "Error fetching responders",
        description: data.message,
        duration: 1000,
      });
    }
    if (data) {
      setResponders(data);
    }
  };

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("BROADCAST").select(`
        *,
        USER: user_id (first_name, last_name),
        RESPONDER: responder_id (first_name, last_name)
      `);

      if (error) {
        toast({
          title: "Error fetching broadcast alerts",
          description: data.message,
          duration: 1000,
        });
      }
      if (data) {
        setEmergencyAlerts(data);
      }
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  /*
   *
   * Get initial broadcast data in first load
   *
   */
  useEffect(() => {
    fetchResponders();
    fetchAlerts();

    //refetch every 20 seconds
    pollingInterval = setInterval(() => {
      fetchResponders();
      fetchAlerts();
    }, 20000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  /*
   *
   * Observe the broadcast table for changes then refetch
   *
   */
  useEffect(() => {
    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "broadcast" },
        async () => {
          console.log("realtime: new data received");
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return {
    emergencyAlerts,
    emergencyAlertsLength,
    refetchAlerts: fetchAlerts,
    responders,
    refetchResponders: fetchResponders,
    loading,
  };
}
