import styled from 'styled-components';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { darken } from 'polished';
import { FormHTMLAttributes } from 'react';

interface ContainerProps extends FormHTMLAttributes<FormHandles> {
  justifycontent: string | undefined;
}

export const Container = styled(Form)<ContainerProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props =>
    props.justifycontent ? props.justifycontent : 'space-between'};
  align-items: flex-start;

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;

    button {
      width: 99px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      background: #e5eaee;

      &:hover {
        transition: background 0.2s;
        background: ${darken(0.05, '#e5eaee')};
      }

      & + button {
        margin-left: 6px;
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 13px;

        img {
          max-width: 100%;
        }
      }

      .text {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #464e5f;
      }

      &:last-child {
        width: 149px;
        border-radius: 6px;
        background: #1bc5bd;

        &:hover {
          background: ${darken(0.05, '#1bc5bd')};
        }

        .text {
          font-weight: 600;
          color: #fff;
        }
      }
    }
  }
`;

interface InputContainerProps {
  width?: number;
}

export const InputContainer = styled.div<InputContainerProps>`
  width: ${props => `${props.width}%`};
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  & + &:nth-of-type(n + 4) {
    margin-top: 24px;
  }

  label {
    font-size: 12px;
    line-height: 18px;
    color: #464e5f;
    text-align: left;
  }

  @media screen and (max-width: 910px) {
    width: 50% !important;

    & + &:nth-of-type(n + 3) {
      margin-top: 16px;
    }
  }

  @media screen and (max-width: 610px) {
    width: 100% !important;

    & + & {
      margin-top: 16px;
    }
  }
`;
