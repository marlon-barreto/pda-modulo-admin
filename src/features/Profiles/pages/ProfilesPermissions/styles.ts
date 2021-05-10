import styled from 'styled-components';

export const Container = styled.div`
  .block {
    margin-top: 24px;

    .container {
      .profile {
        width: 100%;
        height: auto;
        background: #fff;
        border: 1px solid #e5eaee;
        border-radius: 12px;

        .top-box {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          border-radius: 12px;

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
            font-size: 14px;
            line-height: 21px;
            font-weight: normal;
            color: #212121;
          }

          .buttons {
            display: flex;

            button {
              width: 72px;
              height: 40px;
              border-radius: 8px;
              background: #e4e6ef;
              display: flex;
              align-items: center;
              justify-content: center;

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

              &:nth-of-type(2) {
                background: #f3f6f9;
                margin: 0 8px;
              }

              &:nth-of-type(3) {
                background: #3699ff;

                .text {
                  font-weight: 600;
                  color: #fff;
                }
              }
            }
          }
        }

        .search-box {
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

  .bottom {
    margin-top: 124px;
  }
`;
