/* eslint-disable max-len */
// == Import : npm
import React from 'react';
import {
  Form, Icon, Input, Label,
} from 'semantic-ui-react';
import axios from 'axios';

// == Import : local
import 'semantic-ui-css/semantic.min.css';
// import countries from 'src/data/countries';

// == Composant
class AllFestsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genresList: [],
    };
  }

  // je souhaite recuperer la liste des genres au chargement de la page pour les afficher dans un menu deroulant
  // j'utilise donc le lifecycle componentDidMount qui va appeler une fonction au chargement inital
  componentDidMount() {
    this.fetchGenres();
  }

  // cette fonction va chercher la liste des genres sur l'API
  fetchGenres = () => {
    axios.get('http://92.243.10.28/O-Fests/API/wp-json/wp/v2/metal_genre?per_page=100')
      .then((response) => {
        // je verifie que je recupere bien les donnees
        console.log(response.data);
        // je nettoie les donnees recuperees avant de les envoyer dans mon state
        const cleanedGenres = response.data.map((genre) => ({
          text: genre.name,
          key: genre.name,
          // comme nous ne pouvons filtrer les resultats que par l'ID du genre, je passe l'ID des genres dans la value
          value: genre.id,
        }));
        console.log(cleanedGenres);
        // console.log(cleanedGenres.items.id);
        // je stocke les donnees dans mon state
        this.setState({
          genresList: cleanedGenres,
        });
      })
      .catch((error) => {
      // gestion de l'erreur
        console.log(error.response);
      });
  }

  render() {
    // je met les genres dans une constante pour les deverser ensuite dans le component qui m'interesse
    const { genresList } = this.state;
    // je recupere la fonction handleChange et le filtre depuis les props envoyees par le composant principal
    const { handleChange, filter, handleGenre } = this.props;
    return (
      <Form className="filter-form">
        <Form.Field>
          <Label>Rechercher un Fest (Nom ou ville)</Label>
          <Input
            icon={<Icon name="search" inverted circular link />}
            placeholder="Nom du Fest"
            // j'appelle la fonction handleChange() a chaque fois que le champs est modifie
            // la fonction va stocker la valeur saisie par l'utilisateur dans le state (filter)
            onChange={handleChange}
            // la valeur qui est affichee provient du state
            value={filter}
          />
        </Form.Field>
        {/* TODO: gerer la recuperation de la valeur saisie par l'utilisateur */}
        {/* <Form.Field>
          <Label>Pays (coming soon)</Label>
          <Form.Dropdown
            className="country-dropdown"
            placeholder="Choisissez un pays..."
            fluid
            search
            selection
            disabled
            option={countries}
          />
        </Form.Field> */}
        {/* TODO: gerer la recuperation de la valeur saisie par l'utilisateur */}
        <Form.Field>
          <Label>Trier par genre</Label>
          <Form.Dropdown
            className="country-dropdown"
            placeholder="Choisissez un genre..."
            name="festGenre"
            onChange={handleGenre}
            fluid
            search
            selection
            options={genresList}
            action
          />
        </Form.Field>
      </Form>
    );
  }
}

// == Export
export default AllFestsForm;
