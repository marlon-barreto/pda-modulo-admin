import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

import PersonIcon from '../../../assets/images/person.png';
import { useAuth } from '../../../hooks/Auth';

import { Container } from './styles';

const Options: React.FC = () => {
  const [options, setOptions] = useState(false);
  const history = useHistory();
  const { signOut } = useAuth();
  const headerRef = useRef<HTMLDivElement>(null);

  const Logout = useCallback(() => {
    history.push('/');

    signOut();
  }, [history, signOut]);

  const handleClickOutside = (e: any) => {
    if (headerRef?.current?.contains(e.target)) {
      console.log('dentro');
      return;
    }

    console.log('fora');

    setOptions(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container options={options}>
      <div className="icon">
        <button
          className="image"
          type="button"
          onClick={() => setOptions(!options)}
        >
          <img src={PersonIcon} alt="Nome" />
        </button>
        <div className="options" ref={headerRef}>
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
