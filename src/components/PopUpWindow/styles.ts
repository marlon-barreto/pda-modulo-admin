import styled from 'styled-components';
import { darken } from 'polished';

export const WindowContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  background: rgba(14, 14, 14, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup {
    width: 540px;
    height: 200px;
    background: #fff;
    border-radius: 4px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    position: relative;

    h5 {
      font-weight: 600;
      position: absolute;
      top: 16px;
    }

    .buttons {
      position: absolute;
      bottom: 16px;
      right: 24px;

      button {
        width: 88px;
        height: 48px;
        border-radius: 4px;
        font-weight: 600;
        color: #989bae;
        background: transparent;
        transition: background 0.3s;

        &:hover {
          background: ${darken(0.05, '#fff')};
        }

        & + button {
          margin-left: 16px;
        }

        &.submit {
          background: #3699ff;
          color: #fff;

          &:hover {
            background: ${darken(0.05, '#3699ff')};
          }
        }
      }
    }
  }
`;
