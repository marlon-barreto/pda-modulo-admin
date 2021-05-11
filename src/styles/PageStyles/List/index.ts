import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;

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

          div {
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
