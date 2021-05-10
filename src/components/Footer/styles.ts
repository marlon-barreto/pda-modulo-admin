import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 24px;
  width: 100%;
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: -64px;

  .left {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .date {
      opacity: 0.2;

      h1 {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #434349;
      }
    }

    .title {
      margin-left: 8px;

      p {
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        color: #7e7e80;
      }
    }
  }

  .right {
    nav {
      ul {
        display: flex;

        li {
          & + li {
            margin-left: 24px;
          }

          a {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #c0c0c6;
          }
        }
      }
    }
  }
`;
