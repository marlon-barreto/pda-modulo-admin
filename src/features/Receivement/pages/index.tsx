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
import ProgressBar from '../../../components/ProgressBar';
import IconProduto from '../../../assets/svg/produto.svg';

import api from '../../../services/api';
import apiReceivement from '../../../services/receivement';
import Icon from '../../../components/Icon';

interface Request<Item> {
  data: Item[];
}

interface ReceivementItem {
  id: string;
  Documento: string;
  Filial: string;
  Fornecedor: string;
  QuantidadeVolume: number;
  QuantidadePeca: number;
  DataExpedicao: Date;
  DataRecebimento: Date;
  PorcentagemProgresso: number;
  HoraInicio: string;
  HoraFim: string;
  TempoRecebimento: string;
  CodigoStatus: number;
  Nivel: number;
}

interface CommonItem {
  description: string;
  code: number;
  label?: string;
  value?: number;
}

type StatusItem = CommonItem;

const Receivement: React.FC = () => {
  const [receivements, setReceivements] = useState([] as ReceivementItem[]);
  const [statusList, setStatusList] = useState([] as StatusItem[]);
  const [totalReceivement, settotalReceivement] = useState(NaN as number);

  const [loading, setLoading] = useState(true);

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

  const transformReceivement = useCallback(array => {
    return array.map((item: ReceivementItem) => ({
      ...item,
      id: item.Documento,
    }));
  }, []);

  useEffect(() => {
    async function getReceiments() {
      try {
        setLoading(true);
        const [receivementResponse, statusItemResponse]: [
          Request<ReceivementItem>,
          Request<StatusItem>
        ] = await Promise.all([
          apiReceivement.get('receivement'),
          apiReceivement.get('receivement/status'),
        ]);

        const modifiedStatusList = transformArrayToSelectOption(
          statusItemResponse.data
        );

        setStatusList([...modifiedStatusList]);

        const modifiedReceimentList = transformReceivement(
          receivementResponse.data
        );

        setReceivements([...modifiedReceimentList]);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    }

    getReceiments();
  }, [transformArrayToSelectOption, ToastError]);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        const receivementResponse = await api.patch('receivement', {
          ...data,
          active: true,
        });

        setReceivements([...receivementResponse.data]);

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

  const editReceivement = useCallback(
    code => {
      history.push(`/Receivement/Detail/${code}`);
    },
    [history]
  );

  useEffect(() => {
    async function getTotal() {
      const somatotalQte = receivements.reduce((total, unityCurrent) => {
        return (unityCurrent.PorcentagemProgresso || 0) + total;
      }, 0);
      const porcentagem = (somatotalQte / 9).toFixed(0);
      settotalReceivement(Number(porcentagem));
      // settotalReceivement(30);
    }

    getTotal();
  }, [receivements]);

  return (
    <PageListStyle>
      <Breadcrumb
        title="Recebimento"
        icon={<BsHouse size={16} color="#c0c0c6" />}
      >
        {`Administração > Lista`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons title="Recebimento de Caminhão" />
            <div className="inputs-box">
              <SearchBoxComponent
                handleSubmit={handleSubmit}
                inputs={[
                  {
                    width: 33,
                    label: 'Documento:',
                    name: 'documento',
                    placeholder: 'Digite o nome do Documento',
                    messageErrorOnBlur: 'Digite um nome de Documento',
                  },
                  {
                    width: 33,
                    label: 'Fornecedor:',
                    name: 'fornecedor',
                    placeholder: 'Digite o nome do fornecedor',
                    messageErrorOnBlur: 'Digite um nome de fornecedor',
                  },
                  {
                    width: 33,
                    label: 'Data:',
                    type: 'date',
                    name: 'dataReceibmento',
                    placeholder: 'Digite a Data de recebimento',
                    messageErrorOnBlur: 'Digite um data de recebimento',
                  },
                  {
                    width: 33,
                    label: 'Status',
                    name: 'status.code',
                    type: 'select',
                    placeholder: 'Selecione o Status',
                    options: statusList,
                  },
                ]}
              />
            </div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className="table-box">
                  <ProgressBar value={totalReceivement} />
                  <Table<ReceivementItem>
                    rows={[
                      ...receivements.map(item => ({
                        ...item,
                      })),
                    ]}
                    columns={[
                      {
                        title: 'Documento',
                        orderable: true,
                        type: 'string',
                        cssProps: {
                          width: '10%',
                        },
                        props: ['Documento'],
                        renderItem: row => {
                          const icons = [IconProduto];
                          return (
                            <div className="code-item">
                              {row.CodigoStatus !== 1 ?? (
                                <Icon
                                  color="#000"
                                  icon={icons[row.CodigoStatus - 2]}
                                />
                              )}
                              <p>{row.Documento}</p>
                            </div>
                          );
                        },
                      },
                      {
                        title: 'Filial',
                        orderable: true,
                        type: 'string',
                        props: ['Filial'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Fornecedor',
                        orderable: true,
                        type: 'string',
                        trunc: 20,
                        props: ['Fornecedor'],
                        cssProps: {
                          width: '25%',
                        },
                      },
                      {
                        title: 'Volume',
                        orderable: true,
                        type: 'number',
                        props: ['QuantidadeVolume'],
                        cssProps: {
                          width: '10%',
                        },
                      },
                      {
                        title: 'Peças',
                        orderable: true,
                        type: 'number',
                        props: ['QuantidadePeca'],
                        cssProps: {
                          width: '10%',
                        },
                      },
                      {
                        title: 'Data Expedição',
                        orderable: true,
                        type: 'date',
                        props: ['DataExpedicao'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Data Recebimento',
                        orderable: true,
                        type: 'date',
                        props: ['DataRecebimento'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Progresso',
                        orderable: false,
                        type: 'number',
                        props: ['PorcentagemProgresso'],
                        cssProps: {
                          width: '25%',
                        },
                        renderItem: row => {
                          return (
                            <ProgressBar value={row.PorcentagemProgresso} />
                          );
                        },
                      },
                    ]}
                    hidePagination
                    defaultNumberOfRows={100}
                    paginationOptions={[
                      {
                        value: 50,
                        label: 50,
                      },
                      {
                        value: 100,
                        label: 100,
                      },
                      {
                        value: 200,
                        label: 200,
                      },
                    ]}
                    defaultSort="Documento"
                    onEditRow={row => {
                      editReceivement(row.Documento);
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

export default Receivement;
