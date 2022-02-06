import React, { useState, createContext, useEffect } from "react";
import { supabase } from "../../services/supabase/initSupabase";

export const DeliveriesContext = createContext();

export const DeliveriesContextProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getdata = async () => {
      try {
        const { data, error } = await supabase.from("Deliveries").select();
        if (error) {
          console.log(error);
          setError(error);
          setIsLoading(false);
          return null;
        }
        console.log(data);
        setDeliveries(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    };
    getdata();
  }, []);

  return (
    <DeliveriesContext.Provider value={{ deliveries, isLoading, error }}>
      {children}
    </DeliveriesContext.Provider>
  );
};
