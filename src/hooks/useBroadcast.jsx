import { useEffect, useRef, useState } from "react";
import supabase from "@/supabase/config";
import { useToast } from "@/hooks/use-toast";

export default function useBroadcast() {
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(false);
  const emergencyAlertsLength = emergencyAlerts.length;
  let pollingInterval;
  const { toast } = useToast();

  const isInitialized = useRef(false);
  const isFetching = useRef(false);

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
    // Prevent double fetching
    if (isFetching.current) {
      console.log("fetchAlerts already in progress, skipping...");
      return;
    }

    isFetching.current = true;

    try {
      setLoading(true);
      console.log("refetch alert1");
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
      console.log("fetch Alerts: ", data);
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  /*
   *
   * Get initial broadcast data in first load
   *
   */
  useEffect(() => {
    if (isInitialized.current) {
      return; // Prevent reinitializing on rerenders
    }

    isInitialized.current = true; // Mark as initialized

    fetchResponders();
    fetchAlerts();

    //refetch every 20 seconds
    pollingInterval = setInterval(() => {
      fetchResponders();
      fetchAlerts();
      console.log("refetch every 20 seconds");
    }, 20000);

    return () => {
      clearInterval(pollingInterval);
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
