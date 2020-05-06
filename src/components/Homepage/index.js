// == Import : npm
import React from 'react';
import {
  Divider, Loader,
} from 'semantic-ui-react';
import axios from 'axios';

// == Import : local
import Map from 'src/components/Map';
import Results from 'src/components/Results';
import './homepage.scss';

// == Composant
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fests: [],
    };
  }

  // Comme je souhaite recuperer les informations au chargement de la page
  // j'utilise le lifecycle componentDidMount qui appelle une fonction des le chargement de ma page
  componentDidMount() {
    this.fetchFests();
  }

  // cette fonction est appelee par le componentDidMount
  // j'effectue ici ma requete axios pour recuperer les informations de l'API
  fetchFests = () => {
    axios.get('http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest?per_page=12')
      .then((response) => {
        // je verifie que ma reponse n'est pas vide avec un console.log()
        console.log(response.data);
        // je nettoie la reponse pour ne garder que les champs qui m'interessent
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
        // j'envoie mes informations dans mon state pour pouvoir les exploiter ensuite
        this.setState({
          fests: cleanedFests,
        });
      })
      .catch((error) => {
        // en cas d'erreur
        console.log(error.response);
      });
  }

  render() {
    // je stocke mes information dans une constante pour pouvoir ensuite les redistribuer dans les components enfants
    const { fests } = this.state;
    return (
      <div className="home">
        <div className="home-container">
          <Map
            fests={fests}
            className="home-map"
          />
        </div>
        <div className="home-fest">
          <Divider
            className="allFestsDivider"
            inverted
          />
          <h2 className="home-fest-title">Les derniers Fests ajoutes</h2>
        </div>
        {/* j'utilise une condition ternaire pour determiner mon affichage.
      Si mon objet fests est vide, j'affiche une animation de loader.
      Des que mon objet fests se remplit, j'envoie les donnees dans mon composant Results */}
        {fests.length ? (
          <Results fests={fests} />
        ) : (
          <div className="loading-message">
            <Loader
              active
              inline
              size="massive"
              content="Branchement des amplis"
              className="loading-message"
            />
          </div>
        )}
      </div>
    );
  }
}


// == Export
export default Homepage;
