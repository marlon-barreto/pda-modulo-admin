import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Container } from '../../../../styles/PageStyles/Edit';

import TransferList from '../../../../components/TransferList';
import Breadcrumb from '../../../../components/Breadcrumb';
import SearchBox from '../../../../components/SearchBox';
import TitleWithButtons from '../../../../components/TitleWithButtons';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/Toast';
import getValidationErrors from '../../../../utils/getValidationErrors';
import LoadingComponent from '../../../../components/LoadingComponent';

interface SystemItem {
  code: number;
  description: string;
}

interface ProfileItem {
  code: number;
  description: string;
  useIns: number;
  leader: boolean;
  systemList: SystemItem[];
}

interface ProfileRequest {
  data: ProfileItem;
}

interface SystemRequest {
  data: SystemItem[];
}

const CreateProfile: React.FC = () => {
  const history = useHistory();
  const { ToastError, Toastsuccess } = useToast();
  const [systemList, setSystemList] = useState([] as SystemItem[]);
  const [systemListSelected, setSystemListSelected] = useState(
    [] as SystemItem[]
  );
  const [list, setList] = useState([] as SystemItem[]);
  const [outList, setOutList] = useState([] as SystemItem[]);
  const searchBoxRef = useRef<FormHandles>(null);
  const { code } = useParams<Record<string, string | undefined>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Number(code)) {
      history.push('/Profile');
    }

    async function getProfile() {
      try {
        setLoading(true);
        const [{ data }, system]: [
          ProfileRequest,
          SystemRequest
        ] = await Promise.all([api.get(`profile/${code}`), api.get('system')]);

        const selectedCodeList = data.systemList.map(item => item.code);

        const filteredSystemList = system.data.filter(
          item =>
            !selectedCodeList.some(selectedCode => item.code === selectedCode)
        );

        setSystemListSelected([...data.systemList]);
        setSystemList([...filteredSystemList]);

        const searchBoxData = {
          description: data.description,
          leader: data.leader,
        };

        searchBoxRef.current?.setData(searchBoxData);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [ToastError, history, code]);

  const handleSubmitTranferList = useCallback((itens: SystemItem[]) => {
    setList([...itens]);
  }, []);

  const handleSubmitInitialList = useCallback((itens: SystemItem[]) => {
    setOutList([...itens]);
  }, []);

  const handleSave = useCallback(() => {
    searchBoxRef.current?.submitForm();
  }, []);

  const handleReset = useCallback(() => {
    searchBoxRef.current?.reset();
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

        await api.put('profile', {
          code,
          ...data,
          UseUpd: 1080,
          systemList: list.map(item => ({
            code: item.code,
            description: item.description,
          })),
          systemOutList: outList.map(item => ({
            code: item.code,
            description: item.description,
          })),
        });

        Toastsuccess({
          message: 'Perfil editado com sucesso!',
        });

        setTimeout(() => {
          history.push('/Profile');
        }, 1000);
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
    [ToastError, Toastsuccess, list, code, history, outList]
  );

  const handleBackPage = useCallback(() => {
    history.push('/Profile');
  }, [history]);

  return (
    <Container>
      <Breadcrumb title="Perfis" icon={<BsHouse size={16} color="#c0c0c6" />}>
        {`Administração > Edição`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons
              title="Editar Perfil"
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
            {loading ? (
              <LoadingComponent />
            ) : (
              <div className="transfer-list">
                <TransferList
                  initialList={systemList}
                  selectedList={systemListSelected}
                  path="description"
                  title="Sistemas"
                  setSelectedList={handleSubmitTranferList}
                  setInitialList={handleSubmitInitialList}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateProfile;
