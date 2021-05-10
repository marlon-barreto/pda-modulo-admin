import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
  ValueType,
} from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  hasChanged?(value: number | null): void;
}

const Select: React.FC<Props> = ({ name, hasChanged, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: undefined,
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    placeholder: (provided: object) => ({
      ...provided,
      fontSize: '13px',
      lineHeight: '45px',
      fontWeight: 400,
      color: '#b5b5c3',
    }),
    option: (provided: object) => ({
      ...provided,
      zIndex: 100,
    }),
  };

  return (
    <Container>
      <ReactSelect
        styles={customStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        onChange={(event: ValueType<OptionTypeBase, false>) => {
          if (hasChanged) {
            hasChanged(event?.value);
          }
        }}
        {...rest}
      />
    </Container>
  );
};

export default Select;
