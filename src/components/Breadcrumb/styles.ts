import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 54px;
  background: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-top: 1px solid #eef0f8;
  z-index: 99;

  .title {
    h1 {
      font-size: 13px;
      font-weight: 500;
      color: #434349;
    }
  }

  .story {
    display: flex;
    align-items: center;
    margin-left: 24px;

    .block-story {
      display: flex;
      align-items: center;

      p {
        font-weight: 500;
        font-size: 13px;
        line-height: 27px;
        color: #c0c0c6;
        margin-left: 8px;
      }
    }
  }
`;
