import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
		border: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Poppins', sans-serif;
    letter-spacing: -2%;
  }

  button {
    cursor: pointer;
  }

	a {
		text-decoration: none;
	}

	ul {
		list-style: none;
	}

  .container {
    max-width: 1240px;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 140%;
  }

  h1 {
    font-size: 56px;
  }

  h2 {
    font-size: 48px;
  }

  h3 {
    font-size: 40px;
  }

  h4 {
    font-size: 32px;
  }

  h5 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }

  .w33 {
    width: 33%;
  }

  .w50 {
    width: 49%;
  }

  .w66 {
    width: 66%;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }
`;
