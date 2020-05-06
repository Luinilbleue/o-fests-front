// == Import : npm
import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

// == Import : local
import SingleFest from './SingleFest';
import './results.scss';

import 'semantic-ui-css/semantic.min.css';


// == Composant
const Results = ({ fests }) => (
  <div className="results">
    <Grid stackable columns={1}>
      <Card.Group className="ui cards">
        {fests.map((fest) => (
          <SingleFest
            // j'ajoute une cle unique a mon fest
            key={fests.id}
            // et je deverse toutes les informations du fest concerne
            {...fest}
          />
        ))}
      </Card.Group>
    </Grid>
  </div>
);

// == Export
export default Results;
