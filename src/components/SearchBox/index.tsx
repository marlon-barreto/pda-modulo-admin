import React, { InputHTMLAttributes, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';

import SearchIcon from '../../assets/svg/search.svg';
import IconError from '../../assets/images/input-error.png';
import IconSuccess from '../../assets/images/input-success.png';

import { Container, InputContainer } from './styles';

import { Input, SwitchButton, Select } from '../Form';
import DateInput from '../Form/DateInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  width?: number;
  label?: string;
  type?: string;
  options?: object[];
  messageErrorOnBlur?: string;
  iconError?: string;
}

interface SearchBoxProps {
  inputs: InputProps[];
  buttons?: boolean;
  justifycontent?: string;
  searchBoxRef?: React.RefObject<FormHandles>;
  handleSubmit?(data: object): void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  inputs,
  justifycontent,
  buttons = true,
  searchBoxRef,
  handleSubmit,
}) => {
  const ownRef = useRef<FormHandles>(null);
  const formRef = searchBoxRef || ownRef;

  const handleInputError = useCallback(
    ({ inputName, message }) => {
      if (formRef) {
        formRef.current?.setFieldError(inputName, message);
      }
    },
    [formRef]
  );

  const clearInputs = useCallback(() => {
    inputs.map(input => formRef.current?.setFieldValue(input.name, ''));
  }, [inputs, formRef]);

  const onSubmit = useCallback(
    data => {
      if (handleSubmit) {
        handleSubmit(data);
      }
    },
    [handleSubmit]
  );

  return (
    <Container
      ref={formRef}
      onSubmit={onSubmit}
      justifycontent={justifycontent}
    >
      {inputs.map(
        ({
          name,
          width = 100,
          label,
          type = 'text',
          options,
          placeholder,
          ...rest
        }) => (
          <InputContainer width={Number(width)} key={name}>
            {!!label && <label htmlFor={name}>{label}</label>}

            {type === 'select' && (
              <Select name={name} options={options} placeholder={placeholder} />
            )}

            {type === 'switch-button' && <SwitchButton name={name} {...rest} />}

            {type === 'text' && (
              <Input
                id={name}
                name={name}
                type={type || 'text'}
                placeholder={placeholder}
                handleInputError={handleInputError}
                iconError={IconError}
                iconSuccess={IconSuccess}
                {...rest}
              />
            )}
            {type === 'date' && (
              <DateInput
                id={name}
                name={name}
                type="date"
                placeholder={placeholder}
                handleInputError={handleInputError}
                iconError={IconError}
                iconSuccess={IconSuccess}
                {...rest}
              />
            )}
          </InputContainer>
        )
      )}
      {buttons && (
        <div className="buttons">
          <button type="button" onClick={clearInputs}>
            <div className="text">Limpar</div>
          </button>
          <button type="submit">
            <div className="icon">
              <img src={SearchIcon} alt="Search" />
            </div>
            <div className="text">Pesquisar</div>
          </button>
        </div>
      )}
    </Container>
  );
};

export default SearchBox;
