/* eslint-disable max-len */
import React from 'react';
import {
  Grid, Divider, Loader, Button, Icon,
} from 'semantic-ui-react';
import axios from 'axios';

// == Import : local
import './allFests.scss';
import Results from 'src/components/Results';
import Map from 'src/components/Map';
import AllFestsForm from './allFestsForm';

// -- Composant
class AllFests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // je recuperer la liste des fests et les stocke dans mon state
      fests: [],
      // je stocke mon filtre de recherche saisie par l'utilisateur
      filter: '',
      genreID: '',
    };
  }

  // Je souhaite recuperer la totalite des fests afin de les afficher sur cette page
  // J'appelle la fonction qui va effectuer ma requete au chargement de la page dans le lifecycle componentDidMount
  componentDidMount() {
    this.fetchAllFests();
  }

  // cette fonction effectue une requete vers l'API pour aller recuperer l'ensemble des fests
  fetchAllFests = () => {
    axios.get('http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest?per_page=100')
      .then((response) => {
        // je verifie que je recupere bien les donnees de l'API
        console.log(response.data);
        // je nettoie les donnees recues avant de les stocker dans mon state
        const cleanedFests = response.data.map((fest) => ({
          id: fest.id,
          title: fest.title.rendered,
          description: fest.content.rendered,
          url: fest.link,
          city: fest.acf.city,
          country: fest.acf.country,
          dateStart: fest.acf.date_start,
          dateEnd: fest.acf.date_end,
          facebook: fest.acf.facebook_url,
          website: fest.acf.website_url,
          thumbnail: fest.thumbnail.url,
          genres: fest.metal_genre.name,
          lat: fest.acf.test_maps.lat,
          lng: fest.acf.test_maps.lng,
        }));
        // je stocke les donnees nettoyees dans mon state
        this.setState({
          fests: cleanedFests,
        });
      })
      .catch((error) => {
        // gestion de l'erreur
        console.log(error.response);
      });
  }

  // j'utilise une fonction qui va gerer la saisie utilisateur dans le champs filtre de recherche
  handleChange= (evt) => {
    const filterValue = evt.target.value;
    // je met la valeur sasie par l'utilisateur dans le state afin de l'utiliser par la suite
    this.setState({ filter: filterValue });
    // j'appelle une fonction qui fera une requete en prenant en compte le filtre, je passe le filtre en param pour que la recherche s'effectue directement
    this.fetchFilteredFests(filterValue);
  }

  // j'utilise une fonction qui va gerer le choix de l'utilisateur dans le champs genre
  handleGenre = (evt, { value }) => {
    const genre = value;
    // je met la valeur choisie dans le state (inutile car non utilise par le suite pour le moment)
    this.setState({
      genreID: genre,
    });
    // j'appelle une fonction qui fera une requete en prenant en compte le genre, je passe le filtre en param pour que la recherche s'effectue directement
    this.fetchFestsByGenre(genre);
  }

  // fonction qui effectue une requete vers l'API en prenant en compte le terme saisi par l'utilisateur
  fetchFilteredFests = (filterValue) => {
    // j'effectue une requete vers l'API en incluant le filtre
    axios.get(`http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest?search=${filterValue}&per_page=100`)
      .then((response) => {
        // je verifie que la reponse n'est pas vide
        console.log(response.data);
        // je nettoie les donnees retournees par l'API avant de les stocker dans le state
        const cleanedFests = response.data.map((fest) => ({
          id: fest.id,
          title: fest.title.rendered,
          description: fest.content.rendered,
          url: fest.link,
          city: fest.acf.city,
          country: fest.acf.country,
          dateStart: fest.acf.date_start,
          dateEnd: fest.acf.date_end,
          facebook: fest.acf.facebook_url,
          website: fest.acf.website_url,
          thumbnail: fest.thumbnail.url,
          genres: fest.metal_genre.name,
          lat: fest.acf.test_maps.lat,
          lng: fest.acf.test_maps.lng,
        }));
        // je stocke les donnees nettoyees dans le state
        this.setState({
          fests: cleanedFests,
        });
      })
      .catch((error) => {
        // gestion de l'erreur
        console.log(error.response);
      });
  }

  fetchFestsByGenre = (genre) => {
    // j'effectue une requete vers l'API en incluant l'ID du genre
    axios.get(`http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest?metal_genre=${genre}&per_page=100`)
      .then((response) => {
        // je verifie que la reponse n'est pas vide
        console.log(response.data);
        // je nettoie les donnees retournees par l'API avant de les stocker dans le state
        const cleanedFests = response.data.map((fest) => ({
          id: fest.id,
          title: fest.title.rendered,
          description: fest.content.rendered,
          url: fest.link,
          city: fest.acf.city,
          country: fest.acf.country,
          dateStart: fest.acf.date_start,
          dateEnd: fest.acf.date_end,
          facebook: fest.acf.facebook_url,
          website: fest.acf.website_url,
          thumbnail: fest.thumbnail.url,
          genres: fest.metal_genre.name,
          lat: fest.acf.test_maps.lat,
          lng: fest.acf.test_maps.lng,
        }));
        // je stocke les donnees nettoyees dans le state
        this.setState({
          fests: cleanedFests,
        });
      })
      .catch((error) => {
        // gestion de l'erreur
        console.log(error.response);
      });
  }

  // fonction qui reinitialise tous les filtres et recharge tous les fests
  handleReset = () => {
    this.fetchAllFests();
    this.setState({
      filter: '',
    });
  }

  render() {
    // je stocke mes fests et le filtre du state dans des constantes afin de les redistribuer dans les composant
    const { fests, filter } = this.state;
    return (
      <div className="allfest-page">
        <Grid inverted>
          <Grid.Row columns={2}>
            <Grid.Column
              computer={10}
              tablet={8}
              mobile={16}
              className="map-container"
            >
              {/* je transmet les resultats a la carte pour pouvoir afficher les fests sur la map */}
              <Map fests={fests} />
            </Grid.Column>
            <Grid.Column
              computer={6}
              tablet={8}
              mobile={16}
            >
              <AllFestsForm
                // je passe la valeur du filtre saisie par l'utilisateur, ainsi que la fonction qui gere la saisie directement au composant enfant
                handleChange={this.handleChange}
                handleGenre={this.handleGenre}
                filter={filter}
              />
              <div className="reset">
                <Button
                  inverted
                  color="orange"
                  size="large"
                  // j'appelle la fonction qui effectue le reset de la page
                  onClick={this.handleReset}
                >
                  <Icon name="search" />Reset
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="home-fest">
          <Divider
            className="allFestsDivider"
            inverted
          />
          <h2 className="all-fest-title">Resultats</h2>
        </div>
        {/* j'effectue une condition ternaine qui affiche soit les resultats soit une animation de chargement */}
        { fests.length ? (
          // si l'objet fests n'est pas vide, je transmet les fests en props au composant enfant
          <Results fests={fests} />
        ) : (
          // si l'objet fests est vide, j'affiche le loader
          <div className="loading-message">
            <Loader
              active
              inline
              size="massive"
              content="Tirage des bières en cours"
            />
          </div>
        )}
      </div>
    );
  }
}

export default AllFests;
