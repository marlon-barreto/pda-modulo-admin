import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 12px 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -1px;
    transform: translate3d(-50%, 0, 0);
    width: calc(100% - 32px);
    height: 1px;
    background: #e5eaee;
    border-radius: 6px;
  }

  h1 {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #212121;

    @media screen and (max-width: 580px) {
      margin-bottom: 8px;
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;

    button {
      width: 72px;
      height: 40px;
      border-radius: 8px;
      background: #e4e6ef;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${darken(0.05, '#e4e6ef')};
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
      }

      .text {
        font-size: 13px;
        font-weight: 500;
        color: #7e8299;
      }

      &.password {
        background: #ffa800;
        width: 127px;
        margin: 0 8px;

        .text {
          font-weight: 600;
          color: #fff;
        }
      }

      &.reset {
        background: #f3f6f9;
        margin: 0 8px;

        &:hover {
          background: ${darken(0.05, '#f3f6f9')};
        }

        @media screen and (max-width: 410px) {
          margin: 8px 8px 0 0;
        }
      }

      &.save {
        background: #3699ff;

        &:hover {
          background: ${darken(0.05, '#3699ff')};
        }

        .text {
          font-weight: 600;
          color: #fff;
        }

        @media screen and (max-width: 480px) {
          margin-top: 8px;
        }
      }

      &.filter {
        background: #18c6bb;
        position: relative;

        &:hover {
          background: ${darken(0.05, '#18c6bb')};
        }

        .text {
          color: #fff;
        }
      }
    }

    .filter-row {
      position: relative;

      .filter-header {
        width: 100%;
        margin-bottom: 16px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .close {
          &:hover {
            opacity: 0.7;
            cursor: pointer;
          }
        }
      }

      .filter-box {
        &.active {
          display: block;
        }

        display: none;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        padding: 24px;
        background: #ffffff;
        -webkit-box-shadow: 0px 2px 38px -20px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 2px 38px -20px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 2px 38px -20px rgba(0, 0, 0, 0.75);

        border-radius: 16px;
        width: 500px;

        z-index: 100000;

        .filter-content {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
