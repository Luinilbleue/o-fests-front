// == Import : npm
import React, { Component } from 'react';
import {
  Form, Button, Icon, Segment,
} from 'semantic-ui-react';
import axios from 'axios';

// == Import : local
import './connexionmodal.scss';
import 'semantic-ui-css/semantic.min.css';


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      display_name: '',
      email: '',
      password: '',
      passwordType: 'password',
      // ici je change de methode pour l'affichage des messages d'erreur/succes en utilisant simplement le CSS pour cacher les messages
      signupSuccess: 'hidden',
      signupError: 'hidden',
    };
  }

  // fonction permettant de recuperer le token pour la creation du compte
  getWPnonce = () => {
    axios.get('http://92.243.10.28/O-Fests/API/api/get_nonce/?controller=user&method=register')
      .then((response) => {
        // j'insere mon token que j'appelle dans la fonction qui va envoyer les donnees utilisateurs
        this.insertData(response.data.nonce);
      }).catch((error) => {
        console.log(error.response);
      });
  }

  // avec l'utilisation d'un plugin wordpress, la requete de creation de compte doit se faire en get
  insertData = (nonce) => {
    // j'insere toutes les donnees saisies pas l'utilisateurs puis stockees dans le state
    axios.get(`http://92.243.10.28/O-Fests/API/api/user/register/?username=${this.state.username}&email=${this.state.email}&nonce=${nonce}&user_pass=${this.state.password}&display_name=${this.state.display_name}&insecure=cool`)
      .then((response) => {
        const { data } = response;
        if (data.status === 'error' || data.status === '404') {
          this.signupError();
          console.log(data.status);
        }
        else if (data.status === 'ok') {
          this.signupSuccess();
        }
      }).catch((error) => {
        console.log(error.response);
        this.signupError();
      });
  }

  // fonction qui enleve la class "hidden" au message de succes
  signupSuccess = () => {
    this.setState({
      signupSuccess: '',
    });
  }

  // fonction qui enleve la class "hidden" au message d'erreur
  signupError = () => {
    this.setState({
      signupError: '',
    });
  }

  handleChange = (evt) => {
    const { target } = evt;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.getWPnonce();
  }

  handlePassword = (evt) => {
    evt.preventDefault();
    this.setState({
      passwordType: this.state.passwordType === 'input' ? 'password' : 'input',
    });
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="inscription-form"
        inverted
        fluid
      >
        <Segment
          color="grey"
          className={this.state.signupSuccess}
          textAlign="center"
          inverted
          raised
        >
          Votre compte a bien été créé, vous pouvez dès à present vous connecter.
        </Segment>
        <Segment
          color="red"
          className={this.state.signupError}
          textAlign="center"
          inverted
          raised
        >
          <p>Nous avons rencontre une erreur, veuillez reéssayer.</p>
          <p>En cas d'échec, vous pouvez contacter Satan au 666-666-666 ou nous envoyer un mail.</p>
        </Segment>
        <Form.Field>
          <Form.Input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="inscription-form-input"
            icon={<Icon name="mail" color="yellow" />}
            iconPosition="left"
            label="Adresse email"
            placeholder="Saisissez votre email"
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            className="inscription-form-input"
            icon={<Icon name="user" color="yellow" />}
            iconPosition="left"
            label="Identifiant"
            placeholder="Choisissez un identifiant"
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="display_name"
            type="text"
            value={this.state.display_name}
            onChange={this.handleChange}
            className="inscription-form-input"
            icon={<Icon name="user" color="yellow" />}
            iconPosition="left"
            label="Nom d'utilisateur"
            placeholder="Choisissez un nom d'utilisateur"
          />
        </Form.Field>
        {/* TODO: empecher l'envoie du compote si MDP est inferieur a 6 caracteres */}
        <Form.Field>
          <Form.Input
            name="password"
            type={this.state.passwordType}
            value={this.state.password}
            onChange={this.handleChange}
            className="inscription-form-input"
            icon={<Icon name="eye" color="yellow" link onClick={this.handlePassword} />}
            iconPosition="left"
            label="Mot de passe"
            placeholder="Choisissez un mot de passe"
          />
        </Form.Field>
        <Button
          type="submit"
          onClick={this.handleSubmit}
          content="M'inscrire"
          icon="signup"
          size="medium"
          className="connection-button-right"
        />
      </Form>
    );
  }
}


export default SignUpForm;
