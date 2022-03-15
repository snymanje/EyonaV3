import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { decode } from 'base64-arraybuffer';
import { supabase } from '../../lib/supabase';

import { DeliveriesContext } from '../deliveries/Deliveries.context';

export const NewDeliveryContext = createContext();

export const NewDeliveryContextProvider = ({ children }) => {
  const [deliveryState, setDeliveryState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fechError, setFechError] = useState(null);

  const { getMyDeliveries } = useContext(DeliveriesContext);

  const setFormData = (payload) => {
    setDeliveryState(payload);
  };

  const onSubmit = async (payload, navigation) => {
    try {
      setFechError(null);
      setIsLoading(true);
      const { data, error } = await supabase.from('Deliveries').upsert({ ...payload }, { onConflict: 'Id' });
      if (error) {
        setFechError(error);
        setIsLoading(false);
        return null;
      }
      setDeliveryState((curr) => ({ ...curr, ...data[0] }));
      getMyDeliveries();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MyDeliveriesTab' }],
      });
    } catch (error) {
      setFechError(error);
      setIsLoading(false);
    }
  };

  const UploadImage = async (imageResult, fileName, imageUrl) => {
    setFechError(null);
    setIsLoading(true);
    const { error } = await supabase.storage.from('agtslips').remove([imageUrl]);
    if (error) {
      setIsLoading(false);
      return new Error(`Deleting file failed with error ${error}`);
    }

    const { error: uploadError } = await supabase.storage
      .from('agtslips')
      .upload(fileName, decode(imageResult.base64), {
        contentType: 'image/png',
        upsert: true,
      });
    if (uploadError) {
      setIsLoading(false);
      return new Error(`Uploading file failed with error ${error}`);
    }
    setIsLoading(false);
    return supabase.storage.from('agtslips').getPublicUrl(fileName);
  };

  return (
    <NewDeliveryContext.Provider value={{ deliveryState, setFormData, onSubmit, isLoading, fechError, UploadImage }}>
      {children}
    </NewDeliveryContext.Provider>
  );
};

NewDeliveryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
