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
