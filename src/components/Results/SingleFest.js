/* eslint-disable react/prefer-stateless-function */
// == Import : npm
import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './results.scss';
import Details from 'src/components/Details';


// == Composant

class SingleFest extends React.Component {
  render() {
    // je recupere mes donnees dans les props
    const {
      id, title, dateStart, dateEnd, city, country, thumbnail,
    } = this.props;
    return (
      <Card
        as={NavLink}
        to={`/fest/?id=${id}`}
        className="result-card"
        component={Details}
      >
        <Image
          className="result-card-img"
          src={thumbnail}
          centered
        />
        <Card.Content className="result-card-content">
          <Card.Header className="result-card-title">
            {title}
          </Card.Header>
          <Card.Meta className="result-card-date">
            <span>
              du {dateStart} au {dateEnd}
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content
          extra
          className="result-card-footer"
        >
          <span className="city">
            {city}
          </span>,
          <span className="country">
            {country}
          </span>
        </Card.Content>
      </Card>
    );
  }
}

// == Export
export default SingleFest;
