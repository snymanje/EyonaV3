import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { supabase } from '../../lib/supabase';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [delivery, setDelivery] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);
  const [success, setSuccess] = useState(false);

  const UPDATE_FORM = (data) => {
    setDelivery((curr) => ({ ...curr, ...data }));
  };

  const onSubmit = async (newDelivery) => {
    try {
      const { data, error } = await supabase.from('Deliveries').insert([{ ...newDelivery }]);
      if (error) {
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      setSuccess(true);
    } catch (error) {
      setFechError(error);
      setIsLoading(false);
    }
  };

  const onSuccessUpdate = () => {
    setSuccess(false);
  };

  return (
    <NewDeliveryContext.Provider
      value={{ delivery, UPDATE_FORM, onSubmit, isLoading, fechError, success, onSuccessUpdate }}
    >
      {children}
    </NewDeliveryContext.Provider>
  );
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
