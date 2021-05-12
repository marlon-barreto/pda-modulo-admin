import React, { useEffect, useState, useCallback } from 'react';
import { BsHouse } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../../hooks/Toast';

import { Container as PageListStyle } from '../../../styles/PageStyles/List';

import Breadcrumb from '../../../components/Breadcrumb';
import SearchBoxComponent from '../../../components/SearchBox';
import Table from '../../../components/Table';
import LoadingComponent from '../../../components/LoadingComponent';
import TitleWithButtons from '../../../components/TitleWithButtons';
import ProgressBar from '../../../components/ProgressBar';

import IconCaixaFinalizada from '../../../assets/svg/caixa-verde.svg';
import IconCaixaAndamento from '../../../assets/svg/caixa-amarela.svg';
import IconCaixaDivergencia from '../../../assets/svg/caixa-vermelha.svg';
import IconCaixaPendente from '../../../assets/svg/caixa-branca.svg';

import SearchIcon from '../../../assets/svg/SearchGrid.svg';

import api from '../../../services/api';
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

  const getReceiments = useCallback(async () => {
    try {
      setLoading(true);
      const [receivementResponse, statusItemResponse]: [
        Request<ReceivementItem>,
        Request<StatusItem>
      ] = await Promise.all([
        api.patch('RecebimentoTruck', {}),
        api.get('StatusRecebimento'),
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
  }, []);

  useEffect(() => {
    getReceiments();
  }, [transformArrayToSelectOption, ToastError]);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        const receivementResponse = await api.patch('RecebimentoTruck', {
          ...data,
          active: true,
        });

        const modifiedReceimentList = transformReceivement(
          receivementResponse.data
        );

        setReceivements([...modifiedReceimentList]);

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
    const requestInterval = setInterval(() => {
      getReceiments();
    }, 120000);
    return () => {
      clearInterval(requestInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
  const date = new Date(Date.now() - tzoffset).toISOString().split('T')[0];

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
                justifycontent="flex-start"
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
                    label: 'Status',
                    name: 'status.code',
                    type: 'select',
                    placeholder: 'Selecione o Status',
                    options: statusList,
                  },
                  {
                    width: 33,
                    label: 'Data início:',
                    type: 'date',
                    defaultValue: date,
                    name: 'dataReceibmento',
                    placeholder: 'Digite uma Data de recebimento de início',
                    messageErrorOnBlur:
                      'Digite uma Data de recebimento de início',
                  },
                  {
                    width: 33,
                    label: 'Data final:',
                    type: 'date',
                    defaultValue: date,
                    name: 'dataReceibmento',
                    placeholder: 'Digite uma data de recebimento de fim',
                    messageErrorOnBlur: 'Digite uma data de recebimento de fim',
                  },
                ]}
              />
            </div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className="table-box">
                  <ProgressBar
                    value={
                      Math.trunc(
                        (receivements.reduce((total, item) => {
                          return total + item.PorcentagemProgresso;
                        }, 0) /
                          (receivements.length || 1)) *
                          100
                      ) / 100
                    }
                  />
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
                          const icons = [
                            IconCaixaPendente,
                            IconCaixaAndamento,
                            IconCaixaFinalizada,
                            IconCaixaDivergencia,
                          ];
                          return (
                            <div className="code-item">
                              {row.CodigoStatus !== 23 ? (
                                <span className="svg-icon-success">
                                  <img
                                    className="svg-icon-success"
                                    src={icons[row.CodigoStatus - 1]}
                                    alt={row.CodigoStatus.toString()}
                                  />
                                </span>
                              ) : null}
                              <p>{row.Documento}</p>
                            </div>
                          );
                        },
                      },
                      {
                        title: 'Filial',
                        orderable: true,
                        type: 'string',
                        trunc: 10,
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
                          width: '5%',
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
                        title: 'Dt.Expedição',
                        orderable: true,
                        type: 'datetime',
                        props: ['DataExpedicao'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Dt.Recebimento',
                        orderable: true,
                        type: 'datetime',
                        props: ['DataRecebimento'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Progresso',
                        orderable: true,
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
                      {
                        title: 'Detalhe',
                        orderable: false,
                        type: 'string',
                        cssProps: {
                          width: '5%',
                        },
                        props: ['Documento'],
                        renderItem: row => {
                          return (
                            <div className="row-actions-button-detail">
                              <button
                                type="button"
                                className="action"
                                onClick={row1 => {
                                  editReceivement(row.Documento);
                                }}
                              >
                                <img src={SearchIcon} alt="" />
                                <p className="hover-item">Detalhe</p>
                              </button>
                            </div>
                          );
                        },
                      },
                    ]}
                    hidePagination
                    defaultNumberOfRows={1000}
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
