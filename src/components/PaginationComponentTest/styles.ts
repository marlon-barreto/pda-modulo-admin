import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .pagination {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;

    .arrow {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f6f9;

      & + .arrow {
        margin-left: 4px;
      }

      img {
        max-width: 10px;
      }
    }

    .double-arrow {
      &:first-child {
        transform: rotate(-180deg);
      }
    }

    .links {
      padding: 0 1px;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .pages {
    width: auto;
    display: flex;
    align-items: center;

    .select {
      width: 70px;
    }

    .text {
      p {
        margin-left: 16px;
        font-size: 13px;
        color: #3f4254;
        line-height: 20px;
        white-space: nowrap;
      }
    }
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  z-index: 10;
`;

interface ButtonLinkProps {
  active: boolean;
}

export const ButtonLink = styled.button<ButtonLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  background: #f3f6f9;
  color: #7e8299;
  font-weight: 500;
  font-size: 12px;
  margin: 0 2px;

  &:hover {
    background: ${darken(0.1, '#f3f6f9')};
  }

  ${props =>
    props.active &&
    css`
      background: #3699ff;
      color: #fff;
      margin: 0 4px;

      &:hover {
        background: ${darken(0.1, '#3699ff')};
      }
    `}
`;
