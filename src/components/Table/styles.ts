import styled, { css, keyframes } from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

export const Container = styled.div`
  @media screen and (max-width: 1224px) {
    overflow-x: auto;
  }

  .table-box {
    width: 98%;
    margin: 0 auto;
    border-collapse: collapse;

    thead,
    tbody {
      tr {
        td,
        th {
          padding: 12px 8px;
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

            button: {
              background: none;
              box-shadow: none;
              color: inherit;
              border: none;
              padding: 0;
              font: inherit;
              outline: inherit;
              margin: 0;
            }

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

          &:last-child {
            width: 10%;
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

          .code-item {
            display: flex;
            align-items: center;

            p {
              font-weight: 600;
              font-size: 14px;
              line-height: 21px;
              color: #464e5f;
            }
          }

          .item {
            p {
              font-weight: 600;
              font-size: 13px;
              line-height: 19px;
              color: #b5b5c3;
            }
          }

          .row-actions-item {
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
              position: relative;

              .hover-item {
                display: none;
                position: absolute;
                bottom: 40px;
                background: #fff;
                padding: 8px 16px;
                border-radius: 4px;
                box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -webkit-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -moz-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                font-weight: 500;
                font-size: 13px;
                line-height: 19px;
                color: #1e1e2d;
              }

              &:hover {
                transition: 0.5s;
                background: #f2f2f2;

                .hover-item {
                  display: block;
                }
              }

              & + .action {
                margin-left: 10px;
              }

              img {
                max-width: 50%;
                border-radius: 8px;
              }
            }
          }

          .row-actions-button-detail {
            display: flex;
            justify-content: flex-end;

            p {
              font-weight: 600;
              font-size: 14px;
              line-height: 21px;
            }

            .action {
              width: 32px;
              height: 32px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              position: relative;

              .hover-item {
                display: none;
                position: absolute;
                bottom: 40px;
                background: #fff;
                padding: 8px 16px;
                border-radius: 4px;
                box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -webkit-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -moz-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                font-weight: 500;
                font-size: 13px;
                line-height: 19px;
                color: #1e1e2d;
              }

              &:hover {
                transition: 0.5s;
                background: #f2f2f2;

                .hover-item {
                  display: block;
                }
              }

              & + .action {
                margin-left: 10px;
              }

              img {
                max-width: 50%;
                border-radius: 8px;
              }
            }
          }

          .row-actions-button {
            display: flex;
            align-items: center;

            p {
              font-weight: 600;
              font-size: 14px;
              line-height: 21px;
            }

            .action {
              width: 32px;
              height: 32px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              position: relative;

              .hover-item {
                display: none;
                position: absolute;
                bottom: 40px;
                background: #fff;
                padding: 8px 16px;
                border-radius: 4px;
                box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -webkit-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                -moz-box-shadow: 1px 5px 14px 0px rgba(0, 0, 0, 0.1);
                font-weight: 500;
                font-size: 13px;
                line-height: 19px;
                color: #1e1e2d;
              }

              &:hover {
                transition: 0.5s;
                background: #f2f2f2;

                .hover-item {
                  display: block;
                }
              }

              & + .action {
                margin-left: 10px;
              }

              img {
                max-width: 50%;
                border-radius: 8px;
              }
            }
          }
        }
      }
    }
  }
`;

export const SortButton = styled.button`
  background-color: inherit;
  justify-content: center;
  min-width: fit-content;
  align-content: flex-start;
  margin-left: 0 !important;
  img {
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-content: center;
  }
`;

interface CellContainerProps {
  boolean?: 'true' | 'false';
  stylePattern?:
    | 'currency'
    | 'number'
    | 'date'
    | 'string'
    | 'boolean'
    | 'datetime'
    | 'time';
}

export const CellContainer = styled.td<CellContainerProps>`
  max-width: 25%;
  min-width: 5%;
  width: 10%;
  padding: 4px;

  div {
    p {
      font-size: 13px;
      font-weight: 400;
      line-height: 19px;
      color: #b5b5c3;
    }
  }

  ${props =>
    props.stylePattern === 'currency' &&
    css`
      min-width: 20%;
      width: 15%;
    `}

  ${props =>
    props.stylePattern === 'number' &&
    css`
      min-width: 20%;
      width: 10%;
    `}

  ${props =>
    props.stylePattern === 'date' &&
    css`
      min-width: 20%;
      width: 15%;
    `}

  ${props =>
    props.stylePattern === 'string' &&
    css`
      min-width: 20%;
      width: 25%;
    `}

  ${props =>
    props.stylePattern === 'boolean' &&
    css`
      max-width: 30%;

      div {
        width: 65px !important;
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
    `}

  ${props =>
    props.boolean === 'false' &&
    css`
      div {
        background: #fff4de;

        p {
          color: #ffa800;
        }
      }
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    animation: ${rotate} 0.8s ease-in-out 0s infinite;
  }

  p {
    color: #1e1e2d;
    margin-top: 16px;
    font-size: 12px;
  }
`;
