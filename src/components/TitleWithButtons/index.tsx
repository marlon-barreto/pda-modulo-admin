import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaFilter } from 'react-icons/fa';

import { Container } from './styles';

interface TitleWithButtonsProps {
  title: string;
  back?: boolean;
  password?: boolean;
  reset?: boolean;
  save?: boolean;
  filter?: boolean;
  filterContent?(): React.ReactNode;
  handleSave?(): void;
  handleBack?(): void;
  handleResetPassword?(): void;
  handleReset?(): void;
}

const TitleWithButtons: React.FC<TitleWithButtonsProps> = ({
  children,
  title,
  back,
  password,
  reset,
  save,
  filter,
  filterContent,
  handleBack,
  handleSave,
  handleResetPassword,
  handleReset,
}) => {
  const [filterActive, setFilterActive] = useState(false);

  const handleClickFilter = useCallback(() => {
    setFilterActive(!filterActive);
  }, [filterActive]);

  return (
    <Container>
      <h1>{title}</h1>
      <div className="buttons">
        {filter && (
          <>
            <button
              type="button"
              className="filter"
              onClick={handleClickFilter}
            >
              <div className="icon">
                <FaFilter size={16} color="#fff" />
              </div>
              <p className="text">Filtro</p>
              {filterActive && (
                <div className="filter-box">
                  <div className="filter-content">
                    {filterContent && filterContent()}
                  </div>
                </div>
              )}
            </button>
          </>
        )}

        {back && (
          <button type="button" className="back" onClick={handleBack}>
            <div className="icon">
              <IoArrowBackOutline size={16} color="#7E8299" />
            </div>
            <p className="text">Voltar</p>
          </button>
        )}

        {password && (
          <button
            type="button"
            className="password"
            onClick={handleResetPassword}
          >
            <p className="text">Redefinir Senha</p>
          </button>
        )}

        {reset && (
          <button type="button" className="reset" onClick={handleReset}>
            <div className="icon">
              <AiOutlineReload size={16} color="#7E8299" />
            </div>
            <p className="text">Reset</p>
          </button>
        )}

        {save && (
          <button type="button" className="save" onClick={handleSave}>
            <p className="text">Save</p>
          </button>
        )}

        {children}
      </div>
    </Container>
  );
};

export default TitleWithButtons;
