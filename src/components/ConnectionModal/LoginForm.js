// == Import : npm
import React, { Component } from 'react';
import {
  Form, Button, Icon, Segment,
} from 'semantic-ui-react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// == Import : local
import './connexionmodal.scss';
import 'semantic-ui-css/semantic.min.css';
import setAuthToken from 'src/utils/setAuthToken';
import { setCurrentUser } from 'src/store/reducer';
import store from '../../store';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      // je stocke cette donnee pour gerer l'affichage du mot de passe en changeant son type
      passwordType: 'password',
      // deux props ici pour gerer l'affichage des message de succes/echec de login
      loginSuccess: false,
      loginError: false,
    };
  }

  // ma fonction ici me permettant de controler le champs de saisie de l'utilisateur
  handleChange= (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // ma fonction qui s'occupe de faire la requete de connexion
  handleSubmit = (evt) => {
    evt.preventDefault();
    // je peux stocker l'url du site (inutile ici car non reutilise ailleurs)
    const siteUrl = 'http://92.243.10.28/O-Fests/API';
    // je stocke mes informations de connexion pour pouvoir les envoyer
    const LoginData = {
      username: this.state.username,
      password: this.state.password,
    };
    // je fais ma requete Axios
    axios.post(`${siteUrl}/wp-json/jwt-auth/v1/token`, LoginData)
      .then((response) => {
        const { data } = response;
        // je verifie les donnees qui me sont renvoyees ainsi que le status de ma requete
        console.log(data);
        // je recupere le token de connexion
        const { token } = data;
        // ainsi que le nom de l'utilisateur
        const username = data.user_display_name;
        // si le token est bien existant, je stocke le username et le token dans le localStorage
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          // j'appelle ma fonction stockee dans utils pour l'authentification a chaque requete
          setAuthToken(token);
          // j'utilise ma fonction setCurrentUser() qui va passer ma props isLofggedIn du store a true
          // je vais donc pouvoir y acceder dans l'ensemble de mes composants
          const actSetCurrMember = setCurrentUser(jwt.decode(token));
          store.dispatch(actSetCurrMember);
          // j'appelle une fonction qui affiche un message de succes (qui ne doit pas etre vu par l'utilisateur)
          this.handleLoginSuccess();
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('login error');
          // ici j'appelle une fonction pour afficher un message d'erreur
          this.handleLoginError();
        }
      });
  }

  // fonction qui gere l'affichage du message d'erreur de connexion
  handleLoginError = () => {
    this.setState({ loginError: true });
  }

  // fonction qui gere l'affichage du message de succes de connexion
  handleLoginSuccess = () => {
    this.setState({
      [this.state.loginError]: false,
      [this.state.loginSuccess]: false,
    });
  }

  // fonction permettant de voir le mot de passe
  showPassword = (evt) => {
    evt.preventDefault();
    this.setState({
      // si le type est input (affiche) je passe en password pour masquer, et inversement
      passwordType: this.state.passwordType === 'input' ? 'password' : 'input',
    });
  }

  render() {
    // mes deux donnees pour l'affichage des messages
    const { loginSuccess, loginError } = this.state;

    // si je suis bien connecte, je retourne un simple message qui cache le formulaire de connexion
    if (loginSuccess || localStorage.getItem('token')) {
      return (
        <Segment
          color="grey"
          textAlign="center"
          inverted
          raised
        >
          Vous êtes bien connecté.
        </Segment>
      );
    }
    // si je ne suis pas connecte, je retourne le formulaire de connexion
    return (
      <Form
        className="connection-form"
        inverted
        onSubmit={this.handleSubmit}
      >
        {/* si j'ai une erreur de connexion, j'affiche un message d'erreur */}
        {loginError && (
          <Segment
            color="grey"
            textAlign="center"
            inverted
            raised
          >
            Erreur de connexion, encore une fois !
          </Segment>
        )}
        {/* formulaire de connexion */}
        <Form.Field>
          <Form.Input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            className="connection-form-input"
            icon={(
              <Icon
                name="user"
                color="yellow"
              />
            )}
            iconPosition="left"
            label="Identifiant"
            placeholder="Saisissez votre identifiant"
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="password"
            type={this.state.passwordType}
            value={this.state.password}
            onChange={this.handleChange}
            className="connection-form-input"
            icon={(
              <Icon
                name="eye"
                color="yellow"
                link
                onClick={this.showPassword}
              />
            )}
            iconPosition="left"
            label="Mot de passe"
            placeholder="Saisissez votre mot de passe"
          />
        </Form.Field>
        <div className="forgotten-pass">
          <a href="http://92.243.10.28/O-Fests/API/wp/wp-login.php?action=lostpassword">Mot de passe oublie</a>
        </div>
        <Button
          content="Me Connecter"
          primary
          className="connection-button-left"
        />
      </Form>
    );
  }
}

export default LoginForm;
