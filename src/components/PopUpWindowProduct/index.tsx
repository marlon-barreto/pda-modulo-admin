import React, { useCallback } from 'react';

import { WindowContainer } from './styles';
import Table from '../Table';
import IconCaixaFinalizada from '../../assets/svg/caixa-verde.svg';
import IconCaixaDivergencia from '../../assets/svg/caixa-vermelha.svg';

interface DetalheProdutoItem {
  id: string;
  Produto: string;
  Descricao: string;
  QuantidadeEnviada: number;
  QuantidadeColetado: number;
  QuantidadeDivergencia: number;
  Status: string;
  Acao: boolean;
}

interface PopUpWindowProductProps {
  title?: string;
  receivementProduct: DetalheProdutoItem[];
  handleSubmit?(): void;
  handleCancel?(): void;
}

const PopUpWindowProduct: React.FC<PopUpWindowProductProps> = ({
  title,
  receivementProduct,
  handleSubmit,
  handleCancel,
  children,
}) => {
  const handleClickSubmit = useCallback(() => {
    if (handleSubmit) {
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleClickCancel = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
  }, [handleCancel]);

  return (
    <WindowContainer>
      <div className="popup">
        {!!title && <h5>{title}</h5>}

        <div className="popUpTable">
          <div className="table-box">
            <Table<DetalheProdutoItem>
              rows={[
                ...receivementProduct.map(item => ({
                  ...item,
                })),
              ]}
              columns={[
                {
                  title: 'Produto',
                  orderable: true,
                  type: 'number',
                  cssProps: {
                    width: '10%',
                  },
                  props: ['Produto'],
                  renderItem: row => {
                    return (
                      <div className="code-item">
                        {row.Status === 'OK' ? (
                          <span className="svg-icon-success">
                            <img src={IconCaixaFinalizada} alt={row.Status} />
                          </span>
                        ) : (
                          <img src={IconCaixaDivergencia} alt={row.Status} />
                        )}
                        <p>{row.Produto}</p>
                      </div>
                    );
                  },
                },
                {
                  title: 'Descrição',
                  orderable: true,
                  type: 'string',
                  props: ['Descricao'],
                  trunc: 40,
                  cssProps: {
                    width: '30%',
                  },
                },
                {
                  title: 'Enviadas',
                  orderable: true,
                  type: 'number',
                  props: ['QuantidadeEnviada'],
                  cssProps: {
                    width: '10%',
                  },
                },
                {
                  title: 'Coletada',
                  orderable: true,
                  type: 'number',
                  props: ['QuantidadeColetado'],
                  cssProps: {
                    width: '10%',
                  },
                },
                {
                  title: 'Divergencia',
                  orderable: true,
                  type: 'number',
                  props: ['QuantidadeDivergencia'],
                  cssProps: {
                    width: '10%',
                  },
                },
              ]}
              hidePagination
              defaultSort="Produto asc"
            />
          </div>

          {children}
        </div>

        <div className="buttons">
          <button type="button" className="cancel" onClick={handleClickCancel}>
            Fechar
          </button>
        </div>
      </div>
    </WindowContainer>
  );
};

export default PopUpWindowProduct;
