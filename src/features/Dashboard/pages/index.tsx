import React from 'react';

import { Container } from '../../../styles/PageStyles/List';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <div className="container">
        <div className="dashboard">
          <div className="informations-container">
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
