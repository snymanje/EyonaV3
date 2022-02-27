import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const DeliveriesContext = createContext();

export const DeliveriesContextProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getMyDeliveries = async () => {
      try {
        const { data, error } = await supabase.from('Deliveries').select();
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
    getSites();
    getMyDeliveries();
  }, []);

  return <DeliveriesContext.Provider value={{ deliveries, sites, isLoading, fechError }}>{children}</DeliveriesContext.Provider>;
};

DeliveriesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
