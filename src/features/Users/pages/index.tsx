import React, { useEffect, useState, useCallback } from 'react';
import { BsHouse } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../../hooks/Toast';

import {
  ButtonLink,
  Container as PageListStyle,
} from '../../../styles/PageStyles/List';

import Breadcrumb from '../../../components/Breadcrumb';
import SearchBoxComponent from '../../../components/SearchBox';
import PopUpWindow from '../../../components/PopUpWindow';
import Table from '../../../components/Table';
import LoadingComponent from '../../../components/LoadingComponent';
import TitleWithButtons from '../../../components/TitleWithButtons';

import api from '../../../services/api';

interface Request<Item> {
  data: Item[];
}

interface UserItem {
  id: string;
  code: number;
  login: string;
  name: string;
  eMail: string;
  profile: {
    description: string;
  };
  active: boolean;
}

interface CommonItem {
  description: string;
  code: number;
  label?: string;
  value?: number;
}

type ProfileItem = CommonItem;
type SubsidiaryItem = CommonItem;

const Users: React.FC = () => {
  const [users, setUsers] = useState([] as UserItem[]);
  const [subsidiaryList, setSubsidiaryList] = useState([] as SubsidiaryItem[]);
  const [profileList, setProfileList] = useState([] as ProfileItem[]);
  const [loading, setLoading] = useState(true);
  const [deleteUser, setDeleteUser] = useState(NaN as number);

  const { ToastError, Toastsuccess } = useToast();
  const history = useHistory();

  const transformArrayToSelectOption = useCallback(array => {
    return array.map((item: CommonItem) => ({
      code: item.code,
      description: item.description,
      label: item.description,
      value: item.code,
    }));
  }, []);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const [userResponse, profilesResponse, subsidiaryResponse]: [
          Request<UserItem>,
          Request<ProfileItem>,
          Request<SubsidiaryItem>
        ] = await Promise.all([
          api.get('user'),
          api.get('profile'),
          api.get('subsidiary'),
        ]);

        const modifiedProfileList = transformArrayToSelectOption(
          profilesResponse.data
        );

        setProfileList([...modifiedProfileList]);

        const modifiedSubsidiaryList = transformArrayToSelectOption(
          subsidiaryResponse.data
        );

        setSubsidiaryList([...modifiedSubsidiaryList]);

        setUsers([...userResponse.data]);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, [transformArrayToSelectOption, ToastError]);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        const userResponse = await api.patch('user', {
          ...data,
          active: true,
        });

        setUsers([...userResponse.data]);

        Toastsuccess({
          message: 'Pesquisa feita com sucesso!',
        });
      } catch (error) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    },
    [Toastsuccess, ToastError]
  );

  const handleDeleteUser = useCallback(async () => {
    try {
      if (!deleteUser) {
        throw new Error('Usuário inexistente');
      }

      await api.delete(`user/${deleteUser}`);

      Toastsuccess({
        message: `Usuário ${deleteUser} deletado com sucesso!`,
      });

      setDeleteUser(NaN);
    } catch (error) {
      ToastError({
        message: 'Ocorreu um erro',
      });
    }
  }, [Toastsuccess, ToastError, deleteUser]);

  const deleteThisUser = useCallback(code => {
    setDeleteUser(code);
  }, []);

  const editUser = useCallback(
    code => {
      history.push(`/User/edit/${code}`);
    },
    [history]
  );

  return (
    <PageListStyle>
      <Breadcrumb title="Usuários" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Lista`}
      </Breadcrumb>

      {!!deleteUser && (
        <PopUpWindow
          title="Deseja deletar?"
          handleSubmit={handleDeleteUser}
          handleCancel={() => setDeleteUser(NaN)}
        >
          Você tem certeza que deseja deletar?
        </PopUpWindow>
      )}

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons title="Lista de Usuários">
              <ButtonLink to="/User/create" type="button">
                Novo Usuário
              </ButtonLink>
            </TitleWithButtons>
            <div className="inputs-box">
              <SearchBoxComponent
                handleSubmit={handleSubmit}
                inputs={[
                  {
                    width: 33,
                    label: 'Perfil',
                    name: 'profile.code',
                    type: 'select',
                    placeholder: 'Selecione o Perfil',
                    options: profileList,
                  },
                  {
                    width: 33,
                    label: 'Filial:',
                    name: 'subsidiary.code',
                    type: 'select',
                    placeholder: 'Digite o nome da Filial',
                    options: subsidiaryList,
                  },
                  {
                    width: 33,
                    label: 'Nome:',
                    name: 'name',
                    placeholder: 'Digite o nome do Nme',
                    messageErrorOnBlur: 'Digite um nome de Nme',
                  },
                ]}
              />
            </div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className="table-box">
                  <Table<UserItem>
                    rows={[
                      ...users.map(profile => ({
                        ...profile,
                      })),
                    ]}
                    selectBox
                    columns={[
                      {
                        title: 'Código',
                        orderable: true,
                        type: 'number',
                        cssProps: {
                          width: '10%',
                        },
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
                        title: 'Login',
                        orderable: true,
                        type: 'string',
                        props: ['login'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Nome',
                        orderable: true,
                        type: 'string',
                        props: ['name'],
                      },
                      {
                        title: 'Email',
                        orderable: true,
                        type: 'string',
                        props: ['eMail'],
                      },
                      {
                        title: 'Perfil',
                        orderable: true,
                        type: 'string',
                        props: ['profile'],
                        renderItem: row => {
                          return (
                            <div className="text">
                              <p>{row.profile.description}</p>
                            </div>
                          );
                        },
                      },
                      {
                        title: 'Status',
                        orderable: true,
                        type: 'boolean',
                        props: ['active'],
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
                    onDeleteRow={row => {
                      deleteThisUser(row.code);
                    }}
                    onEditRow={row => {
                      editUser(row.code);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageListStyle>
  );
};

export default Users;
