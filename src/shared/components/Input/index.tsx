import React from 'react';

import { Input as InputComponents, InputProps } from '@antoniodcorrea/components';

import './Input.less';

export const Input: React.FC<InputProps> = (props) => <InputComponents {...props} />;
