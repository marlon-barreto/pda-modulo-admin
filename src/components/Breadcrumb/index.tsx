import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface FixedHeaderProps {
  title: string;
  icon: IconBaseProps;
}

const FixedHeader: React.FC<FixedHeaderProps> = ({ title, icon, children }) => {
  return (
    <Container>
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="story">
        <div className="block-story">
          {icon}
          <p>{children}</p>
        </div>
        <div className="block" />
      </div>
    </Container>
  );
};

export default FixedHeader;
