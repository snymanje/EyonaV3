import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

import { DeliveriesContext } from '../deliveries/Deliveries.context';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [delivery, setDelivery] = useState({});
  const [tanks, setTanks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  const { getMyDeliveries } = useContext(DeliveriesContext);

  const UPDATE_FORM = (payload) => {
    setDelivery(payload);
  };

  const UPDATE_FORM_TANKS = (payload) => {
    setTanks(payload);
  };

  const onSubmit = async (payload, navigation) => {
    try {
      console.log('payload', payload);
      setFechError(null);
      setIsLoading(true);
      const { error } = await supabase.from('Deliveries').upsert({ ...payload }, { onConflict: 'Id' });
      if (error) {
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      setDelivery({});
      getMyDeliveries();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MyDeliveries' }],
      });
    } catch (error) {
      setFechError(error);
      setIsLoading(false);
    }
  };

  return (
    <NewDeliveryContext.Provider
      value={{ delivery, tanks, UPDATE_FORM, UPDATE_FORM_TANKS, onSubmit, isLoading, fechError }}
    >
      {children}
    </NewDeliveryContext.Provider>
  );
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
