import React, { useCallback, useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';

import { Container, SideMenu, Main } from './styles';

import LogoImage from '../../assets/images/logo02.png';
import LogoImageBlack from '../../assets/images/logo-black.jpeg';

import Options from './Options';
import ItemLink from './ItemLink';

import Footer from '../../components/Footer';

import RegisterIcon from '../../assets/svg/register-dashboard-icon.svg';
import ArrowLeft from '../../assets/svg/link-arrow-left.svg';

import api from '../../services/api';

interface LinkProps {
  name: string;
  url: string;
}

interface PagesProps {
  name: string;
  links?: LinkProps[];
  fatherCode?: number;
  page?: number;
}

interface PagesRequest {
  data: {
    systemList: {
      systemMenuList: PagesProps[];
    }[];
  }[];
}

const SignedLayout: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [closed, setClosed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [pages, setPages] = useState([] as PagesProps[]);

  const windowResize = useCallback(() => {
    if (window.innerWidth <= 910) {
      setHovered(false);
      setClosed(false);
      setMobile(true);

      return;
    }

    setClosed(false);
    setMobile(false);
  }, []);

  useEffect(() => {
    windowResize();
    window.addEventListener('resize', windowResize);
  }, [windowResize]);

  const handleChangeMenuState = useCallback(() => {
    setClosed(!closed);
    setHovered(false);
  }, [closed]);

  const handleHover = useCallback(state => {
    if (window.innerWidth <= 910) {
      setHovered(false);
      setClosed(true);
      return;
    }

    setHovered(state);
  }, []);

  useEffect(() => {
    async function getMenu() {
      const response: PagesRequest = await api.patch('ProfileSystem', {
        code: 43,
      });

      const allPages = response.data[0].systemList[0].systemMenuList;

      const normalPages = allPages.filter(
        (item: PagesProps) => !item.fatherCode
      );

      const childrenPages = normalPages.map((_: PagesProps, index: number) => {
        return allPages
          .filter((allItem: PagesProps) => allItem.fatherCode === index + 1)
          .map((allItem: PagesProps) => ({
            name: allItem.name,
            url: `/${allItem.page}`,
          }));
      });

      const modifiedPages: PagesProps[] = normalPages.map(
        (item: PagesProps, index: number) => ({
          ...item,
          links: childrenPages.find(
            (_: object, childrenIndex: number) => childrenIndex === index
          ),
        })
      );

      setPages([...modifiedPages]);
    }

    getMenu();
  }, []);

  return (
    <Container closed={closed}>
      <header>
        {mobile && (
          <div className="logo">
            <img src={LogoImageBlack} alt="" />
          </div>
        )}
        <div className="right">
          <div className="name">
            <p>
              Olá,
              <strong>{` ${user?.name}`}</strong>
            </p>
          </div>
          <Options />
          {mobile && (
            <button
              type="button"
              className="menu-mobile"
              onClick={() => setClosed(!closed)}
            >
              <FiMenu size={40} color="#484F66" />
            </button>
          )}
        </div>
      </header>
      <SideMenu
        closed={closed}
        hovered={hovered}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <div className="content">
          <div className="top">
            <div className="container">
              <div className="logo">
                <img src={LogoImage} alt="" />
              </div>
              <button
                onClick={handleChangeMenuState}
                type="button"
                className="arrow"
              >
                <img src={ArrowLeft} alt="" />
              </button>
            </div>
          </div>
          <div className="links-list">
            {pages.map(page => (
              <ItemLink
                key={page.name}
                title={page.name}
                icon={RegisterIcon}
                closed={closed ? !hovered : false}
                links={page.links}
              />
            ))}
          </div>
        </div>
      </SideMenu>
      <Main onClick={() => mobile && setClosed(false)} id="main">
        {children}
        <footer className="footer">
          <Footer />
        </footer>
      </Main>
    </Container>
  );
};

export default SignedLayout;
