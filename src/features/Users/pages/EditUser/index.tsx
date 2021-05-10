import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { BsHouse } from 'react-icons/bs';
import { FormHandles } from '@unform/core';

import { Container } from '../../../../styles/PageStyles/Edit';
import { useToast } from '../../../../hooks/Toast';

import Breadcrumb from '../../../../components/Breadcrumb';
import TranferList from '../../../../components/TransferList';
import SearchBox from '../../../../components/SearchBox';
import TitleWithButtons from '../../../../components/TitleWithButtons';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';
import LoadingComponent from '../../../../components/LoadingComponent';

interface Item {
  description: string;
  code: number;
  label: string;
  value: number;
}

interface SubsidiaryItem {
  code: number;
}

interface UserRequest {
  data: {
    profile: Item;
    subsidiaryList: SubsidiaryItem[];
  };
}

interface SubsidiaryRequest {
  data: Item[];
}

interface ProfileRequest {
  data: Item[];
}

const CreateUser: React.FC = () => {
  const history = useHistory();
  const { ToastError, Toastsuccess } = useToast();
  const [profileList, setProfileList] = useState([] as Item[]);
  const [subsidiaryList, setSubsidiaryList] = useState([] as Item[]);
  const [selectedSubsidiaryList, setSelectedSubsidiaryList] = useState(
    [] as SubsidiaryItem[]
  );
  const [selectedList, setSelectedList] = useState([] as Item[]);
  const { code } = useParams<Record<string, string | undefined>>();
  const inputsBox = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [selectAllSubsidiaries, setSelectAllSubsidiaries] = useState(false);

  useEffect(() => {
    if (!Number(code)) {
      history.push('/Profile');
    }

    async function getData() {
      try {
        setLoading(true);

        const [UserResponse, SubsidiaryResponse, ProfileResponse]: [
          UserRequest,
          SubsidiaryRequest,
          ProfileRequest
        ] = await Promise.all([
          api.get(`User/${code}`),
          api.get('subsidiary'),
          api.get('profile'),
        ]);

        const modifiedProfileList = ProfileResponse.data.map((item: Item) => ({
          label: item.description,
          value: item.code,
        }));

        setProfileList([...modifiedProfileList] as Item[]);

        const selectedSubsidiaryCodeList = UserResponse.data.subsidiaryList.map(
          item => item.code
        );

        const filteredSubsidiaryList = SubsidiaryResponse.data.filter(
          item =>
            !selectedSubsidiaryCodeList.some(
              selectedCode => item.code === selectedCode
            )
        );

        setSubsidiaryList([...filteredSubsidiaryList]);
        setSelectedSubsidiaryList([...UserResponse.data.subsidiaryList]);

        const modifiedSelectedProfile = {
          label: UserResponse.data.profile.description,
          value: UserResponse.data.profile.code,
        };

        inputsBox.current?.setData({
          ...UserResponse.data,
          profile: {
            code: modifiedSelectedProfile,
          },
        });
      } catch (error) {
        ToastError({
          message: 'Ocorreu um erro!',
        });
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [ToastError, code, history]);

  useEffect(() => {
    if (resetPassword) {
      inputsBox.current?.submitForm();
      setResetPassword(false);
    }
  }, [resetPassword]);

  const handleSave = useCallback(() => {
    inputsBox.current?.submitForm();
  }, []);

  const handleReset = useCallback(() => {
    inputsBox.current?.reset();
    inputsBox.current?.setFieldValue('profile.code', '');
  }, []);

  const handleBack = useCallback(() => {
    history.push('/User');
  }, [history]);

  const handleResetPassword = useCallback(() => {
    setResetPassword(true);
  }, []);

  const setList = useCallback(list => {
    setSelectedList([...list]);
  }, []);

  const submit = useCallback(
    async data => {
      let response;

      if (!resetPassword) {
        response = await api.put('user', {
          code,
          ...data,
          UseUpd: 1080,
          SubsidiaryList: selectAllSubsidiaries
            ? null
            : selectedList.map(item => ({
                code: item.code,
              })),
        });
      } else {
        response = await api.put('user', {
          code,
          ...data,
          UseUpd: 1080,
          SubsidiaryList: selectAllSubsidiaries
            ? null
            : selectedList.map(item => ({
                code: item.code,
              })),
          password: '33gKl7fWqPd58UcovM08TA==',
        });
      }

      return response;
    },
    [selectAllSubsidiaries, resetPassword, code, selectedList]
  );

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          login: Yup.string().required('É necessário preencher o Login'),
          name: Yup.string().required('É necessário preencher o Nome'),
          eMail: Yup.string()
            .email('É necessário colocar um email válido')
            .required('É necessário preencher o Nome'),
          provider: Yup.string().required(
            'É necessário preencher um fornecedor'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        submit(data);

        Toastsuccess({
          message: 'Usuário editado com sucesso',
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
    [ToastError, Toastsuccess, history, submit]
  );

  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Edição`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons
              title="Editar Usuário"
              reset
              back
              save
              password
              handleSave={handleSave}
              handleResetPassword={handleResetPassword}
              handleReset={handleReset}
              handleBack={handleBack}
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
                    name: 'eMail',
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

            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className="transfer-list">
                  <TranferList
                    title="Filiais"
                    initialList={subsidiaryList}
                    selectedList={selectedSubsidiaryList}
                    path="description"
                    setSelectedList={setList}
                    setStateOption={setSelectAllSubsidiaries}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateUser;
