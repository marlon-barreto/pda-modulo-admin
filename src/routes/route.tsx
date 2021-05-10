import React from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

import SignedLayout from '../layouts/SignedLayout';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Routes: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        if (isPrivate) {
          if (user) {
            return (
              <SignedLayout>
                <Component />
              </SignedLayout>
            );
          }
          return <Redirect to={{ pathname: '/401' }} />;
        }
        return <Component />;
      }}
    />
  );
};

export default Routes;
