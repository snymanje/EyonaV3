import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [delivery, setDelivery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  const UPDATE_FORM = (data) => {
    setDelivery((curr) => ({ ...curr, ...data }));
  };

  const onSubmitBasicInfo = async (payload) => {
    try {
      const { data, error } = await supabase.from('Deliveries').insert([{ ...payload }]);
      if (error) {
        setFechError(error);
        setIsLoading(false);
        console.log(error);
        return null;
      }
      setDelivery(data);
    } catch (error) {
      console.log(error);
      setFechError(error);
      setIsLoading(false);
    }
  };

  const onSubmitTankInfo = async (payload) => {
    try {
      console.log(delivery);
      console.log({ name: 1, delivery: delivery[0].ordernumber, ...payload });
      const { data, error } = await supabase
        .from('Tanks')
        .insert([{ name: 1, delivery: delivery[0].ordernumber, ...payload }]);
      if (error) {
        console.log(error);
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      setDelivery(data);
    } catch (error) {
      console.log(error);
      setFechError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

  return (
    <NewDeliveryContext.Provider
      value={{ delivery, UPDATE_FORM, onSubmitBasicInfo, onSubmitTankInfo, isLoading, fechError }}
    >
      {children}
    </NewDeliveryContext.Provider>
  );
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
