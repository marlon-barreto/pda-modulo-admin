import React from 'react';

import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="left">
        <div className="date">
          <h1>2021</h1>
        </div>
        <div className="title">
          <p>© PDA Soluções </p>
        </div>
      </div>
      <div className="right">
        <nav>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#help">Help</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default Footer;
