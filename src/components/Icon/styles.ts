import styled from 'styled-components';

interface Props {
  icon: string;
  color: string;
}

export const Icon = styled.div<Props>`
  width: 25px;
  height: 25px;
  background-color: ${props => props.color};
  -webkit-mask: ${props => `url(${props.icon}) no-repeat center`};
  mask: ${props => `url(${props.icon}) no-repeat center`};
`;
