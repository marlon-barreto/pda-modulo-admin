import React from 'react';

import { Icon as StyledIcon } from './styles';

interface Props {
  color: string;
  icon: string;
}

const Icon: React.FC<Props> = ({ color, icon }) => {
  return <StyledIcon color={color} icon={icon} />;
};

export default Icon;
