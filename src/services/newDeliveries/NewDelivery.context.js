import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [delivery, setDelivery] = useState({});

  const UPDATE_FORM = (data) => {
    setDelivery({ ...delivery, ...data });
  };

  return <NewDeliveryContext.Provider value={{ delivery, UPDATE_FORM }}>{children}</NewDeliveryContext.Provider>;
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
