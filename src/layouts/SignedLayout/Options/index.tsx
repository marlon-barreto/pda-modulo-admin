import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

import PersonIcon from '../../../assets/images/person.png';
import { useAuth } from '../../../hooks/Auth';

import { Container } from './styles';

const Options: React.FC = () => {
  const [options, setOptions] = useState(false);
  const history = useHistory();
  const { signOut } = useAuth();

  const Logout = useCallback(() => {
    history.push('/');

    signOut();
  }, [history, signOut]);

  return (
    <Container options={options} onClick={() => setOptions(!options)}>
      <div className="icon">
        <img src={PersonIcon} alt="Nome" />
        <div className="options">
          <button type="button" className="logout" onClick={Logout}>
            <div className="text">
              <p>Logout</p>
            </div>
            <div className="icon">
              <IoIosLogOut size={20} color="#959cb6" />
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Options;
