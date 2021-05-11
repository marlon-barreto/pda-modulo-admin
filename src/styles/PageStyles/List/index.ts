import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DashboardItemBackground from '../../../assets/svg/dashboard-item-background.svg';

export const Container = styled.div`
  width: 100%;

  .dashboard {
    display: flex;

    .informations-container {
      margin-top: 56px;

      display: flex;
      justify-content: space-between;

      flex-wrap: wrap;

      width: 100%;

      .information {
        max-width: 288px;
        width: 100%;
        min-height: 140px;
        background: #fff;

        padding: 12px 12px 12px 30px;
        border-radius: 12px;

        margin: 16px 0;

        background-image: url(${DashboardItemBackground});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right top;

        &:nth-of-type(n + 4) {
          margin-top: 32px;
        }

        .title {
          h1 {
            font-weight: 600;
            font-size: 15px;
            line-height: 22px;
            color: #464e5f;
          }
        }

        .text {
          margin-top: 32px;

          p {
            font-weight: bold;
            font-size: 25px;
            line-height: 37px;
            color: #464e5f;
          }
        }
      }
    }
  }

  .block {
    margin-top: 24px;

    .container {
      .content {
        width: 100%;
        height: auto;
        background: #fff;
        border: 1px solid #e5eaee;
        border-radius: 12px;

        .informations-line {
          padding: 0 24px;
          display: flex;
          margin: 16px 0;
          justify-content: space-between;

          flex-wrap: wrap;

          div {
            margin: 0 4px;

            p {
              font-size: 12px;
              line-height: 18px;
              color: #464e5f;
            }

            span {
              font-size: 18px;
              line-height: 27px;
              opacity: 0.7;
              margin-top: 4px;

              &.red {
                color: #f64e60;
              }

              &.green {
                color: #1bc5bd;
              }
            }
          }

          @media screen and (max-width: 710px) {
            justify-content: flex-start;
          }
        }

        .inputs-box {
          padding: 16px;
        }

        .table-box {
          padding: 16px;
        }

        .pagination-box {
          padding: 16px;
        }
      }
    }
  }
`;

export const ButtonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 34px;
  background: #3699ff;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;

  &:hover {
    transition: background 0.3s;
    background: #187de4;
  }
`;
