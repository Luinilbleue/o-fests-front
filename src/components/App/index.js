// == Import : npm
import React from 'react';

// == Import : local
import Page from 'src/components/Page';
import AltMenu from 'src/containers/AltMenu';
import AltFooter from 'src/components/AltFooter';

import './app.scss';

// == Composant
const App = () => (
  <div id="app">
    <AltMenu />
    <Page />
    <AltFooter />
  </div>
);

// == Export
export default App;
