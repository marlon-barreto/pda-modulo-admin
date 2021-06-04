import styled from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  options?: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid
    ${props => (props.options ? 'rgba(70, 78, 95, 0.32)' : '#fff')};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    border: 2px solid rgba(70, 78, 95, 0.32);
  }

  .image {
    border-radius: 50%;
    background: transparent;
    height: 40px;
  }

  .options {
    display: ${props => (props.options ? 'block' : 'none')};
    z-index: 10;
    width: 160px;
    height: auto;
    background: #fff;
    position: absolute;
    right: 0;
    top: calc(100% + 16px);
    border-radius: 4px;
    filter: drop-shadow(0px 0px 8px rgba(70, 78, 95, 0.32));
    padding: 12px 0;
    z-index: 120;

    &::after {
      position: absolute;
      top: -16px;
      right: 10px;
      content: '';
      border: 8px solid transparent;
      border-bottom-color: #fff;
    }

    .logout {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 16px;
      cursor: pointer;
      background: transparent;

      &:hover {
        background: ${darken(0.05, '#fff')};
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .text {
        p {
          font-size: 16px;
          color: #959cb6;
        }
      }
    }
  }
`;
