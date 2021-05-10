import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './route';

import Profiles from '../features/Profiles/pages';
import CreateProfile from '../features/Profiles/pages/CreateProfile';
import EditProfile from '../features/Profiles/pages/EditProfile';
import ProfilesPermissions from '../features/Profiles/pages/ProfilesPermissions';
import Users from '../features/Users/pages';
import CreateUser from '../features/Users/pages/CreateUser';
import EditUser from '../features/Users/pages/EditUser';

import Receivement from '../features/Receivement/pages';
import DetailReceivement from '../features/Receivement/pages/DetailReceivement';
import NotFoundPage from '../layouts/NotFoundPage';
import NotAuthorized from '../layouts/NotAuthorized';
import SignIn from '../layouts/SignIn';

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/Profile" exact component={Profiles} isPrivate />
        <Route
          path="/Profile/create"
          exact
          component={CreateProfile}
          isPrivate
        />
        <Route
          path="/Profile/edit/:code"
          exact
          component={EditProfile}
          isPrivate
        />
        <Route
          path="/Profile/permissions"
          component={ProfilesPermissions}
          isPrivate
        />
        <Route path="/User" exact component={Users} isPrivate />
        <Route path="/User/edit/:code" exact component={EditUser} isPrivate />
        <Route path="/User/create" component={CreateUser} isPrivate />

        <Route path="/Receivement" exact component={Receivement} isPrivate />
        <Route
          path="/Receivement/Detail/:code"
          exact
          component={DetailReceivement}
          isPrivate
        />
        <Route path="/505" component={NotAuthorized} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
