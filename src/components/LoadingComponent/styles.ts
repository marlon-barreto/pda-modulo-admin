import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    animation: ${rotate} 0.8s ease-in-out 0s infinite;
  }

  p {
    color: #1e1e2d;
    margin-top: 16px;
    font-size: 12px;
  }
`;
