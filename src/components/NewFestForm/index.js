// == Import : npm
import React from 'react';
import axios from 'axios';
import {
  Input, Form, Label, TextArea, Grid, Button, Segment, Container,
} from 'semantic-ui-react';

// == Import : local
import './newfestform.scss';
import 'semantic-ui-css/semantic.min.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './reactdaypickerstyle.scss';
import countries from 'src/data/countries';

// == Composant
class NewFestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genresList: [],
      festName: '',
      festAdress: '',
      festCity: '',
      festCountry: '',
      festGenres: '',
      festBeginDate: '',
      festEndDate: '',
      festPoster: '',
      festWebsite: '',
      festFacebook: '',
      festDescription: '',
      postFestSuccess: 'hidden',
      postFestError: 'hidden',
    };
  }

  // chargement de la liste des genres
  componentDidMount() {
    this.fetchgenres();
  }

  // methode pour recuperer tous les genres enregistres en BDD
  fetchgenres = () => {
    axios.get('http://92.243.10.28/O-Fests/API/wp-json/wp/v2/metal_genre?per_page=100')
      .then((response) => {
        console.log(response.data);
        const cleanedGenres = response.data.map((genre) => ({
          text: genre.name,
          key: genre.id,
          value: genre.name,
        }));
        console.log(cleanedGenres);
        this.setState({
          genresList: cleanedGenres,
        });
      })
      .catch((error) => {
      // handle error
        console.log(error.response);
      });
  }

  // methode appelee a la soumission du formulaire
  handleFestSubmit = (evt) => {
    evt.preventDefault();
    console.log('mon fest a ete soumis');
    console.log(this.state);
    this.createNewFest();
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // affecte le genre selectionne au fest en creation
  handleGenre = (evt, { value }) => {
    const genre = value;
    console.log(genre);
    this.setState({
      festGenres: genre,
    });
  }

  // affecte le pays selectionne au fest en creation
  handleCountry = (evt, { value }) => {
    const country = value;
    this.setState({
      festCountry: country,
    });
  }

  // affecte une date de depart au fest en creation
  handleBeginDateChange = (day) => {
    const beginDay = day.toLocaleDateString();
    console.log(beginDay);
    this.setState({ festBeginDate: beginDay });
  }

  // affecte une date de fin au fest en creation
  handleEndDateChange = (day) => {
    const endDay = day.toLocaleDateString();
    console.log(endDay);
    this.setState({
      festEndDate: endDay,
    });
  }

  // requete de creation d'un nouveau fest
  createNewFest = () => {
    // je recupere le token de l'utilisateur
    const token = localStorage.getItem('token');
    // je recupere toutes les infos saisies dans le formulaire par l'utilisateur
    const {
      festName, festCity, festAdress, festBeginDate, festEndDate, festFacebook,
      festWebsite, festCountry, festDescription, festPoster, festGenres,
    } = this.state;
    console.log(this.state);
    // envoie des informations
    axios({
      method: 'post',
      url: `http://92.243.10.28/O-Fests/API/wp-json/wp/v2/fest?title=${festName}&city=${festCity}&adress=${festAdress}&date_start=${festBeginDate}&date_end=${festEndDate}&facebook_url=${festFacebook}&website_url=${festWebsite}&country=${festCountry}&content=${festDescription}&metal_genres=${festGenres}&poster_url=${festPoster}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        console.log('fest envoye');
        this.setState({
          postFestSuccess: 'display-success-error-message',
        });
      })
      .catch((error) => {
        // handle error
        console.log(error.response);
        console.log('error');
        this.setState({
          postFestError: 'display-success-error-message',
        });
      });
    // TODO: gerer l'envoi d'une image dans la bibliotheque de medi
    // axios({
    //   method: 'post',
    //   url: 'http://92.243.10.28/O-Fests/API/wp-json/wp/v2/media',
    //   data: festPoster,
    //   headers: { Authorization: `Bearer ${token}`, 'content-type': 'image', 'Content-Disposition': 'attachement' },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log('poster envoye');
    //   })
    //   .catch((error) => {
    //   // handle error
    //     console.log(error.response);
    //     console.log('error poster');
    //   });
  }

  render() {
    // je verifie que l'utilisateur est bien connecte pour pouvoir autoriser la creation d'un nouveau fest
    const { isLoggedIn } = this.props;
    const {
      genresList, festBeginDate, festEndDate, postFestSuccess, postFestError,
    } = this.state;
    return (
      <div className="newfest">
        <Form onSubmit={this.handleFestSubmit}>
          <Grid
            centered
            stackable
            columns={3}
          >
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={5}
            >
              <div className="newfest-col1-form">
                <Form.Field>
                  <Label>Nom du Fest</Label>
                  <Label className="label-mandatory">Obligatoire</Label>
                  <Input
                    placeholder="Nom du Fest ..."
                    name="festName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Adresse</Label>
                  <Input
                    placeholder="Adresse ..."
                    name="festAdress"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Ville</Label>
                  <Label className="label-mandatory">Obligatoire</Label>
                  <Input
                    placeholder="Ville"
                    name="festCity"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Pays</Label>
                  <Label className="label-mandatory">Obligatoire</Label>
                  <Form.Field>
                    <Form.Dropdown
                      className="country-dropdown"
                      placeholder="Choisissez un pays..."
                      name="festCountry"
                      onChange={this.handleCountry}
                      fluid
                      search
                      selection
                      options={countries}
                    />
                  </Form.Field>
                </Form.Field>
                <Form.Field>
                  <Label>Genre</Label>
                  <Form.Field>
                    <Form.Dropdown
                      className="country-dropdown"
                      placeholder="Choisissez un genre..."
                      name="festCountry"
                      onChange={this.handleGenre}
                      fluid
                      search
                      selection
                      options={genresList}
                      defaultValue="Tous les genres"
                    />
                  </Form.Field>
                </Form.Field>
              </div>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={6}
            >
              <Form.Field className="newFestCalendar">
                <div>
                  {festBeginDate && (
                  <p className="date-label">du
                    <Label className="calendarLabel">{festBeginDate}</Label>
                  </p>
                  )}
                  {!festBeginDate && (
                  <p className="date-label">
                    <Label className="calendarLabel">Début</Label>
                    <Label className="label-mandatory">Obligatoire</Label>
                  </p>
                  )}
                  <DayPickerInput
                    onDayChange={this.handleBeginDateChange}
                    className="begin-day-picker"
                  />
                </div>
                <div>
                  {festEndDate && (
                  <p className="date-label">au
                    <Label className="calendarLabel">{festEndDate}</Label>
                  </p>
                  )}
                  {!festEndDate && (
                  <p className="date-label">
                    <Label className="calendarLabel">Fin</Label>
                    <Label className="label-mandatory">Obligatoire</Label>
                  </p>
                  )}
                  <DayPickerInput
                    onDayChange={this.handleEndDateChange}
                    className="end-day-picker"
                  />
                </div>
              </Form.Field>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={5}
            >
              <div className="newfest-col3-form">
                {/* <Form.Field>
                  <Label>Flyer/Poster du Fest (coming soon)</Label>
                  <Input
                    type="file"
                    placeholder="Search..."
                    name="festPoster"
                    onChange={this.handleChange}
                  />
                </Form.Field> */}
                <Form.Field>
                  <Label>Flyer/Poster du Fest (URL)</Label>
                  <Input
                    placeholder="Lien vers le poster du fest..."
                    name="festPoster"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Site Web du Fest</Label>
                  <Input
                    placeholder="Site web du Fest ..."
                    name="festWebsite"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Page Facebook du Fest</Label>
                  <Input
                    placeholder="Page Facebook du Fest ..."
                    name="festFacebook"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label>Description</Label>
                  <Label className="label-mandatory">Obligatoire</Label>
                  <TextArea
                    placeholder="Ajouter une description (vous pouvez preciser le lineup)..."
                    name="festDescription"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </div>
            </Grid.Column>
            <Grid.Column
              className="newfest-validation"
              computer={16}
              textAlign="center"
            >
              <div>
                {/* message de succes de la creation du fest */}
                <Segment
                  color="grey"
                  className={postFestSuccess}
                  textAlign="center"
                  inverted
                  raised
                >
                Le fest a bien été envoyé
                </Segment>
                {/* message d'erreur de la creation du fest */}
                <Segment
                  color="red"
                  className={postFestError}
                  textAlign="center"
                  inverted
                  raised
                >
                Erreur lors de la création du fest, veuillez contacter un admin !
                </Segment>
                {/* affichage conditionnel en fonction de si l'utilisateur est connecte ou pas */}
                { isLoggedIn ? (
                  // si l'utilisateur est bien connecte, j'affiche le bouton d'envoi du formulaire
                  <div>
                    <Button
                      inverted
                      color="orange"
                      size="massive"
                      onClick={this.handleFestSubmit}
                    >
                      Soumettre un Fest
                    </Button>
                  </div>
                ) : (
                  // si l'utilisateur n'est pas connecte, j'affiche juste un message indiquant a l'utilisateur qu'il doit se connecter ou creer un compte
                  <p className="connect-please">! Veuillez vous connecter pour créer un nouveau fest !</p>
                ) }
              </div>
              <Container className="warning">
                <h2>Infos importantes</h2>
                <p>
                      Ces <Label className="label-mandatory info">informations</Label> sont obligatoires, ou vous serez maudit sur 7 générations.
                </p>
                <p>
                    Un administrateur validera le Fest avant publication sur le site.
                </p>
                <p>
                    Si cela prend plus de 24h, attendez plus longtemps.
                </p>
              </Container>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }
}

// == Export
export default NewFestForm;
