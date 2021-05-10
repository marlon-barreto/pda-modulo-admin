import React, { useEffect, useState, useCallback } from 'react';
import { BsHouse } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';

import { useToast } from '../../../../hooks/Toast';

import {
  ButtonLink,
  Container as PageListStyle,
} from '../../../../styles/PageStyles/List';

import Breadcrumb from '../../../../components/Breadcrumb';
import PopUpWindow from '../../../../components/PopUpWindow';
import Table from '../../../../components/Table';
import LoadingComponent from '../../../../components/LoadingComponent';
import TitleWithButtons from '../../../../components/TitleWithButtons';
import ProgressBar from '../../../../components/ProgressBar';
import IconProduto from '../../../../assets/svg/produto.svg';

import api from '../../../../services/api';
import apiReceivement from '../../../../services/receivement';

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
  DescricaoStatus: string;
  DetalheCaixa: DetalheCaixaItem[];
}

interface DetalheCaixaItem {
  id: string;
  Ordem: string;
  Caixa: string;
  QuantidadePeca: number;
  DataColeta: Date;
  Usuario: string;
  DataRecebimento: Date;
  PorcentagemAuditado: number;
  Status: string;
  DetalheProduto: DetalheProdutoItem[];
}

interface DetalheProdutoItem {
  id: string;
  Produto: string;
  Descricao: string;
  QuantidadeEnviada: number;
  QuantidadeColetado: number;
  QuantidadeDivergencia: number;
  Status: string;
}

const DetailReceivement: React.FC = () => {
  const [receivement, setReceivement] = useState({} as ReceivementItem);

  const [detailReceivement, setDetailReceivement] = useState(
    [] as DetalheCaixaItem[]
  );

  const [loading, setLoading] = useState(true);
  const [porcentagemProgresso, setPorcentagemProgresso] = useState(
    NaN as number
  );
  const { code } = useParams<Record<string, string | undefined>>();

  const { ToastError, Toastsuccess } = useToast();
  const history = useHistory();

  const transformDetailReceivement = useCallback(array => {
    return array.map((item: DetalheCaixaItem) => ({
      ...item,
      id: item.Ordem,
    }));
  }, []);

  useEffect(() => {
    if (!Number(code)) {
      history.push('/Receivement');
    }

    async function getReceiment() {
      try {
        setLoading(true);

        const receivementResponse = await apiReceivement.get<ReceivementItem>(
          `receivement/${code}`
        );

        const modifiedDetailReceimentList = transformDetailReceivement(
          receivementResponse.data.DetalheCaixa
        );

        setReceivement(receivementResponse.data);

        setPorcentagemProgresso(receivementResponse.data.PorcentagemProgresso);

        setDetailReceivement([...modifiedDetailReceimentList]);
      } catch (err) {
        ToastError({
          message: 'Ocorreu um erro',
        });
      } finally {
        setLoading(false);
      }
    }

    getReceiment();
  }, [ToastError]);

  const handleBackPage = useCallback(() => {
    history.push('/Receivement');
  }, [history]);

  return (
    <PageListStyle>
      <Breadcrumb
        title="Recebimento"
        icon={<BsHouse size={16} color="#c0c0c6" />}
      >
        {`Administração > Detalhe`}
      </Breadcrumb>

      <div className="block">
        <div className="container">
          <div className="content">
            <TitleWithButtons
              title="Detalhe Recebimento de Caminhão"
              back
              handleBack={handleBackPage}
            />
            <div className="inputs-box">
              <div>
                <span>Documento:</span>
                <span>{receivement.Documento}</span>
              </div>
            </div>

            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className="table-box">
                  <ProgressBar value={porcentagemProgresso} />
                  <Table<DetalheCaixaItem>
                    rows={[
                      ...detailReceivement.map(item => ({
                        ...item,
                      })),
                    ]}
                    columns={[
                      {
                        title: 'Ordem',
                        orderable: true,
                        type: 'number',
                        cssProps: {
                          width: '10%',
                        },
                        props: ['Ordem'],
                        renderItem: row => {
                          return (
                            <div className="code-item">
                              <img src={IconProduto} alt="" />
                              <p>{row.Ordem}</p>
                            </div>
                          );
                        },
                      },
                      {
                        title: 'Caixa',
                        orderable: true,
                        type: 'string',
                        props: ['Caixa'],
                        cssProps: {
                          width: '15%',
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
                        title: 'Coleta',
                        orderable: true,
                        type: 'date',
                        props: ['DataColeta'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Usuário',
                        orderable: true,
                        type: 'string',
                        props: ['Usuario'],
                        cssProps: {
                          width: '15%',
                        },
                      },
                      {
                        title: 'Progresso Auditado',
                        orderable: true,
                        type: 'number',
                        props: ['PorcentagemAuditado'],
                        cssProps: {
                          width: '25%',
                        },
                        renderItem: row => {
                          return (
                            <ProgressBar value={row.PorcentagemAuditado} />
                          );
                        },
                      },
                    ]}
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
                    defaultSort="Ordem asc"
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

export default DetailReceivement;