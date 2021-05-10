import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Container } from '../../../../styles/PageStyles/Create';

import TransferList from '../../../../components/TransferList';
import Breadcrumb from '../../../../components/Breadcrumb';
import SearchBox from '../../../../components/SearchBox';
import TitleWithButtons from '../../../../components/TitleWithButtons';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/Toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface SystemItem {
  description?: string;
  code?: number;
  label: string;
  value: string | number;
}

interface SystemsRequest {
  data: SystemItem[];
}

interface ListItem {
  code: number;
  description: string;
}

const CreateProfile: React.FC = () => {
  const history = useHistory();
  const { ToastError, Toastsuccess } = useToast();
  const [systemList, setSystemList] = useState([] as SystemItem[]);
  const [list, setList] = useState([] as ListItem[]);
  const searchBoxRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function getSystems() {
      try {
        const systems: SystemsRequest = await api.get('System');

        setSystemList([...systems.data]);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      }
    }

    getSystems();
  }, [ToastError]);

  const handleSubmitTranferList = useCallback((itens: ListItem[]) => {
    setList([...itens]);
  }, []);

  const handleReset = useCallback(() => {
    searchBoxRef.current?.reset();
  }, []);

  const handleSave = useCallback(() => {
    searchBoxRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          description: Yup.string().required('É necessário uma descrição'),
          leader: Yup.bool(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('profile', {
          ...data,
          UseIns: 1080,
          systemList: list.map(({ code, description }) => ({
            code,
            description,
          })),
        });

        Toastsuccess({
          message: 'Novo perfil criado!',
        });

        history.push('/Profile');
      } catch (error) {
        ToastError({
          message: 'Ocorreu um erro',
        });

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          searchBoxRef.current?.setErrors(errors);
        }
      }
    },
    [ToastError, Toastsuccess, list, history]
  );

  const handleBackPage = useCallback(() => {
    history.push('/Profile');
  }, [history]);

  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Cadastro`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons
              title="Novo Perfil"
              back
              reset
              save
              handleBack={handleBackPage}
              handleSave={handleSave}
              handleReset={handleReset}
            />

            <div className="inputs-box">
              <SearchBox
                handleSubmit={handleSubmit}
                searchBoxRef={searchBoxRef}
                buttons={false}
                inputs={[
                  {
                    width: 40,
                    name: 'description',
                    label: 'Descrição:',
                    placeholder: 'Digite uma descrição',
                    messageErrorOnBlur: 'Digite uma descrição',
                  },
                  {
                    width: 40,
                    name: 'leader',
                    label: 'Lider:',
                    type: 'switch-button',
                  },
                ]}
              />
            </div>
            <div className="transfer-list-box">
              {systemList.length !== 0 && (
                <TransferList
                  initialList={systemList}
                  path="description"
                  title="Sistemas"
                  setSelectedList={handleSubmitTranferList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateProfile;
