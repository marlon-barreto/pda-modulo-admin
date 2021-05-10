import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';

import { Container } from './styles';

interface TitleWithButtonsProps {
  title: string;
  back?: boolean;
  password?: boolean;
  reset?: boolean;
  save?: boolean;
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
  handleBack,
  handleSave,
  handleResetPassword,
  handleReset,
}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div className="buttons">
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
