// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// == Import : local
import Homepage from 'src/components/Homepage';
import NewFestForm from 'src/containers/NewFestForm';
import LegalMentions from 'src/components/LegalMentions';
import About from 'src/components/About';
import Details from 'src/components/Details';
import AllFests from 'src/components/AllFests';
import ConnectionModal from 'src/components/ConnectionModal';
import Error404 from 'src/components/Error404';

import './page.scss';

// == Composant
const Page = () => (
  <div className="main">

    <Switch>
      <Route
        path="/"
        exact
        component={Homepage}
      />
      <Route
        path="/fest/"
        component={Details}
      />
      <Route
        path="/all-fests"
        component={AllFests}
      />
      <Route
        path="/add-fest"
        component={NewFestForm}
      />
      <Route
        path="/login"
        component={ConnectionModal}
      />
      <Route
        path="/about"
        component={About}
      />
      {/* TODO: creer une page de contact */}
      {/* <Route path="/contact-us" component={Contact} /> */}
      <Route
        path="/legal"
        component={LegalMentions}
      />
      <Route
        path="/*"
        exact
        component={Error404}
      />
    </Switch>

  </div>
);

// == Export
export default Page;
