import React, { useEffect, useState } from 'react';
import { BsHouse } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar';

import api from '../../../services/api';

import { Container } from '../../../styles/PageStyles/List';
import Breadcrumb from '../../../components/Breadcrumb';
import LoadingComponent from '../../../components/LoadingComponent';

interface DashboardItem {
  Page: string;
  Modulo: string;
  Porcentagem: number;
  Planejado: number;
  Realizado: number;
}

const Dashboard: React.FC = () => {
  const [dashboardItens, setDashboardItens] = useState([] as DashboardItem[]);
  const dashboardRefreshRateInSeconds = 60;
  const [isLoading, setLoading] = useState(true);

  async function getDashboardInformation() {
    try {
      setLoading(true);

      const response = await api.get('Dashboard');

      setDashboardItens([...response.data]);

      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    getDashboardInformation();

    setInterval(getDashboardInformation, dashboardRefreshRateInSeconds * 1000);
  }, []);

  function convertNumber(number: number) {
    return number.toLocaleString().replace(',', '.');
  }

  return (
    <Container>
      <Breadcrumb
        title="Dashboard"
        icon={<BsHouse size={16} color="#c0c0c6" />}
      >
        {`Administração > Dashboard`}
      </Breadcrumb>
      <div className="container">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="dashboard">
            <div className="informations-container">
              {dashboardItens.length !== 0 &&
                dashboardItens.map(item => (
                  <div key={item.Modulo} className="information">
                    <Link key={item.Page} to={item.Page}>
                      <div className="title">
                        <h1>{item.Modulo}</h1>
                      </div>
                      <div className="text">
                        <p>
                          {`${convertNumber(item.Planejado)} / ${convertNumber(
                            item.Realizado
                          )}`}
                        </p>
                        <ProgressBar value={item.Porcentagem} />
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
