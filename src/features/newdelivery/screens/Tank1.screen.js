import React from 'react';
import * as yup from 'yup';

import { TankCore } from '../components/Tank.component';

const formFields = {
  Product: 'tank1_product',
  Size: 'tank1_size',
  ReadingBefore: 'tank1_readingBefore',
  ReadingAfter: 'tank1_readingAfter',
  TotalDelivered: 'tank1_totalDelivered',
};

const schema = yup
  .object({
    [formFields.Product]: yup.string().required('Field is required'),
    [formFields.Size]: yup.string().required('Field is required'),
    [formFields.ReadingBefore]: yup.string().required('Field is required'),
    [formFields.ReadingAfter]: yup.string().required('Field is required'),
  })
  .required();

export const Tank1Screen = ({ navigation }) => <TankCore schema={schema} formFields={formFields} navigation={navigation} title="Tank 1 Information" />;
