import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import ArrowDown from '../../../assets/svg/arrow-down.svg';
import MiniArrowDown from '../../../assets/svg/mini-arrow-down-gray.svg';

interface LinkProps {
  name: string;
  url: string;
}

interface ItemLinkProps {
  openedState?: boolean;
  icon: string;
  title: string;
  links?: LinkProps[];
  closed: boolean;
}

const ItemLink: React.FC<ItemLinkProps> = ({
  openedState = false,
  closed,
  icon,
  title,
  links,
}) => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(openedState);

  // Menu aberto geral
  // useEffect(() => {
  //   const result = links?.some(link => pathname === link.url || '/');

  //   if (result) {
  //     setOpened(true);
  //   }
  // }, [links, pathname]);

  return (
    <Container containerClosed={closed} opened={opened}>
      <button
        type="button"
        onClick={() => setOpened(!opened)}
        className="title"
      >
        <div className="container">
          <div className="left">
            <div className="icon">
              <img src={icon} alt="Módulos" />
            </div>
            <div className="text">
              <p>{title}</p>
            </div>
          </div>
          {links?.length !== 0 && (
            <div className="arrow">
              <img src={ArrowDown} alt="Arrow right" />
            </div>
          )}
        </div>
      </button>

      <div className="sub-itens">
        <div className="container">
          {!!links &&
            links.map(link => (
              <div className="item" key={link.url}>
                <div
                  className={`link ${
                    !!pathname && link.url === pathname && 'selected'
                  }`}
                >
                  <Link key={link.url} to={link.url}>{`- ${link.name}`}</Link>
                </div>
                <div className="arrow">
                  <img src={MiniArrowDown} alt="" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ItemLink;
