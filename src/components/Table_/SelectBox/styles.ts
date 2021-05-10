import styled from 'styled-components';

interface ContainerProps {
  selected: boolean;
}

export const Container = styled.button<ContainerProps>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${props => (props.selected ? '#3699ff' : '#f3f6f9')};
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
