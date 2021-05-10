import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';

import { useToast } from '../../../hooks/Toast';

// import { Container, NewProfileButton } from './styles';
import { Container, ButtonLink } from '../../../styles/PageStyles/List';

import Breadcrumb from '../../../components/Breadcrumb';
import SearchBoxComponent from '../../../components/SearchBox';
import TitleWithButtons from '../../../components/TitleWithButtons';
import Table from '../../../components/Table';

import api from '../../../services/api';

interface ProfileItem {
  id: string;
  code: string;
  description: string;
  leader: boolean;
}

interface ProfilesRequest {
  data: ProfileItem[];
}

interface SystemItem {
  description?: string;
  code?: number;
  label: string;
  value: string | number;
}

interface SystemsRequest {
  data: SystemItem[];
}

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState([] as ProfileItem[]);
  const [systemsList, setSystemsList] = useState([] as SystemItem[]);
  const { ToastError, Toastsuccess } = useToast();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function getProfiles() {
      try {
        setLoading(true);
        const [responseProfiles, responseSystem]: [
          ProfilesRequest,
          SystemsRequest
        ] = await Promise.all([api.get('profile'), api.get('system')]);

        const { data } = responseProfiles;

        setProfiles([...data]);

        const systems = responseSystem.data.map((item: SystemItem) => ({
          label: String(item.description),
          value: Number(item.code),
        }));

        setSystemsList([...systems]);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    }

    getProfiles();
  }, [ToastError]);

  const handleSubmit = useCallback(
    data => {
      async function getProfiles() {
        try {
          setLoading(true);
          const response = await api.patch('profile', data);

          setProfiles([...response.data]);

          Toastsuccess({
            message: 'Pesquisa feita com sucesso!',
          });
        } catch (err) {
          ToastError({
            message: 'Ocorreu um erro',
          });
        } finally {
          setLoading(false);
        }
      }

      getProfiles();
    },
    [ToastError, Toastsuccess]
  );

  const editProfile = useCallback(
    code => {
      history.push(`/Profile/edit/${code}`);
    },
    [history]
  );
  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Lista`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons title="Lista de perfis">
              <ButtonLink to="/Profile/create">Novo Perfil</ButtonLink>
            </TitleWithButtons>
            <div className="inputs-box">
              <SearchBoxComponent
                inputs={[
                  {
                    name: 'system.code',
                    type: 'select',
                    width: 33,
                    label: 'Sistema:',
                    placeholder: 'Selecione o sistema',
                    options: systemsList,
                  },
                  {
                    name: 'description',
                    width: 33,
                    label: 'Perfil:',
                    placeholder: 'ADM',
                    messageErrorOnBlur: 'Digite um nome de Perfil',
                  },
                  {
                    name: 'leader',
                    width: 33,
                    label: 'Somente Lider:',
                    type: 'switch-button',
                  },
                ]}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="table-box">
              <Table<ProfileItem>
                rows={[
                  ...profiles.map(profile => ({
                    ...profile,
                  })),
                ]}
                columns={[
                  {
                    title: 'Código',
                    orderable: true,
                    type: 'number',
                    props: ['code'],
                    renderItem: row => {
                      return (
                        <div className="code-item">
                          <p>{row.code}</p>
                        </div>
                      );
                    },
                  },
                  {
                    title: 'Perfil',
                    orderable: true,
                    type: 'string',
                    props: ['description'],
                  },
                  {
                    title: 'Líder',
                    orderable: true,
                    type: 'boolean',
                    props: ['leader'],
                    cssProps: {
                      width: '40%',
                    },
                  },
                ]}
                paginationOptions={[
                  {
                    value: 5,
                    label: 5,
                  },
                  {
                    value: 10,
                    label: 10,
                  },
                  {
                    value: 15,
                    label: 15,
                  },
                  {
                    value: 25,
                    label: 25,
                  },
                ]}
                defaultSort="leader"
                onEditRow={row => {
                  editProfile(row.code);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profiles;
