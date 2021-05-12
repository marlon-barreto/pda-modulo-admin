import styled from 'styled-components';

export const ContainerHeader = styled.div`
  display: flex;
  width: 100%;
  padding-top: 1.5rem;
  padding-left: 1.5rem;

  .flex-root {
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 11px;
    color: #464e5f;

    .header_content {
      color: #464e5f;
    }

    .header_content_doc {
      color: #f64e60;
      font-size: 12px;
    }
    .header_content_ini {
      color: 1759ee;
      font-size: 12px;
    }
  }
`;
