import React from 'react';

import { Container } from './styles';

interface ProgressBarProps {
  value: number;
  breakPoints?: number[];
  breakPointColors?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  breakPointColors,
  breakPoints,
}) => {
  return (
    <Container
      breakPoints={breakPoints}
      breakPointColors={breakPointColors}
      progress={value}
    >
      <div className="progress-value">
        <span>{`${value.toString()}%`}</span>
        <span> Progresso</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-value" />
      </div>
    </Container>
  );
};

export default ProgressBar;
