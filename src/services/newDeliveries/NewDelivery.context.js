import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [delivery, setDelivery] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  const UPDATE_FORM = (data) => {
    setDelivery((curr) => ({ ...curr, ...data }));
  };

  const onSubmit = async (payload, navigation) => {
    try {
      setFechError(null);
      setIsLoading(true);
      const { error } = await supabase.from('Deliveries').upsert({ ...payload }, { onConflict: 'ordernumber' });
      if (error) {
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      setDelivery({});
      navigation.navigate('MyDeliveries');
    } catch (error) {
      setFechError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(delivery);
  }, [delivery]);

  return (
    <NewDeliveryContext.Provider value={{ delivery, UPDATE_FORM, onSubmit, isLoading, fechError }}>
      {children}
    </NewDeliveryContext.Provider>
  );
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
