import React from 'react';
import { BsHouse } from 'react-icons/bs';

import { Container } from './styles';

import Breadcrumb from '../../../../components/Breadcrumb';
import SelectBox from '../../../../components/Table/SelectBox';
import TitleWithButtons from '../../../../components/TitleWithButtons';

import Table from '../../../../styles/TableStyles/Table';
import SearchBoxComponent from '../../../../components/SearchBox';
// import PaginationComponent from '../../../../components/PaginationComponent';
import Footer from '../../../../components/Footer';

const ProfilesPermissions: React.FC = () => {
  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Lista`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="profile">
            <TitleWithButtons title="Lista de permissões" back reset save />
            <div className="search-box">
              <SearchBoxComponent
                justifycontent="flex-start"
                inputs={[
                  {
                    name: 'system',
                    type: 'select',
                    width: 33,
                    label: 'Aplicativo:',
                    placeholder: 'Selecione o Aplicativo',
                    options: [
                      {
                        label: 'Teste',
                        value: 'Teste',
                      },
                    ],
                  },
                  {
                    name: 'profile',
                    type: 'select',
                    width: 33,
                    label: 'Sistema*:',
                    placeholder: 'Selecione o sistema',
                  },
                ]}
              />
            </div>
            <div className="table-box">
              <Table permissionsTable>
                <thead>
                  <tr>
                    <th>
                      <div className="title">
                        <h1>Ação</h1>
                      </div>
                    </th>
                    <th>
                      <div className="title">
                        <h1>Código Menu</h1>
                      </div>
                    </th>
                    <th>
                      <div className="title">
                        <h1>Descrição</h1>
                      </div>
                    </th>
                    <th>
                      <div className="title">
                        <h1>Editar</h1>
                      </div>
                    </th>
                    <th>
                      <div className="title">
                        <h1>Exportar</h1>
                      </div>
                    </th>
                    <th>
                      <div className="title">
                        <h1>Integrar</h1>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <SelectBox />
                      </div>
                    </td>
                    <td>
                      <div className="code-item">
                        <p>56037</p>
                      </div>
                    </td>
                    <td>
                      <div className="profile-item">
                        <p>Administrador</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <SelectBox />
                      </div>
                    </td>
                    <td>
                      <div>
                        <SelectBox />
                      </div>
                    </td>
                    <td>
                      <div>
                        <SelectBox />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="pagination-box">
              {/* <PaginationComponent /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <Footer />
      </div>
    </Container>
  );
};

export default ProfilesPermissions;
