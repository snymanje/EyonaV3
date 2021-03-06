import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const DeliveriesContext = createContext();

export const DeliveriesContextProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  const getMyDeliveries = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('Deliveries').select().order('created_at', { ascending: false });
      if (error) {
        console.log(error);
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      console.log(data);
      setDeliveries(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setFechError(error);
      setIsLoading(false);
    }
  };

  const getSites = async () => {
    try {
      const { data, error } = await supabase.from('Sites').select();
      if (error) {
        console.log(error);
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      console.log(data);
      setSites(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setFechError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <DeliveriesContext.Provider value={{ deliveries, getMyDeliveries, sites, isLoading, fechError }}>
      {children}
    </DeliveriesContext.Provider>
  );
};

DeliveriesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
