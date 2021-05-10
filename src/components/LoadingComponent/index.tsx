import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { Container } from './styles';

const LoadingComponent: React.FC = () => {
  return (
    <Container>
      <BiLoaderAlt size={48} color="#6993FF" />
      <p>Carregando...</p>
    </Container>
  );
};

export default LoadingComponent;
