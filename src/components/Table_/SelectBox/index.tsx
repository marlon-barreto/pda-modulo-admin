import React, { useCallback, useState } from 'react';
import { BiCheck } from 'react-icons/bi';

import { Container } from './styles';

interface TableSelectBoxProps {
  disabled?: boolean;
}

const TableSelectBox: React.FC<TableSelectBoxProps> = ({
  disabled = false,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = useCallback(() => {
    if (disabled) {
      return;
    }

    setSelected(!selected);
  }, [selected, disabled]);

  return (
    <Container onClick={handleSelected} selected={selected}>
      {selected && <BiCheck size={16} color="fff" />}
    </Container>
  );
};

export default TableSelectBox;
