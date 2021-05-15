import styled, { css } from 'styled-components';

interface MenuProps {
  closed: boolean;
}

type ContainerProps = MenuProps;

interface SideMenuProps extends MenuProps {
  hovered: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: grid;
  grid-template:
    'nav header header' 65px
    'nav main main' calc(100vh - 65px)
    / 240px auto;

  ${props =>
    props.closed &&
    css`
      grid-template:
        'nav header header' 65px
        'nav main main' calc(100vh - 65px)
        / 72px auto;
    `}

  @media screen and (max-width: 910px) {
    grid-template:
      'nav header header' 65px
      'nav main main' calc(100vh - 65px)
      / 0px auto;
  }

  header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;

    @media screen and (max-width: 910px) {
      justify-content: space-between;
    }

    .logo {
      width: 104px;

      img {
        max-width: 100%;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .name {
        margin-right: 16px;

        p {
          font-size: 11px;
          color: #959cb6;

          strong {
            font-size: 13px;
            font-weight: 500;
            color: #6c7293;
          }
        }
      }

      .icon {
        width: 38px;
        height: 38px;
        position: relative;
        background: transparent;

        img {
          max-width: 100%;
          border-radius: 50%;
        }
      }

      .menu-mobile {
        background: transparent;
        margin-left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
      }
    }
  }

  #main {
    grid-area: main;
    background: #eef0f8;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .footer {
      width: 100%;
      padding-top: 80px;
      position: relative;
      bottom: 64px;
      flex-grow: 1;
      /* background: blue; */
    }
  }
`;

export const SideMenu = styled.nav<SideMenuProps>`
  grid-area: nav;
  background: #1e1e2d;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow-y: auto;

  .content {
    height: 100%;

    .top {
      display: inline-block;
      width: 100%;
      padding: 24px 0;

      .container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .logo {
          max-width: 104px;
          width: 100%;

          img {
            max-width: 100%;
          }
        }

        .arrow {
          width: 24px;
          height: 24px;
          background: transparent;
          cursor: pointer;

          img {
            max-width: 100%;
          }
        }
      }
    }

    .links-list {
      margin-top: 32px;
    }
  }

  ${props =>
    props.closed &&
    css`
      .content {
        .top {
          background: #1b1b28;

          .container {
            ${props.hovered &&
            css`
              justify-content: center;
              align-items: center;
            `}

            .logo {
              display: ${props.closed ? 'none' : 'block'};
            }

            .arrow {
              transform: ${props.closed ? 'rotate(-180deg)' : 'rotate(0)'};
            }
          }
        }

        ${props.hovered &&
        css`
          background: #1e1e2d;
          position: absolute;
          left: 0;
          top: 0;
          width: 265px;
          z-index: 100;

          .top {
            background: #1e1e2d;

            .container {
              justify-content: space-between;
              align-items: flex-start;

              .logo {
                display: block;
              }
            }
          }
        `}
      }
    `}

  @media screen and (max-width: 910px) {
    .content {
      position: absolute;
      left: -265px;
      top: 0;
      width: 265px;

      .top {
        background: #1b1b28;

        .container {
          justify-content: center;
          align-items: center;

          .logo {
            display: none;
          }

          .arrow {
            display: none;
          }
        }
      }

      ${props =>
        props.closed &&
        css`
          left: 0px;
          background: #1e1e2d;

          .top {
            background: #1e1e2d;

            .container {
              justify-content: center;
              align-items: center;

              .logo {
                display: block;
              }

              .arrow {
                transform: rotate(0deg);
              }
            }
          }
        `}
    }
  }
`;

export const Main = styled.main``;
