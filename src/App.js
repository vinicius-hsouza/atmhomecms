import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';

import GlobalStyle from './styles/global';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
      <GlobalStyle />
    </div>
  );
}

export default App;
