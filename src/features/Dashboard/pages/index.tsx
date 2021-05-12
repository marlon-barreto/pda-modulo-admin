import React, { useEffect, useState } from 'react';
import ProgressBar from '../../../components/ProgressBar';

import api from '../../../services/receivement';

import { Container } from '../../../styles/PageStyles/List';

interface DashboardItem {
  Modulo: string;
  Porcentagem: number;
  Planejado: number;
  Realizado: number;
}

const Dashboard: React.FC = () => {
  const [dashboardItens, setDashboardItens] = useState([] as DashboardItem[]);

  useEffect(() => {
    async function getResponse() {
      try {
        const response = await api.get('Dashboard');

        setDashboardItens([...response.data]);
      } catch (error) {
        console.warn(error);
      }
    }

    getResponse();
  }, []);

  return (
    <Container>
      <div className="container">
        <div className="dashboard">
          <div className="informations-container">
            {dashboardItens.length !== 0 &&
              dashboardItens.map(item => (
                <div className="information">
                  <div className="title">
                    <h1>{item.Modulo}</h1>
                  </div>
                  <div className="text">
                    <p>{`${item.Realizado} / ${item.Planejado}`}</p>
                    <ProgressBar value={item.Porcentagem} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
