import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TankCore } from '../components/Tank.component';

const schema = yup
  .object({
    tank1product: yup.string().required('Field is required'),
    tank1size: yup.string().required('Field is required'),
    tank1_reading_before: yup.string().required('Field is required'),
    tank1_reading_after: yup.string().required('Field is required'),
  })
  .required();

export const Tank1Screen = ({ navigation }) => <TankCore navigation={navigation} schema={schema} />;
