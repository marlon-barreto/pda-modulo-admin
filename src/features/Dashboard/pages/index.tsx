import React from 'react';

import { Container } from '../../../styles/PageStyles/List';
import ProgressBar from '../../../components/ProgressBar';

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
                <ProgressBar value={10} />
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
                <ProgressBar value={30} />
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
                <ProgressBar value={100} />
              </div>
            </div>
            <div className="information">
              <div className="title">
                <h1>Picking</h1>
              </div>
              <div className="text">
                <p>10 / 21</p>
                <ProgressBar value={70} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
