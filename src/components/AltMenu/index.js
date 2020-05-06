/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Container, Menu, Modal, Dropdown,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './altmenu.scss';
import ConnectionModal from '../ConnectionModal';

class AltMenu extends Component {
  // je creer un state vide pour eviter les erreurs de ESLint...
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // je recupere la props isLoggedIn ainsi que la fonction logout depuis le store de Redux
    const { isLoggedIn, logout } = this.props;

    // je stocke un element d'affichage dans une constante afin de gerer un affichage conditionnel par la suite
    // si l'utilisateur est connecte :
    const logged = (
      <Dropdown
        item
        icon="hand point down"
        className="menu-item"
        simple
        // j'affiche le nom de l'utilisateur que je recupere depuis le localStorage
        text={localStorage.getItem('username')}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            inverted="true"
            className="menu-item"
            as="a"
            // je revois vers le back-office wordpress pour permettre la modification du compte
            href="http://92.243.10.28/O-Fests/API/wp/wp-login.php"
            target="blank"
          >
            Modifier mon compte
          </Dropdown.Item>
          <Dropdown.Item
            inverted="true"
            className="menu-item"
            as="a"
            // J'appelle la fonction logout au clic sur le bouton de deconnexion
            onClick={logout}
          >
            Deconnexion
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    // si l'utilisateur n'est pas connecte : je prepare une fenetre modale qui s'ouvrir au clic sur le bouton de connexion
    // la modale est preparee dans un autre composant ConnectionModal
    const notLogged = (
      <Modal
        trigger={(
          <Menu.Item
            className="menu-item"
            name="connexion"
          />
        )}
        closeIcon
      >
        <ConnectionModal />
      </Modal>
    );

    return (
      <div className="menu-container">
        <Menu
          as="header"
          inverted
          secondary
          className="menu"
          widths={5}
        >
          <Container>
            <Menu.Item
              as={NavLink}
              exact
              to="/"
              className="menu-item"
              name="Accueil"
            />
            <Menu.Item
              as={NavLink}
              to="/all-fests"
              className="menu-item"
              name="tous les fests"
            />
            <Menu.Item
              as={NavLink}
              to="/"
              className="menu-item"
            />
            <Menu.Item
              as={NavLink}
              to="/add-fest"
              className="menu-item"
              name="Ajouter fest"
            />
            {/* affichage conditionnel en fonction de la connexion de l'utilisateur */}
            { isLoggedIn ? logged : notLogged }
          </Container>
        </Menu>
        {/* petite quote inutile donc indispensable */}
        <div className="title-quote">
          <p>WHAT THE FEST ???</p>
        </div>
      </div>
    );
  }
}
// == export
export default AltMenu;
