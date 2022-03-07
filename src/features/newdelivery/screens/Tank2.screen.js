import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { TankCore } from '../components/Tank.component';

const formFields = {
  Product: 'tank2_product',
  Size: 'tank2_size',
  ReadingBefore: 'tank2_readingBefore',
  ReadingAfter: 'tank2_readingAfter',
  TotalDelivered: 'tank2_totalDelivered',
};

const schema = yup
  .object({
    [formFields.Product]: yup.string().required('Field is required'),
    [formFields.Size]: yup.string().required('Field is required'),
    [formFields.ReadingBefore]: yup.string().required('Field is required'),
    [formFields.ReadingAfter]: yup.string().required('Field is required'),
  })
  .required();

export const Tank2Screen = ({ navigation }) => (
  <TankCore schema={schema} formFields={formFields} navigation={navigation} title="Tank 2 Inforamtion" nextScreen="SummaryScreen" />
);

Tank2Screen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
