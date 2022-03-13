import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { TankCore } from '../components/Tank.component';

const formFields = {
  Product: 'Tank1Product',
  Size: 'Tank1Size',
  ReadingBefore: 'Tank1ReadingBefore',
  ReadingAfter: 'Tank1ReadingAfter',
  TotalDelivered: 'Tank1TotalDelivered',
  AGTSlip: 'Tank1AgtSlip',
};

const schema = yup
  .object({
    [formFields.Product]: yup.string().required('Field is required'),
    [formFields.Size]: yup.string().required('Field is required'),
    [formFields.ReadingBefore]: yup.string().required('Field is required'),
    [formFields.ReadingAfter]: yup.string().required('Field is required'),
  })
  .required();

export const Tank1Screen = ({ route, navigation }) => {
  const { delivery } = route.params;
  return (
    <TankCore
      schema={schema}
      formFields={formFields}
      navigation={navigation}
      title="Tank 1 Information"
      nextScreen="SummaryScreen"
      delivery={delivery}
    />
  );
};

Tank1Screen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
