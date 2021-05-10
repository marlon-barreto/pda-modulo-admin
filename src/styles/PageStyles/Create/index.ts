import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding-bottom: 128px;

  .block {
    margin-top: 24px;

    .container {
      .content {
        width: 100%;
        height: auto;
        background: #fff;
        border: 1px solid #e5eaee;
        border-radius: 12px;

        .inputs-box {
          display: flex;
          padding: 16px 24px;
        }

        .transfer-list {
          padding: 24px;
        }
      }
    }
  }
`;
