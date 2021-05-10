import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;

  .h1 {
    font-size: 10rem;
    color: #3f4254;
    margin-top: 3.75rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  .p {
    font-size: 1.5rem;
    color: #b5b5c3;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;
