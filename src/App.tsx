import React from 'react';
import Routes from './routes';
import GlobalStyles from './styles/global';

import Hooks from './hooks';

const App: React.FC = () => {
  return (
    <Hooks>
      <GlobalStyles />
      <Routes />
    </Hooks>
  );
};

export default App;
