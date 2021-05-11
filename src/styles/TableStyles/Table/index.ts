import styled, { css } from 'styled-components';

interface TableProps {
  profileTable?: boolean;
  permissionsTable?: boolean;
}

const Table = styled.table<TableProps>`
  width: 96%;
  margin: 0 auto;
  border-collapse: collapse;

  thead,
  tbody {
    tr {
      td,
      th {
        padding: 12px 0;
      }
    }
  }

  thead {
    text-align: left;

    tr {
      th {
        .title {
          display: flex;
          align-items: center;

          h1 {
            font-size: 12px;
            color: #b5b5c3;
          }

          .icon {
            width: 24px;
            display: flex;
            align-items: center;
            margin-left: 8px;

            img {
              max-width: 100%;
            }
          }
        }
      }
    }
  }

  tbody {
    tr {
      td {
        border-top: 1px solid #e5eaee;
        padding: 4px 0;
        width: auto;

        ${props =>
          props.profileTable &&
          css`
            width: 15%;

            &:nth-of-type(2) {
              width: 55%;
            }

            &:last-child {
              width: 10%;
            }
          `}

        ${props =>
          props.permissionsTable &&
          css`
            width: 10%;

            &:nth-of-type(3) {
              width: 50%;
            }
          `}

        .code-item {
          display: flex;
          align-items: center;

          p {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            color: #464e5f;
          }

          .svg-icon-success {
            fill: #f64e60;
            background: #f64e60;
          }
        }

        .text {
          display: flex;
          align-items: center;

          p {
            font-weight: 400;
            font-size: 13px;
            line-height: 19px;
            color: #b5b5c3;
          }
        }

        .boolean-item {
          .yes,
          .no {
            width: 65px;
            height: 26px;
            background: #c9f7f5;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;

            p {
              font-weight: 500;
              font-size: 11px;
              line-height: 16px;
              color: #1bc5bd;
            }
          }

          .no {
            background: #fff4de;

            p {
              color: #ffa800;
            }
          }
        }

        .actions-item {
          display: flex;
          justify-content: flex-end;

          .action {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;

            &:hover {
              transition: 0.5s;
              background: #f1f1f1;
            }

            margin-left: 10px;

            img {
              max-width: 50%;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }
`;

export default Table;
