import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  padding: 64px 112px;

  h1 {
    font-size: 72px;
    color: #3f4254;
    margin-top: 3.75rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    font-size: 16px;
    color: #b5b5c3;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;
