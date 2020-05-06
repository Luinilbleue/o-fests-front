/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import {
  Button, Image, Grid, Icon, Modal, Loader, List,
} from 'semantic-ui-react';

// == Import : local
import './details.scss';
import MapDetail from 'src/components/Map/MapDetail';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      city: '',
      country: '',
      dateStart: '',
      dateEnd: '',
      facebook: '',
      website: '',
      thumbnail: '',
      // genres: '',
      lat: '',
      lng: '',
    };
  }

  // je recupere l'ID de mon fest au chargement de la page
  componentDidMount() {
    const festID = queryString.parse(location.search);
    console.log(festID);
    this.fetchDetails(festID);
  }

  // je vais chercher les informations correspondant au fest dont l'ID a ete recupere ci-dessus
  fetchDetails = (festID) => {
    axios.get(`http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest/${festID.id}`)
      .then((response) => {
        const fest = response.data;
        console.log(response.data);
        this.setState({
          id: fest.id,
          title: fest.title.rendered,
          description: fest.content.rendered,
          adress: fest.acf.adress,
          city: fest.acf.city,
          country: fest.acf.country,
          dateStart: fest.acf.date_start,
          dateEnd: fest.acf.date_end,
          facebook: fest.acf.facebook_url,
          website: fest.acf.website_url,
          thumbnail: fest.thumbnail.url,
          genres: fest.metal_genre,
          lat: fest.acf.test_maps.lat,
          lng: fest.acf.test_maps.lng,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error.response);
      });
  }

  render() {
    const {
      title, description, adress, city, country, dateStart,
      dateEnd, facebook, website, thumbnail, genres, lat, lng,
    } = this.state;
    console.log(genres);
    return (
      <div className="fest-details">
        { this.state.id !== '' ? (
          <Grid
            centered
            inverted
            columns={3}
            divided
            className="fest-details-grid"
          >
            <Grid.Column
              computer={5}
              tablet={16}
              mobile={16}
              className="fest-details-map"
            >
              <MapDetail
                lat={lat}
                lng={lng}
                title={title}
              />
            </Grid.Column>
            <Grid.Column
              computer={6}
              tablet={8}
              mobile={16}
            >
              <h1 className="fest-details-title">{title}</h1>
              <h3 className="fest-details-date">du {dateStart} au {dateEnd}</h3>
              <h4 className="fest-details-location">{adress}</h4>
              <h3 className="fest-details-location-city">{city}, {country}</h3>
              <Image
                className="fest-details-img"
                src={thumbnail}
                centered
              />
              <div className="fest-details-button-zone">
                <Modal
                  trigger={(
                    <Button
                      className="fest-details-button"
                      inverted
                      color="orange"
                      size="large"
                    >
                    Agrandir
                    </Button>
                  )}
                  closeIcon
                >
                  <Image
                    src={thumbnail}
                    centered
                  />
                </Modal>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={5}
              tablet={8}
              mobile={16}
            >
              <p className="fest-details-description">{description}</p>
              <div className="genre-list">
                <p className="genre-list-title">Genres de metal :</p>
                {genres.map((genre) => (
                  <List.Item className="genre-list-item">{genre.name}</List.Item>
                ))}
              </div>
              <p className="fest-details-link">
                <a href={website}>Plus d'infos sur le site du Fest</a>
              </p>
              <p className="fest-details-link">
                <a href={facebook}>Page Facebook du Fest</a>
              </p>
              <div className="fest-details-button-zone">
                <Button
                  className="fest-details-button"
                  inverted
                  color="orange"
                  size="large"
                >
                  <Icon
                    name="search"
                    size="large"
                    color="orange"
                    inverted
                  />
                    Chercher un autre Fest
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        ) : (
          <div className="loading-message">
            <Loader
              active
              inline
              size="massive"
              content="Le roadie arrive, patiente !"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Details;
