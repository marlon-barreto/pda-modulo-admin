import React, { useCallback } from 'react';

import { WindowContainer } from './styles';

interface PopUpWindowProps {
  title?: string;
  handleSubmit?(): void;
  handleCancel?(): void;
}

const PopUpWindow: React.FC<PopUpWindowProps> = ({
  title,
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
        <p>{children}</p>
        <div className="buttons">
          <button type="button" className="cancel" onClick={handleClickCancel}>
            Cancel
          </button>
          <button type="button" className="submit" onClick={handleClickSubmit}>
            Delete
          </button>
        </div>
      </div>
    </WindowContainer>
  );
};

export default PopUpWindow;
