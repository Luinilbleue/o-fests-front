// == Import : npm
import React from 'react';
import {
  Divider,
  Grid,
  Segment,
} from 'semantic-ui-react';

// == Import : local
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './connexionmodal.scss';

const ConnectionModal = () => (
  <Segment
    inverted
    placeholder
    className="segment"
  >
    <Grid
      inverted
      Row={1}
      className="connection-form-column"
    >
      <Grid.Row
        inverted
        className="connection-form-column-left"
      >
        {/* j'appelle le composant correspondant au formulaire de connexion */}
        <LoginForm />
      </Grid.Row>
      <Divider
        horizontal
        inverted
      >
        OU
      </Divider>
      <Grid.Row
        verticalAlign="middle"
        className="connection-form-column-right"
      >
        {/* j'appelle le composant correspondant au formulaire d'inscription */}
        <SignUpForm />
      </Grid.Row>
    </Grid>
  </Segment>
);

// == Export
export default ConnectionModal;
