import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { BsHouse } from 'react-icons/bs';
import { FormHandles } from '@unform/core';

import { Container } from '../../../../styles/PageStyles/Create';
import { useToast } from '../../../../hooks/Toast';

import Breadcrumb from '../../../../components/Breadcrumb';
import TranferList from '../../../../components/TransferList';
import SearchBox from '../../../../components/SearchBox';
import TitleWithButtons from '../../../../components/TitleWithButtons';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface Item {
  description: string;
  code: number;
  label?: string;
  value?: number;
}

const CreateUser: React.FC = () => {
  const history = useHistory();
  const { ToastError, Toastsuccess } = useToast();
  const [profileList, setProfileList] = useState([] as Item[]);
  const [subsidiaryList, setSubsidiaryList] = useState([] as Item[]);
  const [selectedList, setSelectedList] = useState([] as Item[]);
  const inputsBox = useRef<FormHandles>(null);
  const [selectAllSubsidiaries, setSelectAllSubsidiaries] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const [subsidiaryReponse, profileResponse] = await Promise.all([
          api.get('subsidiary'),
          api.get('profile'),
        ]);

        const modifiedProfileResponse = profileResponse.data.map(
          (item: Item) => ({
            ...item,
            label: item.description,
            value: item.code,
          })
        );

        setSubsidiaryList([...subsidiaryReponse.data]);
        setProfileList([...modifiedProfileResponse]);
      } catch (error) {
        ToastError({
          message: 'Ocorreu um erro!',
        });
      }
    }

    getData();
  }, [ToastError]);

  const handleSave = useCallback(() => {
    inputsBox.current?.submitForm();
  }, []);

  const setList = useCallback(list => {
    setSelectedList([...list]);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          login: Yup.string().required('É necessário preencher o Login'),
          name: Yup.string().required('É necessário preencher o Nome'),
          email: Yup.string()
            .email('É necessário colocar um email válido')
            .required('É necessário preencher o Nome'),
          provider: Yup.string().required(
            'É necessário preencher um fornecedor'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('user', {
          ...data,
          UseIns: 1080,
          SubsidiaryList: selectAllSubsidiaries
            ? null
            : selectedList.map(item => ({
                code: item.code,
              })),
        });

        Toastsuccess({
          message: 'Usuário criado com sucesso',
        });

        history.push('/User');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          inputsBox.current?.setErrors(errors);
        }

        ToastError({
          message: 'Ocorreu um erro!',
        });
      }
    },
    [selectAllSubsidiaries, ToastError, selectedList, Toastsuccess, history]
  );

  const handleBack = useCallback(() => {
    history.push('/User');
  }, [history]);

  const handleReset = useCallback(() => {
    inputsBox.current?.reset();
    inputsBox.current?.setFieldValue('profile.code', '');
  }, []);

  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Lista`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons
              title="Novo Usuário"
              reset
              back
              save
              handleReset={handleReset}
              handleBack={handleBack}
              handleSave={handleSave}
            />

            <div className="inputs-box">
              <SearchBox
                searchBoxRef={inputsBox}
                handleSubmit={handleSubmit}
                buttons={false}
                inputs={[
                  {
                    width: 33,
                    label: 'Login:',
                    name: 'login',
                    placeholder: 'Digite Login',
                    messageErrorOnBlur: 'Digite um Login',
                  },
                  {
                    width: 33,
                    label: 'Nome:',
                    name: 'name',
                    placeholder: 'Digite seu nome',
                    messageErrorOnBlur: 'Digite um Nome',
                  },
                  {
                    width: 33,
                    label: 'Status:',
                    name: 'active',
                    type: 'switch-button',
                  },
                  {
                    width: 33,
                    label: 'Email:',
                    name: 'email',
                    placeholder: 'Digite e-mail',
                    messageErrorOnBlur: 'Digite um Email',
                  },
                  {
                    width: 33,
                    label: 'Perfil:',
                    name: 'profile.code',
                    type: 'select',
                    placeholder: 'Selecione o Perfil',
                    options: profileList,
                  },
                  {
                    width: 33,
                    label: 'Fornecedor:',
                    name: 'provider',
                    placeholder: 'Digite o Fornecedor',
                    messageErrorOnBlur: 'Digite um Fornecedor',
                  },
                ]}
              />
            </div>

            <div className="transfer-list">
              {!!subsidiaryList.length && (
                <TranferList
                  title="Filiais"
                  initialList={subsidiaryList}
                  path="description"
                  setSelectedList={setList}
                  setStateOption={setSelectAllSubsidiaries}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateUser;
