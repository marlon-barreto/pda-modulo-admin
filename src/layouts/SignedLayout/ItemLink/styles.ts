import styled from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  containerClosed: boolean;
  opened: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  cursor: pointer;

  .title {
    width: 100%;
    height: 44px;

    .container {
      background: ${props => (props.opened ? '#1b1b28' : '#1e1e2d')};
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .icon {
          width: 24px;
          height: 24px;

          img {
            max-width: 100%;
          }
        }

        .text {
          display: ${props => (props.containerClosed ? 'none' : 'block')};
          margin-left: 8px;

          p {
            font-size: 13px;
            color: ${props => (props.opened ? '#fff' : '#a2a3b7')};
          }
        }
      }

      .arrow {
        display: ${props => (props.containerClosed ? 'none' : 'flex')};
        align-items: center;
        transition: transform 0.3s;
        transform: ${props =>
          props.opened ? 'rotate(0deg)' : 'rotate(-90deg)'};
      }
    }
  }

  .sub-itens {
    display: ${props =>
      props.opened && !props.containerClosed ? 'block' : 'none'};

    .container {
      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        padding-left: 24px;

        .link {
          display: flex;
          align-items: center;

          a {
            font-size: 12px;
            color: #888c9f;
          }

          &.selected {
            a {
              color: #fff;
            }
          }
        }

        &:hover {
          .link {
            a {
              color: #fff;
            }
          }
        }

        .arrow {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  @media screen and (max-width: 910px) {
    .title {
      .container {
        .left {
          .text {
            display: block;
          }
        }
      }
    }

    .sub-itens {
      display: block;
    }
  }
`;
